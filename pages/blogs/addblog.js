import Blog from '@/components/Blog';
import { FaBlog } from 'react-icons/fa6';

export default function Addblog() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          {/* title */}
          <div>
            <h2>
              Add <span>Blog</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          {/* breadcrumb */}
          <div className="breadcrumb">
            <FaBlog /> <span>/</span> <span>Add Blog</span>
          </div>
        </div>
        {/* Add Blogs */}
        <div className="blogsadd">
          <Blog/>
        </div>
      </div>
    </>
  );
}
