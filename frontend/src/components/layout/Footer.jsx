import React from "react";
import { Link } from "react-router-dom"; // For internal navigation
import { FaInstagram, FaWhatsapp, FaEnvelope,  } from 'react-icons/fa';

const Footer = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '6235846558'; // Replace with your WhatsApp number
    const message = 'Hello! I would like to talk to a Benefitz International Expert';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (

    <footer className="bg-blue-100 text-black-900 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <img
            src="https://benefitzintl.com/wp-content/uploads/2024/01/benifitslogo.png" // Replace with your logo path
            alt="Benefitz International Logo"
            className="w-36 rounded mb-4"
          />
          <p className="text-sm">
            We guide students through every step of their journey to secure
            their dream international degree and are recognized as the leading
            overseas education consultants in the industry today.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Social Medias</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <i className="fab fa-facebook mr-2"></i> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <i className="fab fa-instagram mr-2"></i> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <i className="fab fa-linkedin mr-2"></i> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6235846558"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                → Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                → About Us
              </Link>
            </li>
            <li>
              <Link to="/immigration" className="hover:underline">
                → Immigration
              </Link>
            </li>
            <li>
              <Link to="/study" className="hover:underline">
                → Study Abroad
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                → Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Office Address */}
        <div>
          <h3 className="font-bold text-lg mb-4">Office Address</h3>
          <p className="text-sm">
            Benefitz International Consultancy Pvt Ltd <br />
            Genext Building, near Thekkinkadu Maidan, Marar Road, Thrissur,
            Kerala 680001
          </p>
          <p className="mt-4">
            <a href="tel:+916235846558" className="block hover:underline">
              <i className="fas fa-phone mr-2"></i> +91 6235846558
            </a>
            <a href="tel:+918089319608" className="block hover:underline">
              <i className="fas fa-phone mr-2"></i> +91 80893 19608
            </a>
            <a
              href="mailto:info@benefitzintl.in"
              className="block hover:underline"
            >
              <i className="fas fa-envelope mr-2"></i> info@benefitzintl.in
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-black/10 pt-4 text-sm">
        <p>
          Copyright © <Link to={'/policy'}>T&C Apply </Link>  2024 Benefitz, All rights reserved. Powered by Quick Tech
          
        </p>
      </div>

      {/* Floating Button */}
      <button
      onClick={handleWhatsAppClick}
      className="fixed flex gap-3 bottom-12 right-10 bg-white   text-black rounded-full px-4 p-2 shadow-lg hover:bg-green-600 transition-all"
    >
      <FaWhatsapp size={24} className=" rounded-full text-green-400" />  Contact us
    </button>
    </footer>
  );
};

export default Footer;
