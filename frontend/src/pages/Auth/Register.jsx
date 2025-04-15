



import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Register = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    invitecode: `${id || ""}`,
  });

  // Fetch all users on component mount
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getusers`);
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    };
    getAllUsers();
  }, []);

  // Update usercode when users data changes
  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     usercode: `BNFTZ${users.length + 1}`,
  //   }));
  // }, [users]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate password
  const validateForm = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
  
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/register`, formData);
      if (res.status === 201) {
        toast.success('Registered successfully');
        setTimeout(() => {
            navigate('/login');
          }, 1000);
      }else if(res.status === 200){
        toast.error('Already Register please login');

      }
       else {
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Register Benifitz International">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="number"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <input
              type="text"
              name="invitecode"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Invite code (optional)"
              value={formData.invitecode}
              onChange={handleChange}
              readOnly
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-md ${
                loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center">
              Already a user?{' '}
              <Link className="text-blue-600 underline" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
