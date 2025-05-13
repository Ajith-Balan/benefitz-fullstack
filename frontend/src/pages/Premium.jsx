import Layout from '../components/layout/Layout';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/Auth';
import axios from 'axios';


import { FaSearch, FaFileAlt, FaUserTie, FaTasks, FaAward,FaCrown, FaUserAlt, FaBriefcase, FaPaperPlane, FaCommentDots, FaCog } from 'react-icons/fa';


const Premium = () => {
  const navigate = useNavigate();
  
  const [auth] = useAuth();

  const handleBuyNow = () => {
  if (!auth.user) {
    navigate('/login');
  } else if (!auth.user.receipt) {
    loadRazorpay();
  }
};

const loadRazorpay = async () => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/createsubscribe`);
    const { currency, receipt } = res.data;

    const options = {
      key: "rzp_test_kZ85G3MYrmQk4J",
      amount: 99900,
      currency,
      receipt,
      name: "Your Benefitz International Name",
      description: "Subscription Payment",
      handler: async function (response) {
        try {
          setAuth(prevAuth => ({
            ...prevAuth,
            user: { ...prevAuth.user, receipt, amount: 99900, currency }
          }));

          let ls = JSON.parse(localStorage.getItem("auth"));
          ls.user = { ...ls.user, receipt, amount: 99900, currency };
          localStorage.setItem('auth', JSON.stringify(ls));

          toast.success("Payment successful & profile updated!");
        } catch (error) {
          console.error("Error during handler:", error);
          alert("Payment successful");
        }
      },
      theme: { color: "#4CAF50" },
      modal: {
        ondismiss: function () {
          alert("🛑 Payment was cancelled!");
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
    alert("⚠️ Failed to initiate payment. Please try again.");
  }
};


const benefits = [

  {
    icon: <FaSearch className="text-3xl text-blue-600" />,
    title: 'Benefit 1',
    subtitle: 'Increased Job Search Efficiency',
    description:
      'Maximize your job search efficiency with priority visibility and direct contact opportunities.',
  },
  {
    icon: <FaFileAlt className="text-3xl text-blue-600" />,
    title: 'Benefit 2',
    subtitle: 'Unlimited Applications',
    description:
      'Apply to unlimited job positions, enhancing your chances of securing employment abroad.',
  },
  {
    icon: <FaUserTie className="text-3xl text-blue-600" />,
    title: 'Benefit 3',
    subtitle: 'Higher Employer Engagement',
    description:
      'Stand out to employers with a Premium profile and higher visibility in searches.',
  },
  {
    icon: <FaTasks className="text-3xl text-blue-600" />,
    title: 'Benefit 4',
    subtitle: 'Comprehensive Job Search Management',
    description:
      'Manage all your job search activities and services from one account.',
  },
  {
    icon: <FaAward className="text-3xl text-blue-600" />,
    title: 'Benefit 5',
    subtitle: 'Cost-Effective Solution',
    description:
      'Enjoy extensive benefits and features for 1 year with a single membership purchase.',
  },
];






const deliverables = [
  {
    title: 'One-Year Validity:',
    description:
      'Premium membership benefits are available for a full year, providing extended access to all premium features.',
  },
  {
    title: 'Apply to Jobs in 11 Countries:',
    description:
      'Members can apply to job opportunities in 11 different countries, broadening their international job search.',
  },
  {
    title: 'Unlimited Job Applications:',
    description:
      'There are no limits on the number of job applications members can submit, maximising their job search potential.',
  },
   {
    title: 'Priority Display and Direct Employer Contact:',
    description:
      'Premium members receive priority display in employer searches and their contact details are visible, enabling direct contact from employers.',
  },
];





const steps = [
  {
    icon: <FaCrown className="text-white text-2xl" />,
    title: '1. Purchase Membership',
    desc: 'From the Benefitz platform.',
  },
  {
    icon: <FaUserAlt className="text-white text-2xl" />,
    title: '2. Profile Setup',
    desc: 'Set up and optimize your profile to display as "Premium" on the Jobsite.',
  },
  {
    icon: <FaBriefcase className="text-white text-2xl" />,
    title: '3. Access Jobs',
    desc: 'Gain access to active overseas job postings and add desired positions to your Wishlist.',
  },
  {
    icon: <FaPaperPlane className="text-white text-2xl" />,
    title: '4. Apply to Jobs',
    desc: "Apply to unlimited job positions directly from your 'My Wishlist' page.",
  },
  {
    icon: <FaCommentDots className="text-white text-2xl" />,
    title: '5. Direct Employer Contact',
    desc: 'Employers may contact you directly for job opportunities.',
  },
  {
    icon: <FaCog className="text-white text-2xl" />,
    title: '6. Manage Services',
    desc: 'Use our services in your Y-Jobs account to purchase and manage additional job search services.',
  },
];


  return (
    <Layout>

    <div className="bg-gray-50 text-gray-800">
       <div className="bg-[#002e5b] py-12 px-6 md:px-20">
      <div className="bg-white max-w-7xl mx-auto rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image */}
        <div>
          <img
            src="https://img.freepik.com/free-vector/golden-premium-luxury-label_1017-8444.jpg?ga=GA1.1.1617366038.1734696680&semt=ais_hybrid&w=740"
            alt="Premium Membership"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-[#002e5b] text-3xl md:text-4xl font-bold leading-tight">
            Benefitz <br />
            Premium <br />
            Membership
          </h2>

          <p className="text-[#002e5b] text-sm mt-6 leading-relaxed">
            Become a Benefitz Premium Member to enhance your overseas job search
            with priority visibility, unlimited applications, and direct contact
            with employers.
          </p>

          <div className="mt-6">
            <button className="bg-[#002e5b] text-white text-sm px-6 py-3 font-semibold rounded hover:bg-blue-900 transition-all relative"
          onClick={handleBuyNow}
>

              Buy Now (Rs. 999 /- only)
              <span className="absolute right-0 top-0 h-full w-1 bg-red-600"></span>
            </button>
          </div>

          {/* <p className="text-xs text-[#002e5b] mt-2">Including GST*</p> */}
        </div>
      </div>
    </div>


    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Overview */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          From visibility to direct contact, become a premium member and enjoy extensive benefits
          that aid you in finding a job abroad. The Benefitz Premium Membership enhances your overseas
          job search by providing you with priority visibility, unlimited applications, and direct
          contact opportunities with employers.
        </p>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-lg transition"
            >
              <div className="mb-3">{benefit.icon}</div>
              <h4 className="font-bold text-gray-800">{benefit.title}</h4>
              <p className="font-semibold text-gray-700">{benefit.subtitle}</p>
              <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Deliverables</h2>
      <div className="space-y-6">
        {deliverables.map((item, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-4">
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>


     



    <div className="bg-blue-900 text-white py-10 px-6 md:px-16">
      <h2 className="text-2xl font-bold mb-8">How does it work?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="mt-1">{step.icon}</div>
            <div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>






    <div className="flex flex-col md:flex-row border border-gray-300 rounded-md overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Benefitz International Jobsite–Premium Membership</h2>
        <p className="text-gray-700">
          Become a Benefitz Premium Member to enhance your overseas job search with priority visibility, unlimited applications, and direct contact with employers.
        </p>
      </div>

      {/* Right Section */}
      <div className="relative flex-1 p-6 bg-blue-900 text-white flex flex-col justify-between">
        {/* Badge */}
        <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 font-bold text-sm px-3 py-1 rounded-bl-lg shadow-lg z-10">
          40% OFF
        </div>

        <div>
          <p className="text-lg font-semibold mb-1">Take control of your overseas job search now</p>
          <p className="line-through text-gray-300 text-sm">Original Price: Rs 5,555/-</p>
          <p className="text-xl font-bold mt-1">Promotional Offer: <span className="text-white">Rs 999/- only</span></p>
        </div>

        <div className="mt-4">
          <button className="bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
          onClick={handleBuyNow}

>
            Become a Premium Member
          </button>
          {/* <p className="text-xs text-gray-300 mt-2">Including GST*</p> */}
        </div>
      </div>
    </div>
 

    
    </div>
    </Layout>

  );
};

export default Premium;
