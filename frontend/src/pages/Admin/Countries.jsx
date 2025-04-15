import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout.jsx';
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Track which country is being deleted
  // Fetch all countries
  const getAllCountries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/country/getCountry`);
      setCountries(data);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;

    try {
      setDeletingId(id); // Set loading for specific item
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND}/api/v1/country/deleteCountry/${id}`);
      

      


      toast.success("Country deleted successfully!");
      getAllCountries();

      
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      setDeletingId(null); // Reset deleting state
    }
  };

  return (
    <Layout>
     <div className="flex flex-col md:flex-row  bg-gray-100">
          <div>
          <AdminMenu />

          </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-center text-2xl font-bold mb-6">Countries</h1>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {countries.map((country) => (
                <div key={country._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={country.photo || '/default-image.jpg'}
                    className="w-full h-40 object-cover"
                    alt={country.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{country.name}</h5>
                    <div className="flex gap-2">
                      <Link to={`/dashboard/admin/updateCountry/${country._id}`} className="text-blue-500">
                        Edit
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(country._id)}
                        disabled={deletingId === country._id}
                      >
                        {deletingId === country._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Countries;
