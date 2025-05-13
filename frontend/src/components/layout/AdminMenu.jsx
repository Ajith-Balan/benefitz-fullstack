import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';

const AdminMenu = () => {

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logout successfully');
    setTimeout(() => navigate('/login'), 1000);
  };
  return (
  <div className="w-full   bg-gray-900 text-white   sticky p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Admin Panel</h1>
        <ul className="space-y-3 md:space-y-4">
          {[
            { path: "/dashboard/admin", name: "Dashboard" },
            { path: "/dashboard/admin/countries", name: "Countries" },
            { path: "/dashboard/admin/create-country", name: "Add Country" },
            { path: "/dashboard/admin/users", name: "Users" },
            { path: "/dashboard/admin/works", name: "Latest Update" },
          ].map((item, index) => (
            <Link key={index} to={item.path}>
              <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer text-center md:text-left">
                {item.name}
              </li>
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-md mt-4">
            Logout
          </button>
        </ul>
      </div>
  );
};

export default AdminMenu;
