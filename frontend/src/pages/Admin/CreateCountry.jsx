import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu';

const CreateCountry = () => {
  const navigate = useNavigate();
    const [photo, setPhoto] = useState(""); // For new category
  
  const [loading, setLoading] = useState(false);
  const [country, setcountry] = useState({
    name: '',
    description:'',
    details:'',
    photo:''
  });


  const convert = async (e) => {
    setPhoto(await convertToBase64(e.target.files[0]));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }



  // Handle form input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setcountry((prevcountry) => ({
  //     ...prevcountry,
  //     [siteplace]: value,
  //   }));
  // };

  const handleChange = (e) => {
    setcountry({ ...country, [e.target.name]: e.target.value });
  };

  // Create country
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!country.name ) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = { ...country, photo }; 

      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/country/createCountry`, payload);
      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          setcountry({ 
            name: '',
            description:'',
            details:'',
            photo:''
           });
          
        }, 1000); 
      } else {
        toast.error(data?.message || 'country creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while  creating the country');
    } finally {
      setLoading(false);
    }
  };





  return (
    <Layout title={"Dashboard - Create country"}>

<div className="flex flex-col md:flex-row  bg-gray-100">
          <div>
          <AdminMenu />

          </div>

          
          <div className="md:w-3/4 p-4">
            <h1 className="text-3xl font-bold mb-6">Create Country </h1>
            <div className="space-y-4">
           
            <div className="mb-4">
                  <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id='photo'
                    name='photo'
                    className="w-full"
                    onChange={convert}
                    required
                  />
                </div>

              <div>
                <input
                  type="text"
                  name="name"
                  value={country.name}
                  placeholder="Country  name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="description"
                  value={country.description}
                  placeholder="Country description "
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="details"
                  value={country.details}
                  placeholder="Details name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
           
    


           

              <div>
                <button
                  className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                  onClick={handleCreate}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? 'Creating...' : 'CREATE COUNTRY '}
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default CreateCountry;
