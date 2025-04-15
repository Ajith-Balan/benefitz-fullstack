import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp,FaCrown, FaInstagram } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import MarqueeText from "../MarqueeText";
import { useAuth } from '../../context/Auth';
import { Space } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const dashboardPath = auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user";


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };




  return (
    < > 

           <nav className="bg-[#0055a6] z-10 top-0  w-full shadow-md">
            {/* <p className="bg-blue-100 w-full  text-center  text-sm " > ✨  We   are  only   providing consultancy services   legally  and  not recruitment company </p> */}

        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={`/`}>
        <div className="text-2xl font-bold text-red-600 flex items-center">
            <img
              src="https://benefitzintl.com/wp-content/uploads/2024/01/benifitslogo.png"
              alt="Logo"
              className="w-full h-16 mr-4"
            />
          </div>
        </Link>

          <div className="hidden md:flex text-sm  items-center space-x-3">
            <div className="flex items-center gap-2 border-r pr-2">
              <FaPhoneAlt className="text-lg mr-2" />
              <div className="flex  flex-col">
              {/* <a href="tel:+6235846558" className="text-white"> 6235846558</a> */}
              <a href="tel:+8089319608" className="text-white">8089319608</a>
              </div>
       

            </div>
            <div className="flex border-r pr-2 items-center">
              <FaWhatsapp className="text-green-500 text-lg mr-2" />
              <a href="https://wa.me/6235846558" target="_blank" rel="noopener noreferrer" className="text-green-500">WhatsApp</a>
            </div>
            <div className="flex border-r pr-2 items-center">
              <FaInstagram className="text-purple-800 text-lg mr-2" />
              <a href="https://www.instagram.com/benefitz_int?igsh=aTc4a3Nhb2thaml2" target="_blank" rel="noopener noreferrer" className=" font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Instagram</a>
            </div>
           
            <div className="flex text-white items-center">
            <Link to={'/about'}>
              About Us
              </Link>
            </div>
            <Link to={`/regester`}>
            <button className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-2 rounded shadow-lg font-semibold hover:scale-105 transition-transform">
      <FaCrown className="text-xl" />
      Subscribe - ₹999
    </button>
         </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#0055a6] text-white shadow-lg transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col mt-12 space-y-4">
          {auth?.user ? (
            <Link to={dashboardPath} className="px-6 py-3 hover:bg-blue-500">Profile</Link>
          ) : (
            <Link to="/login" className="px-6 py-3 hover:bg-blue-500">Login</Link>
          )}
          <Link to="/services" className="px-6 py-3 hover:bg-blue-500">Services</Link>
          <Link to="/study" className="px-6 py-3 hover:bg-blue-500">Study Visa</Link>
          <Link to="/visiting-visa" className="px-6 py-3 hover:bg-blue-500">Visiting Visa</Link>
          <Link to="/job" className="px-6 py-3 hover:bg-blue-500">Job Consultancy</Link>
          <Link to="/immigration" className="px-6 py-3 hover:bg-blue-500">Immigration</Link>

          {/* Contact Info */}
          <div className="px-6 py-3 flex items-center border-t border-white">
            <FaPhoneAlt className="text-lg mr-2" />
            <a href="tel:+6235846558" className="text-white">Call: 6235846558</a>
          </div>
          <div className="px-6 py-3 flex items-center">
            <FaWhatsapp className="text-green-500 text-lg mr-2" />
            <a href="https://wa.me/6235846558" target="_blank" rel="noopener noreferrer" className="text-green-500">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

           <nav className="bg-blue-400 sticky top-0 z-10 right-0 w-full  hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-end">
        <Link to={`/`}>
          <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-green-400 hover:border-emerald-500">
              Home
          </div>
          </Link>
           {/* <Link to={`/services`}>
          <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-green-400 hover:border-emerald-500">
              Updates ✨
          </div>
          </Link> */}

          <Link to={`/services`}>
          <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-green-400 hover:border-emerald-500">
              Services
          </div>
          </Link>

       <Link to={`/study`}>
       <div className="group text-center w-32 flex items-center justify-center h-12 border hover:bg-emerald-400 hover:text-white hover:border-emerald-500">
              Study Visa
          </div>
       </Link>
         <Link to={`/visiting-visa`}>
         <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-violet-400 hover:border-violet-500">
             Visa
          </div>
         </Link>
        <Link to={`/job`}>
        <div className="group text-center w-32 hover:text-white flex items-center justify-center h-12 border hover:bg-pink-400 hover:border-pink-500">
              Job Consaltancy
          </div>
        </Link>
          <Link to={'/immigration'}>
          <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-yellow-400 hover:border-yellow-500">

            Immigration
            </div> 

            </Link>        
               {auth?.user? (

        <Link to={dashboardPath}>
                         <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-yellow-400 hover:border-yellow-500">

          Profile
          </div>

        </Link>
      ) : (
        <Link to="/login">
                                   <div className="group text-center hover:text-white w-32 flex items-center justify-center h-12 border hover:bg-yellow-400 hover:border-yellow-500">

          Login
          </div>

        </Link>
      )}       
         
        </div>
      </nav>
      <MarqueeText/>
      
    </>
  );
};

export default Header;

