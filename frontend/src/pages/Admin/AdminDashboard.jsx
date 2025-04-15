import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaUser, FaCog } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from 'axios';
const AdminDashboard = () => {
 const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);




    const getAllUsers = async () => {
      try {
        setLoading(true);
        const  {data}  = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getusers`);
        setUsers(data);
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

  const navigate = useNavigate();



  return (
    
<Layout>

<div className="flex flex-col md:flex-row  bg-gray-100">
          <div>
          <AdminMenu />

          </div>

   
    
      <div className="flex-1 p-4 md:p-6">
       
        <header className="bg-white shadow p-4 md:p-6 rounded-lg text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Welcome, Admin</h1>
        </header>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 md:mt-6">
        <motion.div
              className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="ml-3 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold">Total Users</h2>
                <div className="text-gray-600 text-sm md:text-lg">
  <div>
    <p>{users.length }</p>
  </div>

</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="ml-3 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold">Subscribers</h2>
                <div className="text-gray-600 text-sm md:text-lg">
  <div>
  <p>{users.filter(user => user.receipt).length}</p>
  </div>

</div>
              </div>
            </motion.div>
     
            <motion.div
              className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="ml-3 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold">Non Subscribers</h2>
                <div className="text-gray-600 text-sm md:text-lg">
  <div>
  <p>{users.filter(user => !user.receipt).length}</p>
  </div>

</div>
              </div>
            </motion.div>


        </div>

        <div className="bg-white mt-4 md:mt-6 p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Recent Users</h2>
          <table className="w-full border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="p-2 md:p-3 text-left">Name</th>
                <th className="p-2 md:p-3 text-left">Email</th>
                <th className="p-2 md:p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Doe", email: "john@example.com", role: "User" },
                { name: "Jane Smith", email: "jane@example.com", role: "Admin" },
                { name: "Alice Brown", email: "alice@example.com", role: "Moderator" },
              ].map((user, index) => (
                <tr key={index} className="border-b text-sm md:text-base">
                  <td className="p-2 md:p-3">{user.name}</td>
                  <td className="p-2 md:p-3">{user.email}</td>
                  <td className="p-2 md:p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
    </div>
    </Layout>

  )
};

export default AdminDashboard;
