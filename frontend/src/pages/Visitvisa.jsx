import React, { useState } from "react";
import emailjs from "emailjs-com";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";


const Visitvisa = () => {
    const [isSending, setIsSending] = useState(false); // Track sending status
  
  const [formData, setFormData] = useState({
    name: "",
    visatype: "Visiting visa",
    country: "",
    countryCode: "",
    phone: "",
    email: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();
      if (!formData.name || formData.country || formData.phone ) {
              alert('Please fill in all required fields');
              return;
            }
    setIsSending(true); // Set to true when sending starts


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
      .send(  "service_ifk8wbk", // Replace with your EmailJS service ID
        "template_vuizy0i", // Replace with your EmailJS template ID
       templateParams,
       "beLgYajD0RyNxY_v_")
      .then(
        () => {
          alert("Form submitted successfully!");
          setFormData({
            name: "",
            visatype: "",
            country: "",
            countryCode: "",
            phone: "",
            email: "",
            terms: false,
          });   
                },
        (error) => {
          console.error("Email sending failed!", error);
        }
      )
      .finally(() => setIsSending(false)); // Reset to false when sending completes

  };
  




  const countries = [
    {
      name: "USA",
      status: "Open",
      requirements: [
        "Valid Passport",
        "DS-160 Form",
        "Interview Appointment",
      ],
    },
    {
      name: "Canada",
      status: "Open",
      requirements: [
        "Valid Passport",
        "Proof of Funds",
        "Travel History",
      ],
    },
    {
      name: "Newzland",
      status: "Open",
      requirements: [
        "Valid Passport",
        "Travel Insurance",
        "Invitation Letter",
      ],
    },
    {
      name: "Australia",
      status: "Open",
      requirements: [
        "Valid Passport",
        "Travel Insurance",
        "Invitation Letter",
      ],
    },
    {
        name: "Uk",
        status: "Open",
        requirements: [
          "Valid Passport",
          "Travel Insurance",
          "Invitation Letter",
        ],      },
      {
        name: "Singapore",
        status: "Open",
        requirements: [
          "Valid Passport",
          "Travel Insurance",
          "Invitation Letter",
        ],      },
  ];






  const services = [
    {
      title: "Personalized Visa Consultancy",
      description:
        "Tailored guidance for your visa application process to ensure success.",
    },
    {
      title: "Document Verification",
      description:
        "Thorough verification of your documents to meet embassy standards.",
    },
    {
      title: "Application Assistance",
      description:
        "Expert assistance in filling out visa forms with accuracy.",
    },
    {
      title: "Travel Insurance",
      description:
        "Get affordable travel insurance plans for your trips.",
    },
  ];

  const promotions = [
    {
      title: "Discounted Family Packages",
      description: "Special discounts for family visa applications.",
    },
    {
      title: "Student Visa Offers",
      description: "Reduced fees for student visa processing.",
    },
    {
      title: "Referral Rewards",
      description: "Invite friends and earn rewards on their successful visa applications.",
    },
  ];

  return (
    <Layout>
    <div className="bg-white min-h-full mx-auto p-3 sm:px-6 md:px-12">
      <div className="container max-w-full bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 border">
        <div className="relative">
          <img
            src="https://eduworldvisa.com/public/uploads/1710159444_a3d8e5996dc7b84a1d33.jpg"
            alt="Visa Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-black bg-opacity-70 flex items-center justify-center"></div>
        </div>
        <div className="p-6 sm:p-8 lg:p-12 border">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Apply for a Visa
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 p-7 max-w-lg mx-auto">
  <div className="grid sm:grid-cols-3 gap-4 items-center">
    <label className="block text-gray-700 font-medium text-sm sm:text-md">I am</label>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      value={formData.name}
      onChange={handleChange}
      className="col-span-2 w-full text-gray-800  placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
    />
  </div>

  <div className="grid sm:grid-cols-3 gap-4 items-center">
    <label className="block text-gray-700 font-medium text-sm sm:text-md">Looking for </label>
    <select
      name="visatype"
      value={formData.visatype}
      onChange={handleChange}
      className="col-span-2 w-full text-gray-800 bg-transparent border-none border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 py-2"
    >
      <option value="tourist">Visit Visa</option>

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
      <option value="india">India</option>
      <option value="germany">Germany</option>
      <option value="france">France</option>
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
        className="w-full text-gray-800  placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
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
      className="col-span-2 w-full text-gray-800  placeholder-gray-500 focus:outline-none focus:ring-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 py-2"
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





    <div className="container mx-auto mt-10 bg-transparant p-8 border ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Visiting Visa Status & Requirements
      </h1>
      <p className="text-md font-bold text-gray-600 mb-8">
        Stay updated with the latest visiting visa statuses and requirements for different countries.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-6  transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {country.name}
            </h2>
            <p
              className={`text-sm font-bold mb-4 ${
                country.status === "Open"
                  ? "text-green-600"
                  : country.status === "Restricted"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Status: {country.status}
            </p>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Requirements:
            </h3>
            <ul className="list-disc list-inside text-gray-500">
              {country.requirements.map((requirement, idx) => (
                <li key={idx}>{requirement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>





    <div className="container mx-auto mt-10  p-8 border">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Global Visa Consulting Services
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          We are an international company offering top-notch visa consultancy
          services to help you explore the world effortlessly.
        </p>
      </header>

    
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-gray-500">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-yellow-400 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-500 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

   
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Promotional Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className=" p-6 border border-red-600 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                {promo.title}
              </h3>
              <p className="text-gray-700">{promo.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
 
    </div>
    </Layout>
  );
};

export default Visitvisa;
