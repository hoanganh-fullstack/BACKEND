import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsPostcard } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart, MdWorkOutline } from 'react-icons/md';
import { RiContactsLine } from 'react-icons/ri';

export default function Aside({ asideOpen, handleAsideOpen }) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleLinkClick = (link) => {
    setActiveLink((prevActive) => (prevActive === link ? '' : link));
    setClicked(false); // Close the menu after clicking a link
  };
  useEffect(() => {
    // Update the active link based on the current route
    setActiveLink(router.pathname);
  }, [router.pathname]);
  return (
    <>
      <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
        <ul>
          {/* ====== HOME ====== */}
          <Link href="/">
            <li className="navactive">
              <FaHome />
              <span>Dashboard</span>
            </li>
          </Link>

          {/* ====== BLOGS ====== */}
          <li
            className={`${activeLink === '/blogs' ? 'navactive flex-col flex-left' : ' flex-col flex-left'}`}
            onClick={() => handleLinkClick('/blogs')}
          >
            <div className="flex gap-1">
              <BsPostcard />
              <span>Blogs</span>
            </div>
            {activeLink === '/blogs' && (
              <ul>
                <Link href="/blogs">
                  <li>All Blogs</li>
                </Link>
                <Link href="/blogs/draft">
                  <li>Draft Blog</li>
                </Link>
                <Link href="/blogs/addblog">
                  <li>Add Blog</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ====== PROJECTS ====== */}
          <li
            className={`${activeLink === '/projects' ? 'navactive flex-col flex-left' : ' flex-col flex-left'}`}
            onClick={() => handleLinkClick('/projects')}
          >
            <div className="flex gap-1">
              <MdWorkOutline />
              <span>Project</span>
            </div>
            {activeLink === '/projects' && (
              <ul>
                <Link href="/projects">
                  <li>All Projects</li>
                </Link>
                <Link href="/projects/draftprojects">
                  <li>Draft Project</li>
                </Link>
                <Link href="/projects/addproject">
                  <li>Add Project</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ====== SHOPS ====== */}
          <li
            className={`${activeLink === '/shops' ? 'navactive flex-col flex-left' : ' flex-col flex-left'}`}
            onClick={() => handleLinkClick('/shops')}
          >
            <div className="flex gap-1">
              <MdOutlineShoppingCart />
              <span>Shops</span>
            </div>
            {activeLink === '/shops' && (
              <ul>
                <Link href="/shops">
                  <li>All Products</li>
                </Link>
                <Link href="/shops/draftshop">
                  <li>Draft Products</li>
                </Link>
                <Link href="/shops/addproduct">
                  <li>Add Product</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ====== GALLERY ====== */}
          <li
            className={`${activeLink === '/gallery' ? 'navactive flex-col flex-left' : ' flex-col flex-left'}`}
            onClick={() => handleLinkClick('/gallery')}
          >
            <div className="flex gap-1">
              <GrGallery />
              <span>Gallery</span>
            </div>
            {activeLink === '/gallery' && (
              <ul>
                <Link href="/gallery">
                  <li>All Photos</li>
                </Link>
                <Link href="/gallery/addphoto">
                  <li>Add Photo</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ====== CONTACTS ====== */}
          <Link href="/contacts">
            <li
              className={`${activeLink === '/contacts' ? 'navactive' : ''}`}
              onClick={() => handleLinkClick('/contacts')}
            >
              <RiContactsLine />
              <span>Contacts</span>
            </li>
          </Link>

          {/* ====== SETTINGS ====== */}
          <Link href="/setting">
            <li
              className={`${activeLink === '/setting' ? 'navactive' : ''}`}
              onClick={() => handleLinkClick('/setting')}
            >
              <IoSettingsOutline />
              <span>Setting</span>
            </li>
          </Link>
        </ul>

        {/* Logout button */}
        <button className="logoutbtn">Logout</button>
      </aside>
    </>
  );
}
