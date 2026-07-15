import Project from "@/components/Project";
import { FaBlog } from 'react-icons/fa6';

export default function Addproject() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          {/* title */}
          <div>
            <h2>
              Add <span>Project</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          {/* breadcrumb */}
          <div className="breadcrumb">
            <FaBlog /> <span>/</span> <span>Add Project</span>
          </div>
        </div>
        {/* Add Blogs */}
        <div className="blogsadd">
          <Project />
        </div>
      </div>
    </>
  );
}
