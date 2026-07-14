import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';

export default function Blog({ _id }) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setslug] = useState('');
  const [images, setimages] = useState([]);
  const [description, setdescription] = useState('');
  const [blogcategory, setblogcategory] = useState([]);
  const [tags, settags] = useState([]);
  const [status, setstatus] = useState('');

  // for images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createBlog(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = { title, slug, images, description, blogcategory, tags, status };

    if (_id) {
      await axios.put('/api/blogs', { ...data, _id });
      toast.success('Data updated');
    } else {
      await axios.post('/api/blogs', data);
      toast.success('Blog created');
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
    router.push('/blogs');
    return null;
  }

  function updateImagesOrder(images) {
    setimages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setimages(updatedImages);
    toast.success('Images deleted successfully')
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

        {/* Blog Category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Select Category</label>
          <select
            onChange={(e) => setblogcategory(Array.from(e.target.selectedOptions, (option) => option.value))}
            value={blogcategory}
            name="category"
            id="category"
            multiple
          >
            <option value="Java">Java</option>
            <option value="Node JS">Node JS</option>
            <option value="React JS">React JS</option>
            <option value="Next JS">Next JS</option>
            <option value="Express JS">Express JS</option>
            <option value="Nest JS">Nest JS</option>
            <option value="TypeScript">TypeScript</option>
            <option value="MongoDB">MongoDB</option>
          </select>
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

        {/* markdown description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setdescription(ev.text)}
            style={{ width: '100%', height: '400px' }} // you can adjust the height as needed
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    // for code
                    const match = /language-(\w+)/.exec(className || '');

                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        <div style={{ position: 'relative' }}>
                          <pre
                            style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
                            onClick={() => navigator.clipboard.writeText(children)}
                          >
                            copy code
                          </button>
                        </div>
                      );
                    } else {
                      return <code {...props}>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>

        {/* tegs */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            onChange={(e) => settags(Array.from(e.target.selectedOptions, (option) => option.value))}
            value={tags}
            name="tags"
            id="tags"
            multiple
          >
            <option value="html">html</option>
            <option value="javascript">javascript</option>
            <option value="css">css</option>
            <option value="nextjs">nextjs</option>
            <option value="reactjs">reactjs</option>
            <option value="vuejs">vuejs</option>
            <option value="database">database</option>
          </select>
        </div>

        {/* blog status */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select onChange={(ev) => setstatus(ev.target.value)} value={status} name="status" id="status">
            <option value="">No Select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            Save Blog
          </button>
        </div>
      </form>
    </>
  );
}
