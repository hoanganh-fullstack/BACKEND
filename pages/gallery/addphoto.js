import Photo from '@/components/photo';
import Project from '@/components/Project';
import Head from 'next/head';
import { FaBlog } from 'react-icons/fa6';

export default function addphoto() {
  return (
    <>
      <Head>
        <title>All Photos</title>
      </Head>

      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          {/* title */}
          <div>
            <h2>
              Add <span>Photo</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          {/* breadcrumb */}
          <div className="breadcrumb">
            <FaBlog /> <span>/</span> <span>Add Photo</span>
          </div>
        </div>
        {/* Add Blogs */}
        <div className="blogsadd">
          <Photo />
        </div>
      </div>
    </>
  );
}
