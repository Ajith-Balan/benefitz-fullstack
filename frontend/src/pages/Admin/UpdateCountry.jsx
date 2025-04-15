import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCountry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState({
    name: "",
    details: "",
    description: "",
  });

  // Get single country details
  const getSingleCountry = async () => {
    try {
      const  res  = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/country/getoneCountry/${id}`
      );
      if (res) {
        setCountry({...res.data});
      } else {
        toast.error("Failed to fetch country details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the country details");
    }
  };

  useEffect(() => {
    if (id) getSingleCountry();
  }, [id]);

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    setPhoto(await convertToBase64(e.target.files[0]));
  };

  // Update country
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...country, photo };
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/country/updateCountry/${id}`,
        payload
      );
      if (data) {
        toast.success("Country Updated Successfully");
        setTimeout(() => navigate("/dashboard/admin/countries"), 1000);
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the country");
    }
  };

  // Delete country
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/country/deleteCountry/${id}`
      );
      toast.success("Country Deleted Successfully");
      setTimeout(() => navigate("/dashboard/admin/countries"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the country");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };

  return (
    <Layout title={"Dashboard - Update Country"}>
      <div className="flex flex-col md:flex-row  bg-gray-100">
               <div>
               <AdminMenu />
     
               </div>

          {/* Form Section */}
          <div className="md:w-3/4 w-full p-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">
              Update Country
            </h1>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Photo
                </label>
                <input
                  type="file"
                  className="w-full border p-2 rounded-md"
                  onChange={handleImageUpload}
                  required
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={country.name}
                  placeholder="Enter country name"
                  className="block w-full p-2 border rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Details
                </label>
                <input
                  type="text"
                  name="details"
                  value={country.details}
                  placeholder="Enter details"
                  className="block w-full p-2 border rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={country.description}
                  placeholder="Enter description"
                  className="block w-full p-2 border rounded-md"
                  rows="4"
                  onChange={handleInputChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  className="w-full md:w-1/2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={handleUpdate}
                >
                  UPDATE COUNTRY
                </button>
                <button
                  className="w-full md:w-1/2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  DELETE COUNTRY
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default UpdateCountry;
