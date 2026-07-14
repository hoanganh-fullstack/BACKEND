import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { IoHome } from 'react-icons/io5';

export default function Home() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define option within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      },
    },
  };

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        // const responseproject = await fetch('/api/projects');
        // const responseShop = await fetch('/api/shops');
        // const responseGallery = await fetch('/api/photos');
        const data = await response.json();
        // const dataProject = await responseproject.json();
        // const dataShop = await responseShop.json();
        // const dataPhotos = await responseGallery.json();

        setBlogsData(data); // assuming data is an array of blog objects
        // setProjectsData(dataProject);
        // setShopData(dataShop);
        // setPhotosData(dataPhotos);
        setLoading(false); // After fetching data make loading false
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData(); // call fetch data function
  }, []);

  // Aggregate data by year and month
  const monthlyData = blogsData
    .filter((dat) => dat.status === 'publish')
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // get the year
      const month = new Date(blog.createdAt).getMonth(); // get the month
      acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exits
      acc[year][month]++; // Increment count for the month
      return acc;
    }, {});

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // if no data for a month, defult to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Admin <span>Dashboard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>

        {/* Dashboard Four Card */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>{blogsData.filter((dat) => dat.status === 'publish').length}</span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Photos</h2>
            <span>5</span>
          </div>
        </div>

        {/* Year Overview */}
        <div className="year_overview flex flex-sb">
          {/* Left Dashboard */}
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {blogsData.filter((dat) => dat.status === 'publish').length} / 365
                <br />
                <span>Total Published</span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          {/* Right Dashboard */}
          <div className="right_salescont">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td className="text-center">Topics</td>
                    <td className="text-center">Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">Next JS</td>
                    <td className="text-center">
                      {blogsData.filter((dat) => dat.blogcategory[0] === 'Next JS').length}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Nest JS</td>
                    <td className="text-center">
                      {blogsData.filter((dat) => dat.blogcategory[0] === 'Nest JS').length}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Node JS</td>
                    <td className="text-center">
                      {blogsData.filter((dat) => dat.blogcategory[0] === 'Node JS').length}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">React JS</td>
                    <td className="text-center">
                      {blogsData.filter((dat) => dat.blogcategory[0] === 'React JS').length}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Java</td>
                    <td className="text-center">{blogsData.filter((dat) => dat.blogcategory[0] === 'Java').length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
