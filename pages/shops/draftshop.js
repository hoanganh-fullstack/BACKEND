import Dataloading from '@/components/Dataloading';
import useFetchData from '@/hooks/useFetchData';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaBlog } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
export default function draftshop() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(7);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // fetch blog data
  const { alldata, loading } = useFetchData('/api/shops');

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of blog
  const allblog = alldata.length;

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ''
      ? alldata
      : alldata.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // calcuate index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  // Get the current pages blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);

  const publishedblogs = currentBlogs.filter((ab) => ab.status === 'draft'); // for draft blog

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Draft <span>Products</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaBlog /> <span>/</span> <span>Products</span>
          </div>
        </div>

        {/* Blog Table */}
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Products:</h2>
            <input
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              type="text"
              placeholder="Search by title..."
            />
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Image</th>
                <th className="text-center">Title</th>
                <th className="text-center">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr>
                    <td>
                      <Dataloading />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {publishedblogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No shop found
                      </td>
                    </tr>
                  ) : (
                    publishedblogs.map((blog, index) => (
                      <tr key={blog._id}>
                        <td className="text-center">{indexOfFirstBlog + index + 1}</td>
                        <td className="text-center">
                          <img src={blog.images[0]} width={180} alt="image" />
                        </td>
                        <td className="text-center">
                          <h3>{blog.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={'/shops/edit/' + blog._id}>
                              <button>
                                <FaRegEdit />
                              </button>
                            </Link>
                            <Link href={'/shops/delete/' + blog._id}>
                              <button>
                                <MdDelete />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
