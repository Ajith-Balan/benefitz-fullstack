import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getusers`);
      setUsers(data); // Limit to 10 users
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Categorizing users
  const subscribedUsers = users.filter(user => user.receipt);
  const nonSubscribedUsers = users.filter(user => !user.receipt);
  const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

  return (
    <Layout title="All Users">

        <div className="flex flex-col md:flex-row bg-gray-100">
          <div>
          <AdminMenu />

          </div>
          <div className=" flex-1">
            <h1 className="text-2xl font-semibold mb-4">Users List</h1>

            {loading ? (
              <p className="text-center text-gray-500">Loading users...</p>
            ) : (
              <>
                {/* Subscribed Users */}
                <h2 className="text-lg font-semibold mt-4">Subscribed Users</h2>
                <div className="w-full">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-700">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Joined Date</th>
                        <th className="border p-2"> Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribedUsers.map((user, index) => (

                        <tr key={user._id} className="text-center border">

                          <td className="border p-2 ">{index + 1}</td>

                          <td className="border p-2">{user.name}</td>

                          <td className="border p-2">{user.phone}</td>
                          <td className="border p-2">{new Date(user.updatedAt).toLocaleDateString('en-GB')}</td>
                          <Link className='w-full' to={`/dashboard/admin/ref/${user._id}`}>

                          <td className='text-center text-blue-500 p-2 hover:bg-gray-300'>


                              Details

                          </td>
                          </Link>

                        </tr>

                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Non-Subscribed Users */}
                <h2 className="text-lg font-semibold mt-4">Non-Subscribed Users</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse bg-gray-200 border border-white">
                    <thead>
                      <tr className="bg-gray-200 ">
                        <th className="border border-white p-2">#</th>
                        <th className="border border border-white p-2">Name</th>
                        <th className="border border border-white p-2">Phone</th>
                        <th className="border border border-white p-2">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nonSubscribedUsers.map((user, index) => (
                        <tr key={user._id} className=" text-center  border-white border">
                          <td className="border border-white p-2 ">{index + 1}</td>
                          <td className="border border-white p-2">{user.name}</td>
                          <td className="border border-white p-2">{user.phone}</td>
                          <td className="border border-white p-2">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recently Joined Users */}
                <h2 className="text-lg font-semibold mt-4">Recently Joined Users</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-blue-800">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, index) => (
                        <tr key={user._id} className="border  text-center">
                          <td className="border p-2">{index + 1}</td>
                          <td className="border p-2">{user.name}</td>
                          <td className="border p-2">{user.phone}</td>
                          <td className="border p-2">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
    </Layout>
  );
};

export default Users;
