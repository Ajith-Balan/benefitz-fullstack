import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/cards.css";
import { Link } from "react-router-dom";

const Cards = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCardDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch('/Benifits.countries.json'); // Ensure this path is correct
  //       if (!res) throw new Error('Network response was not ok');
  //       const data = await res.json(); 
  //       setCardDetails(data);
  //     } catch (err) {
  //       setError(err.message || "Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCardDetails();
  // }, []);



  const fetchCardDetails = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/country/getCountry`);
        setCardDetails(res.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
      setLoading(false);

    }
};

useEffect(() => {
     fetchCardDetails();
}, []);







  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

return loading ? (
  <div className="flex justify-center items-center h-screen bg-[#F3F7F3]">
    <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
  </div>
) : (    <div className="container mx-auto p-4 sm:p-6 border mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 w-full">
      <div className="flex flex-col justify-center text-center md:text-left">
          
        
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
            <strong>OUR BUSINESS CONSULTANCY SERVICES</strong> 
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>Financial consultancy – Bank, SBIC</li>
            <li>Work permits and VFS support</li>
            <li>Visa stamping for candidates with international clients</li>
            <li>Immigration services in various countries</li>
          </ul>
        </div>


        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 py-5 ">

  {cardDetails.map((card) => (
    <Link  to={`/country/${card._id}`} key={card._id}>
      <div className="flex justify-center items-center">
        <div className="flip-card w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square">
          <div className="flip-card-inner">
            {/* Front Side */}
            <div className="flip-card-front flex  sm:text-sm flex-col justify-center items-center bg-white border p-4 overflow-hidden w-full h-full">
              <img
                src={card.photo}
                alt={card.name}
                className="w-full h-3/4 object-cover"
              />
              <p className=" sm:d-none  py-2 text-center">
                {card.name}
              </p>
            </div>
            {/* Back Side */}
            <div className="flip-card-back bg-gray-100 text-gray-800 justify-center items-center flex flex-col border p-4">
              <h2 className="text-sm font-bold mb-2">{card.name}</h2>
        
             
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      </div>
    </div>
  );
};

export default Cards;
