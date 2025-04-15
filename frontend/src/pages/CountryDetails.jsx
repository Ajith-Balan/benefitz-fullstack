import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { useParams,Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import axios from 'axios';
const CountryDetails = () => {
  const [data, setData] = useState(null); // Holds the specific country data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Extract the ID from the URL
  const [isSending, setIsSending] = useState(false); // Track sending status

  const [formData, setFormData] = useState({
    name: '',
    visatype: '',
    country: '',
    countryCode: '+91',
    phone: '',
    email: '',
    terms: false,
  });

  // Fetch the data
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const  res  = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND}/api/v1/country/getoneCountry/${id}`
        );
        setData({ ...res.data }); // Correct destructuring
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !formData.name || !formData.phone ) {
      alert('Enter the fields')
      return;

    }
    setIsSending(true); // Set to true when sending starts


    const templateParams = {
      name: formData.name,
      visatype: formData.visatype,
      country: data.name,
      countryCode: formData.countryCode,
      phone: formData.phone,
      email: formData.email,
    };

    emailjs
    .send(  "service_ifk8wbk", // Replace with your EmailJS service ID
      "template_vuizy0i", // Replace with your EmailJS template ID
     templateParams,
     "beLgYajD0RyNxY_v_")
      .then(
        () => {
          alert('Form submitted successfully!');
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
          console.log('FAILED...', error);
          alert('Failed to submit the form. Please try again.');
        }
      )
      .finally(() => setIsSending(false)); // Reset to false when sending completes

  };

  // Show loading or error states
  if (loading) return    <div className="flex justify-center items-center min-h-[300px]">
  <div className="w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-full animate-spin"></div>
</div>;
  if (error) return <p>Error: {error}</p>;

  // Ensure `data` exists before rendering
  if (!data) return null;




    
const jobData = [
  {
    country: 'USA',
    requirements: ['Bachelor’s Degree', '5+ years experience', 'Work Visa'],
  },
  {
    country: 'Canada',
    requirements: ['English/French proficiency', 'Relevant degree', '2+ years experience'],
  },
  {
    country: 'Germany',
    requirements: ['Fluent in German', 'Work Permit', '3+ years experience'],
  },
  {
    country: 'Australia',
    requirements: ['Skill Assessment', 'Work Visa', '4+ years experience'],
  },
  {
    country: 'UAE',
    requirements: ['Skill Assessment', 'Work Visa', '4+ years experience'],
  },
  {
    country: 'Quatar',
    requirements: ['Skill Assessment', 'Work Visa', '4+ years experience'],
  },
];







const promotions = [
  {
    title: 'Resume Building Service',
    description: 'Get a professional resume designed to attract top recruiters.',
  },
  {
    title: 'Interview Preparation',
    description: 'Mock interviews and guidance from industry experts.',
  },
  {
    title: 'Special Discounts',
    description: 'Avail 20% off on all our premium packages this month.',
  },
  {
    title: 'Global Job Opportunities',
    description: 'Connect with top employers across the globe.',
  },
  {
    title: 'Career Counseling',
    description: 'Expert advice to help you choose the right career path.',
  },
  {
    title: 'Job Alerts',
    description: 'Stay updated with the latest job openings tailored to your profile.',
  },
];

const about = {
  heading: 'About Our Consultancy',
  description:
    'We are a leading job consultancy with a decade of experience connecting job seekers with top employers. Our services include resume building, career counseling, job placement assistance, interview preparation, and more. Our expert team ensures personalized support to help you achieve your career goals.',
};

const testimonials = [
  {
    name: 'John Doe',
    feedback:
      'Thanks to this consultancy, I landed my dream job within two months. The team was incredibly supportive and professional.',
  },
  {
    name: 'Jane Smith',
    feedback:
      'Their resume building service is top-notch. I started getting interview calls immediately after applying.',
  },
];









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

const promotion = [
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
      <div>
        <div className="container max-w-full bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 border">
          <div className="relative">
            <img
              src="https://www.y-axis.com/assets/cms/2024-12/Visa-page-banner.webp"
              alt="Visa Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-12 border">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 text-center">
               Form
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
  
  <option value="" disabled>Choose visa type</option>
      <option value="tourist">Spouse Visa</option>
      <option value="business">Job seeker Visa</option>
      <option value="study">Study Visa</option>
      <option value="work">Aupair Visa</option>
      <option value="immigration">Oppertunity card</option>
      <option value="immigration">Multiple entry visa</option>

    
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
      <option value={data.name} > {data.name}</option>

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
    <label htmlFor="terms" className="text-gray-600 text-sm">Accept <Link to={'/policy'} className='text-blue-600'>terms and conditions</Link> </label>
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="p-6 w-full mx-auto">
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              {data.Country}
            </h1>
            <h2 className="text-4xl font-bold mb-4">Visa Benefits</h2>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
          <div className="text-center w-1/4 p-8">
            <img
              src={data.photo}
              alt={data.Country}
              className="w-1/2 h-auto rounded-lg border"
            />
          </div>
        </div> */}
      </div>
   



      <div className="p-6  border mt-5">
      <h1 className="text-2xl font-bold text-center mb-6">Job Requirements by Country</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 transition-shadow duration-300 border hover:border-red-600"
          >
            <h2 className="text-xl font-semibold mb-2 text-red-600">{job.country}</h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="mb-1">
                  {req}
                </li>
              ))}
            </ul>
           </div>
        ))}
      </div>
    </div>









    <div className="p-6  mt-5 border">
     
     <section className="mb-12">
       <h1 className="text-2xl font-bold text-center mb-6"></h1>
       <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {promotion.map((promo, index) => (
           <div
             key={index}
             className="bg-white p-4 border hover:border-pink-400 transition-shadow duration-300"
           >
             <h2 className="text-xl font-semibold text-gray-500 mb-2">{promo.title}</h2>
             <p className="text-gray-600 font-bold text-md">{promo.description}</p>
           </div>
         ))}
       </div>
     </section>

     
     <section className="bg-white p-6 border hover:border-red-500 mb-12">
       <h1 className="text-2xl font-bold text-gray-600 mb-4">{about.heading}</h1>
       <p className="text-gray-700 mb-4 font-semibold text-sm">{about.description}</p>
       <ul className="list-disc list-inside text-gray-500">
         <li>Resume Building</li>
         <li>Career Counseling</li>
         <li>Interview Preparation</li>
         <li>Job Placement Assistance</li>
         <li>Job Alerts</li>
       </ul>
     </section>

         <section className="mb-12">
       <h1 className="text-2xl font-bold text-center mb-6">Testimonials</h1>
       <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
         {testimonials.map((testimonial, index) => (
           <div
             key={index}
             className="bg-white p-4 border hover:border-yellow-400 transition-shadow duration-300"
           >
             <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
             <h2 className="text-lg font-semibold text-yellow-400">- {testimonial.name}</h2>
           </div>
         ))}
       </div>
     </section>

    
     <section className="text-center">
       <h1 className="text-2xl font-bold text-red-600 mb-4">Ready to Kickstart Your Career?</h1>
       <p className="text-gray-700 mb-6">
         Contact us today and let’s work together to achieve your career goals!
       </p>
       <button className="hover:text-white py-2 px-4 border text-red-600 hover:bg-red-700 transition-colors">
         Contact us
       </button>
     </section>
   </div>




    
    </Layout>
  );
};

export default CountryDetails;
