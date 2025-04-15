import React, { useState } from 'react';
import UserMenu from '../../components/layout/UserMenu';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    phone: auth?.user?.phone || '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/profile`, formData);
      if (res?.data?.error) {
        toast.error(res?.data?.error);
      } else {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: res?.data?.updatedUser,
        }));
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Your Profile'}>
        <div className="flex flex-col lg:flex-row  bg-gray-100">
            {/* Mobile Sidebar Toggle */}
            <div>
            <UserMenu/>

            </div>
            <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Profile</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-2   border-b-2 focus:outline-none focus:ring-b-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-2   border-b-2 focus:outline-none focus:ring-b-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                                                        placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="w-full p-2   border-b-2 focus:outline-none focus:ring-b-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full p-2   border-b-2 focus:outline-none focus:ring-b-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"                            placeholder="Generate a new password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    </Layout>
  );
};

export default Profile;
