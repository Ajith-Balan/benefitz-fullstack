import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth.jsx';
import { useParams } from 'react-router-dom';

const Refferals = () => {
  const [userDetails, setUserDetails] = useState({});
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const { id } = useParams();

  const getOneUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getoneuser/${id}`);
      setUserDetails(res.data.data);
      setReferredUsers(res.data.referredUsers);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const successCount = referredUsers.filter(user => user.receipt).length;

  return (
    <Layout title="Referral Dashboard">
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        <div className="w-full md:w-1/4 bg-white p-4 shadow-md">
          <AdminMenu />
        </div>
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Referral Dashboard</h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Name: <span className="text-gray-800">{userDetails.name}</span>
              </h2>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Email: <span className="text-gray-800">{userDetails.email}</span>
              </h2>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Phone: <span className="text-gray-800">{userDetails.phone}</span>
              </h2>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Registered on:{" "}
                <span className="text-gray-800">
                  {userDetails.updatedAt ? new Date(userDetails.updatedAt).toLocaleDateString() : "—"}
                </span>
              </h2>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Number of successful referrals: <span className="text-gray-800">{successCount}</span>
              </h2>

              {referredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border border-gray-300">
                    <thead className="bg-blue-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Registered On</th>
                        <th className="px-4 py-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referredUsers.map((user, index) => (
                        <tr key={index} className="even:bg-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-2 border text-center">{index + 1}</td>
                          <td className="px-4 py-2 border">{user.name}</td>
                          <td className="px-4 py-2 border">{user.email}</td>
                          <td className="px-4 py-2 border">{user.phone || '—'}</td>
                          <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-2 border">
                            {user.receipt ? (
                              <span className="text-green-600">Success ✅</span>
                            ) : (
                              <span className="text-yellow-500">Pending 🟡</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No referrals found for this user.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Refferals;
