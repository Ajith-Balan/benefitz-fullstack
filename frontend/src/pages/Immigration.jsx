import React, { useState } from "react";
import emailjs from "emailjs-com";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Immigration = () => {

  const countryRequirements = {
    usa: [
      "Valid passport",
      "Immigration petition approved",
      "Proof of financial support",
      "Medical examination",
      "Police clearance",
    ],
    canada: [
      "Valid passport",
      "Permanent residence application approved",
      "Proof of financial resources",
      "Police certificate",
      "Medical exam (if required)",
    ],
    uk: [
      "Valid passport",
      "Immigration visa application approved",
      "Proof of financial support",
      "Criminal record check",
    ],
    australia: [
      "Valid passport",
      "Immigration visa application approved",
      "Police clearance",
      "Medical exam",
      "Proof of English language proficiency",
    ],
    germany: [
      "Valid passport",
      "Immigration petition approved",
      "Proof of financial resources",
      "Health insurance",
    ],
  };

  const [formData, setFormData] = useState({
    name: "",
    visatype: "Immigration Visa",
    country: "",
    countryCode: "",
    phone: "",
    email: "",
    terms: false,
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      visatype: formData.visatype,
      country: formData.country,
      countryCode: formData.countryCode,
      phone: formData.phone,
      email: formData.email,
      terms: formData.terms ? "Accepted" : "Not Accepted",
    };

    emailjs
      .send(
        "service_ifk8wbk", // Replace with your EmailJS service ID
        "template_vuizy0i", // Replace with your EmailJS template ID
       templateParams,
       "beLgYajD0RyNxY_v_"// Replace with your EmailJS user ID
      )
      .then(
        () => {
          alert("Form submitted successfully!");
          setFormData({
            name: "",
            visatype: "Immigration Visa",
            country: "",
            countryCode: "",
            phone: "",
            email: "",
            terms: false,
          });
        },
        (error) => {
          console.error("Email sending failed!", error);
          alert("Failed to send the email. Please try again.");
        }
      )
      .finally(() => setIsSending(false));
  };

  return (
    <Layout>
      <div className="bg-white min-h-full mx-auto p-3 sm:px-6 md:px-12">
        <div className="container max-w-full bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 border">
          <div className="relative">
            <img
              src="https://www.careinsurance.com/upload_master/media/posts/January2024/immigrant-and-non-immigrant-visas.webp"
              alt="Immigration Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-12 border">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 text-center">
              Where would you like to immigrate?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 p-7 max-w-lg mx-auto">
              {/* Form Fields */}
              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <label className="block text-gray-700 font-medium text-sm sm:text-md">I am</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-2 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <label className="block text-gray-700 font-medium text-sm sm:text-md">Looking for</label>
                <select
                  name="visatype"
                  value={formData.visatype}
                  onChange={handleChange}
                  className="col-span-2 w-full text-gray-800 bg-transparent border-none border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 py-2"
                >
                  <option value="immigration">Immigration Visa</option>
                  <option value="study">Study Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="tourist">Tourist Visa</option>
                  <option value="business">Business Visa</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <label className="block text-gray-700 font-medium text-sm sm:text-md">Visa for</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="col-span-2 w-full text-gray-800 bg-transparent border-none border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 py-2"
                >
                  <option value="" disabled>Select country</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <label className="block text-gray-700 font-medium text-sm sm:text-md">Contact me at</label>
                <div className="col-span-2 flex gap-4">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-24 text-gray-800 bg-transparent border-none border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 py-2"
                  >
                    <option value="+91">+91 (India)</option>
                    
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <label className="block text-gray-700 font-medium text-sm sm:text-md">And My email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  className="col-span-2 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  id="terms"
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="terms" className="text-gray-600 text-sm">Accept <Link to={'/policy'} className='text-blue-600'>terms and conditions</Link></label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`bg-white text-black font-semibold py-3 px-8 border border-red-500 ${
                  isSending
                    ? "cursor-not-allowed bg-gray-300"
                    : "hover:bg-red-600 hover:text-white"
                } transition duration-300 w-full`}
              >
                {isSending ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Country-wise Immigration Requirements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(countryRequirements).map(([country, requirements]) => (
            <div
              key={country}
              className="bg-white border border-gray-300 p-6 hover:border-red-500 transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-500 capitalize mb-4">
                {country === "usa" ? "United States" : country}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border min-h-screen py-12 px-6">
        <div className="container mx-auto max-w-5xl overflow-hidden">
          <div className="bg-red-600 text-white p-8">
            <h1 className="text-4xl font-bold text-center">Your Immigration Journey Starts Here!</h1>
            <p className="mt-4 text-center text-lg">
              Get in touch with our experts at <span className="font-semibold">Benifits International</span> to
              guide you through the process of immigration.
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-500 mb-4">Why Immigrate?</h2>
              <p className="text-gray-400 font-extrabold text-lg mb-4">
                Pursue better job opportunities, higher education, and a higher standard of living abroad. Our
                experienced team at <span className="font-bold text-red-500">Benifits International</span> is here to help.
              </p>
            </div>

            <div className="bg-black/10 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Why Choose Us?</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">&#10003;</span>
                  <p>Professional guidance through the immigration process</p>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">&#10003;</span>
                  <p>Clear, honest, and transparent consultation services</p>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 text-2xl">&#10003;</span>
                  <p>Expert knowledge of different country regulations</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Immigration;
