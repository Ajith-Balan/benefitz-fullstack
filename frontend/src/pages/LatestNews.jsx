import { Link } from "react-router-dom";
import React from "react";

const LatestNews = () => {
  return (
    <div className="p-6 md:p-12 bg-white rounded-lg shadow-md max-w-4xl mx-auto space-y-4">
              <h2 className="text-3xl font-extrabold text-green-800">Latest News               <span className="text-red-600 text-4xl animate-ping">★</span>
              </h2>

      <h2 className="text-3xl font-extrabold text-purple-800">WORK IN HOLLAND</h2>

      <h3 className="text-xl font-bold text-gray-800">Job Positions:</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Warehouse Workers</li>
        <li>Helpers</li>
        <li>Packers</li>
        <li>Storekeepers</li>
        <li>Forklift Operators</li>
      </ul>

      <p className="text-sm font-medium text-blue-700 mt-4">
        📌 Hourly Salary: <span className="font-bold">€15–€20</span>
      </p>

      <p className="text-sm font-medium text-pink-700">
        🎁 Free Benefits Include:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Food</li>
        <li>Medical Care</li>
        <li>Accommodation</li>
        <li>Transport</li>
      </ul>

      <div className="mt-6 space-y-1 text-sm text-gray-800">
        <p>📞 <strong>+91 99475 61389</strong></p>
        <p>📍 Gennext Building, 6th Floor, Marar Road Area, Thrissur-680001</p>
      </div>

      <p className="text-xs text-red-600 mt-4 font-medium">
        We are only providing consultancy services legally and not a recruitment company.
      </p>

      <button className="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded text-sm font-semibold">
        <Link to={'/job'}>
        APPLY NOW

        </Link>
      </button>
    </div>
  );
};

export default LatestNews;
