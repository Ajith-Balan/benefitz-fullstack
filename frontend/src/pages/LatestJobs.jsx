import React,{useEffect,useState} from 'react';
import Layout from '../components/layout/Layout';
import {Link, useParams} from 'react-router-dom'
import { toast } from "react-toastify";
import axios from "axios"
const jobList = [
  {
    title: "Warehouse Workers",
    image: "https://img.freepik.com/free-photo/warehouse-workers-clapping-hands-together_342744-1462.jpg",
  },
  {
    title: "Helpers",
    image: "https://img.freepik.com/free-photo/young-pleased-pretty-caucasian-schoolgirl-with-headphones-neck-wearing-glasses-back-bag-holds-toy-plane-globe-pink-with-copy-space_141793-62653.jpg?ga=GA1.1.1617366038.1734696680&semt=ais_hybrid&w=740",
  },
  {
    title: "Packers",
    image: "https://img.freepik.com/free-photo/close-up-volunteer-oganizing-stuff-donation_23-2149134433.jpg?ga=GA1.1.1617366038.1734696680&semt=ais_hybrid&w=740",
  },
  {
    title: "Storekeepers",
    image: "https://5.imimg.com/data5/SELLER/Default/2021/1/BW/FG/UO/14471364/store-keeper.jpg",
  },
  {
    title: "Forklift Operators",
    image: "https://static.joblist.com/static/job-descriptions/forklift-operator.jpg",
  },
  
];




const LatestJobs = () => {
  const {id}= useParams()
  const [loading, setLoading] = useState(false);

  const [jobUpdates, setjobUpdates] = useState([]);



  const getWorks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/work/work-category/${id}`);
      setjobUpdates(data.works);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorks();
  }, []);


  return loading ? (
  <div className="flex justify-center items-center h-screen bg-[#F3F7F3]">
    <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
  </div>
) : (
  <Layout>
    <div className="bg-[#F3F7F3] py-12 px-4">
 

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {jobUpdates.map((job, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-md overflow-hidden text-center transition-transform duration-300 hover:scale-105 group"
          >
            <img
              src={job.photo}
              alt={job.title}
              className="w-full h-56 object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-4 flex flex-col text-left sm:text-base">
              <ul className="list-disc list-inside marker:text-blue-500 text-white font-bold text-sm">
                {job.details.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
              <Link
                to={"/job"}
                className="bg-green-700 rounded mt-14 font-bold opacity-100 z-10 p-2 text-center mx-auto"
              >
                Apply Now
              </Link>
            </div>

            <div className="relative flex justify-center group-hover:opacity-5 mt-[-25px] ">
              <div className="bg-white rounded-full p-2 shadow-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                  alt="Chair Icon"
                  className="w-12 h-12"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-4 mb-6 text-gray-800 px-4 z-10 relative">
              {job.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

};

export default LatestJobs;