import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const LatestNews = () => {
  const [jobUpdates, setjobUpdates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCountries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      setjobUpdates(data.category);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="bg-blue-900 text-white py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Latest Job Updates</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Explore the latest job openings across Kerala and take the next step
          toward your dream job.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-200">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobUpdates.map((job, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img
                src={job.photo}
                alt={job.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 text-center">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{job.name}</h3>
                  <Link to={`/latestjobs/${job._id}`} className="flex items-center justify-center gap-2 text-sm font-medium">
                    View more <FaArrowRight className="mt-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestNews;
