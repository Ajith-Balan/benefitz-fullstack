import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from '../../components/layout/AdminMenu';

const UpdateNews = () => {
  const { id } = useParams();
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

  const handleChange = (index, field, value) => {
    const updatedJobs = [...jobUpdates];
    updatedJobs[index][field] = value;
    setjobUpdates(updatedJobs);
  };



  const handleImageUpload = (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedJobs = [...jobUpdates];
      updatedJobs[index].photo = reader.result;
      setjobUpdates(updatedJobs);
    };
  }
};


  const handleUpdate = async (job) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/work/update-work/${job._id}`, job);
      toast.success("Updated successfully");
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND}/api/v1/work/delete-work/${jobId}`);
      toast.success("Deleted successfully");
      setjobUpdates(jobUpdates.filter(job => job._id !== jobId));
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
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
                     <AdminMenu />

          {jobUpdates.map((job, index) => (
            <div
              key={job._id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden p-4"
            >
              <input
                type="text"
                value={job.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Job Name"
              />
           <div className="mb-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(e, index)}
    className="w-full p-2 border rounded bg-white"
  />
</div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Details Comma separated(,)</label>


              <textarea
                value={job.details}
                onChange={(e) => handleChange(index, "details", e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Details (comma separated)"
              ></textarea>

              <img
                src={job.photo}
                alt={job.name}
                className="w-full h-40 object-cover rounded mb-2"
              />

              <div className="flex justify-between gap-2 mt-2">
                <button
                  onClick={() => handleUpdate(job)}
                  className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateNews;
