import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LatestUpdate = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(""); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [work, setwork] = useState({
    name: '',
    photo: '',
    category: '',
    details: '',
  });

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    setwork(prev => ({ ...prev, photo }));
  }, [photo]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  const handleImageUpload = (e, setImageState) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageState(reader.result);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setwork((prevwork) => ({
      ...prevwork,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!work.name || !work.details || !work.category || !work.photo) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/work/create-work`, work);
      if (data?.success) {
        toast.success(data.message);
        setwork({ name: '', photo: '', category: '', details: '' });
        setPhoto('');
      } else {
        toast.error(data.message || 'Work creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while creating the work');
    } finally {
      setLoading(false);
    }
  };





  return (
    <Layout title={"Dashboard - Create Work"}>
      <div className="container mx-auto py-6 px-4 bg-white rounded-lg shadow-lg">
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create Work</h1>
            <div className="space-y-4">
              <Link className="block text-blue-500 underline mb-2" to={'/dashboard/admin/create-category'}>
                Add Country
              </Link>

              <div>
                <label className="block text-gray-700 mb-2">Country</label>
                <select
                  name="category"
                  value={work.category}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a Country</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  value={work.name}
                  placeholder="Work name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
  <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Upload Photo</label>
  <input
    type="file"
    className="w-full"
    onChange={(e) => handleImageUpload(e, setPhoto)}
    required
  />
  {photo && (
    <div className="mt-4">
      <img
        src={photo}
        alt="Preview"
        className="h-40 w-40 object-cover rounded border border-gray-300"
      />
    </div>
  )}
</div>


              <div>
                <input
                  type="text"
                  name="details"
                  value={work.details}
                  placeholder="Details"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <button
                  className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'CREATE WORK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       {loading ? (
              <div className="text-center text-gray-200">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {categories.map((job, index) => (
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
                        <Link to={`/dashboard/admin/updatenews/${job._id}`} className="flex items-center justify-center gap-2 text-sm font-medium">
                          View more 
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    </Layout>
  );
};

export default LatestUpdate;
