import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import  Layout  from "../components/layout/Layout";
const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);

  const services = [
    {
      img: "https://lorien.finance/blog/wp-content/uploads/2024/10/Education-Loan-for-Abroad-Studies.jpg ",
      text: "Visiting  Visa",
      pg: "We assist with hassle-free processing of visiting visas for various countries ensuring a smooth travel experience",
      link: "/visiting-visa",
      details:"we collaborate with, SCHENGEN COUNTRIES, NON SCHENGEN COUNTRIES, AUSTRALIA, NEW ZEALAND, USA, UK, CANADA"
    },
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2022/7/FE/CC/BX/62175184/placement-consultancy-in-india-placement-agencies-in-india-accord-consultants-interview-tips.png",
      text: "HR Consultancy services for work permit with visas in different  countries",
      pg: (
        <>
          <p>We collaborate with <span className="font-bold">37+ countries</span>.</p>
          <p><span className="font-bold">100% placement assistance</span> and <span className="font-bold">1000+ trusted clients</span>.</p>
        </>
      ),
      link: "/job",
      details:"We are are a premier HR consultancy specializing in work permits and visa facilitation across multiple countries. Our expertise industrial /healthcare/ education/ manufacturing / automobile and IT. We specialize in facilitiating the acquisition of authentic documents from reputable international employers ensuring a smooth and hassle-free visa stamping process . Our meticulous approach guarantees that clients secure their dream jobs in their desired country with confidence and ease. We provide essential documents including ; , Job offer , Work permit , Insurance , Air ticket , Job agreement , Accommodation Documents , Travel insurance "

    },
    {
      img: "https://didmdw8v48h5q.cloudfront.net/wp-content/uploads/2023/01/Quiz_-Which-Destination-Country-Should-I-Study-Abroad-In.png",
      text: "Study Abroad",
      pg: " We are servicing for 375 universities across the globe. Conducting 4800 professional courses including Arts , IT, Science , Hospitality. A++ star universities , seeing reputed countries like USA, CANADA, UK, Schengen countries.",
      link: "/visiting-visa",
      details:"Course Highlights , Bussiness and Management , IT and Computer science , Finance and Accounting , Healthcare and Medicine , Legal and Compliance , Engineering and Technology , Education and Training , Media and communication , Hospitality and Travel , Language and Translation , Creative Arts and Design"

    },
  ];

  const animationSides = ["fade-left", "fade-right", "fade-up"];

  return (
    <Layout>


    <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12">
      <h2 className="text-3xl font-bold text-start mb-6 text-teal-500 font-space-grotesk">
        Our Services
      </h2>
      <hr className="border-teal-300 mb-8" />
      <div className="mb-14">
        <h1 className="text-4xl font-bold">
          <span className="text-teal-500">Delivering Assistance</span> Immigration
          Services & Business <span className="text-teal-500">Consultancy</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-8 gap-y-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-500"
            data-aos={animationSides[index % animationSides.length]}
          >
            <img
              src={service.img}
              alt={service.text}
              className="w-full h-60 object-cover"
            />
            <div className="bg-teal-500 text-white p-5 relative">
              <h3 className="text-2xl font-semibold mb-3 font-space-grotesk">
                {service.text}
              </h3>
              <div className="text-sm mb-5 font-space-grotesk text-gray-100 leading-relaxed">
                {typeof service.pg === "string" ? <p>{service.pg}</p> : service.pg}
              </div>
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 font-space-grotesk text-sm underline"
              >
                Contact now <FaArrowRight />
              </Link>
            </div>


            <div>
  <h3 className="font-bold text-teal-600 p-5">Details, </h3>
  {service.details && (
    <>
      <p className="px-5 text-teal-500 text-md  mb-2">
        {service.details.split(',')[0].trim()}
      </p>
      <ul className="list-disc list-inside px-5">
        {service.details
          .split(',')
          .slice(1)
          .map((point, idx) => (
            <li key={idx} className="text-sm text-gray-700">
              {point.trim()}
            </li>
          ))}
      </ul>
    </>
  )}
</div>


          </div>

         


        ))}
      </div>
    </div>
    </Layout>

  );
};

export default Services;
