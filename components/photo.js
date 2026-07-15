import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import 'react-markdown-editor-lite/lib/index.css';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';

export default function Photo({ _id, title: existingTitle, slug: existingslug, images: existingimages }) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setslug] = useState(existingslug || '');
  const [images, setimages] = useState(existingimages || []);

  // for images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createBlog(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = { title, slug, images };

    if (_id) {
      await axios.put('/api/photos', { ...data, _id });
      toast.success('Data updated');
    } else {
      await axios.post('/api/photos', data);
      toast.success('Photo created');
    }
    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const data = new FormData();
        data.append('file', file);

        // use the axios.post method and push the promise to the queue
        uploadImagesQueue.push(
          axios.post('/api/upload', data).then((res) => {
            setimages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      // wait for all images to finish uploading
      await Promise.all(uploadImagesQueue);

      setIsUploading(false);
      toast.success('Images Uploaded');
    } else {
      toast.error('An error occurred!');
    }
  }

  if (redirect) {
    router.push('/gallery');
    return null;
  }

  function updateImagesOrder(images) {
    setimages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setimages(updatedImages);
    toast.success('Images deleted successfully');
  }

  // for slug url
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-'); // replace spaces with hyphens

    setslug(newSlug);
  };

  return (
    <>
      <form className="addWebsiteform" onSubmit={createBlog}>
        {/* Blog Title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        {/* Blog Slug URL */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug</label>
          <input type="text" id="slug" placeholder="Enter slug URL" value={slug} onChange={handleSlugChange} />
        </div>

        {/* Blog Image */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="images">Images</label>
            <input type="file" id="fileInput" className="mt-1" accept="image/*" multiple onChange={uploadImages} />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {/* <Spinner /> */}
            {isUploading && <Spinner />}
          </div>
        </div>

        {/* Image Preview and image sortable with delete image */}
        {/* pending */}
        {isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
                  <div className="deleteimg">
                    <button onClick={() => handleDeleteImage(index)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            Save Data
          </button>
        </div>
      </form>
    </>
  );
}
