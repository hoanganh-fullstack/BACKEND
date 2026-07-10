import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';

export default function Blog() {
  return (
    <>
      <form className="addWebsiteform">
        {/* Blog Title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Enter small title" />
        </div>

        {/* Blog Slug URL */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug</label>
          <input type="text" id="slug" placeholder="Enter slug URL" />
        </div>

        {/* Blog Category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Select Category</label>
          <select name="category" id="category" multiple>
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
            <input type="file" id="fileInput" className="mt-1" accept="image/*" multiple />
          </div>
          <div className="w-100 flex flex-left mt-1">
            <Spinner />
          </div>
        </div>

        {/* Image Preview and image sortable */}
        {/* pending */}

        {/* markdown description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor />
        </div>
      </form>
    </>
  );
}
