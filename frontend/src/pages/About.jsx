import React from 'react';
import Layout from '../components/layout/Layout';
import { FaGlobe, FaHandshake, FaBusinessTime } from 'react-icons/fa';

// Replace with a high-quality image related to Benefitz International
const aboutImage = 'https://st2.depositphotos.com/3591429/10566/i/450/depositphotos_105666254-stock-photo-business-people-at-meeting-and.jpg';

const About = () => {
  return (
      <Layout title={'About Us - Benefitz International'}>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">

        <div className=" mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">About Benefitz International</h1>
          <img src={aboutImage} alt="About Benefitz International" className="w-full h-56 object-cover rounded-md mb-6" />

          <p className="mb-4 text-gray-700 text-lg">
            Benefitz International is a premier consultancy firm specializing in global business solutions. Our expertise spans across multiple industries, including corporate strategy, business expansion, and international trade facilitation. We are committed to providing tailored solutions that drive success in a rapidly evolving global market.
          </p>

          <p className="mb-4 text-gray-700 text-lg">
            With years of experience, we have built a strong reputation for guiding businesses through complex challenges, helping them establish a global presence, and ensuring seamless operations in international markets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-center p-5 bg-blue-700 text-white rounded-md shadow-md">
              <FaGlobe className="h-8  mr-3" />
              <span>Global Expansion</span>
            </div>
            <div className="flex items-center p-5 bg-blue-700 text-white rounded-md shadow-md">
              <FaHandshake className="h-8 mr-3" />
              <span>Strategic Partnerships</span>
            </div>
            <div className="flex items-center p-5 bg-blue-700 text-white rounded-md shadow-md">
              <FaBusinessTime className="h-8  mr-3" />
              <span>Expert Consultancy</span>
            </div>
          </div>
        </div>
        </div>

      </Layout>
  );
}

export default About;