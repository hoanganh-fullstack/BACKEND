import Shop from '@/components/Shop';
import Head from 'next/head';
import { FaBlog } from 'react-icons/fa6';

export default function Addproduct() {
  return (
    <>
      <Head>
        <title> Add Product</title>
      </Head>

      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          {/* title */}
          <div>
            <h2>
              Add <span>Product</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          {/* breadcrumb */}
          <div className="breadcrumb">
            <FaBlog /> <span>/</span> <span>Add Product</span>
          </div>
        </div>
        {/* Add Blogs */}
        <div className="blogsadd">
          <Shop />
        </div>
      </div>
    </>
  );
}
