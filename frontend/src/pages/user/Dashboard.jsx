

import { useAuth } from "../../context/Auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../../components/layout/Layout';
import UserMenu from "../../components/layout/UserMenu";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOneUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getoneuser/${auth.user._id}`);
      setUserDetails(res.data.data);
      setReferredUsers(res.data.referredUsers);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const successCount = referredUsers.filter(user => user.receipt).length;

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

  return auth?.user ? (
    <Layout title={'Dashboard'}>
      <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
        <aside className="w-full lg:w-1/4 bg-white border-r border-gray-200 p-4 shadow-sm">
          <UserMenu />
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Welcome, <span className="text-pink-500">{auth?.user?.name}</span></h1>
          </header>

          {!auth.user.receipt ? (
            <section className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h2 className="text-3xl font-semibold text-gray-900">Upgrade to Premium</h2>
              <p className="text-gray-600 mt-2">Enjoy exclusive benefits and premium content for just ₹999/year.</p>
              <button 
                onClick={loadRazorpay}
                className="mt-6 px-6 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Subscribe Now
              </button>
            </section>
          ) : (
            <section className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">You are a Premium Member 🎉</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700 font-medium">Amount Paid: ₹{auth.user.amount / 100}</p>
                <p className="text-gray-700 font-medium">Subscribed on: {new Date(auth.user.updatedAt).toLocaleDateString('en-GB')}</p>
                <p className="text-gray-700  font-medium col-span-2">Valid Before: {userDetails.updatedAt ? new Date(new Date(userDetails.updatedAt).setFullYear(new Date(userDetails.updatedAt).getFullYear() + 1)).toLocaleDateString('en-GB') : "—"}</p>
              </div>
              {/* <p className="text-gray-500 text-sm mt-2">Thank you for supporting us. 🙌</p> */}
            </section>
          )}

          {!loading && auth.user.receipt && (
            <section className="mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">User Info</h3>
                <p className="mb-2 text-gray-800">Name: {userDetails.name}</p>
                <p className="mb-2 text-gray-800">Email: {userDetails.email}</p>
                <p className="mb-2 text-gray-800">Phone: {userDetails.phone}</p>
                <p className="mb-4 text-gray-800">Successful Referrals: {successCount}</p>

                <h4 className="text-xl font-semibold text-blue-600 mb-3">Referral List</h4>
                {referredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="px-4 py-2 border">#</th>
                          <th className="px-4 py-2 border">Name</th>
                          <th className="px-4 py-2 border">Email</th>
                          <th className="px-4 py-2 border">Phone</th>
                          <th className="px-4 py-2 border">Registered On</th>
                          <th className="px-4 py-2 border">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referredUsers.map((user, index) => (
                          <tr key={index} className="even:bg-gray-50">
                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.phone || '—'}</td>
                            <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">
                              {user.receipt ? (
                                <span className="text-green-600">Success ✅</span>
                              ) : (
                                <span className="text-yellow-600">Pending 🟡</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No referrals found for this user.</p>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </Layout>
  ) : (
    <p className="text-center text-gray-500">No user data available.</p>
  );
};

export default Dashboard;











































































// import { useAuth } from "../../context/Auth";
// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Layout from '../../components/layout/Layout';
// import UserMenu from "../../components/layout/UserMenu";
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [auth, setAuth] = useAuth();
//      const [userDetails, setUserDetails] = useState({});
//       const [referredUsers, setReferredUsers] = useState([]);
//       const [loading, setLoading] = useState(false);

//   const getOneUser = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getoneuser/${auth.user._id}`);
//       setUserDetails(res.data.data);
//       setReferredUsers(res.data.referredUsers);
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while fetching user data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getOneUser();
//   }, []);

//   const successCount = referredUsers.filter(user => user.receipt).length;



//     const loadRazorpay = async () => {
//         try {
//             const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/createsubscribe`);
    
//             const { currency, receipt } = res.data;
    
//             const options = {
//                 key: "rzp_test_kZ85G3MYrmQk4J",
//                 amount: 99900,
//                 currency: currency,
//                 receipt: receipt,
//                 name: "Your Company/Brand Name",
//                 description: "Subscription Payment",
//                 handler: async function (response) {
//                     try {
//                         // Update state
//                         setAuth((prevAuth) => ({
//                             ...prevAuth,
//                             user: { ...prevAuth.user, receipt, amount: 99900, currency }
//                         }));
    
//                         // Update localStorage
//                         let ls = localStorage.getItem("auth");
//                         ls = JSON.parse(ls);
//                         ls.user = { ...ls.user, receipt, amount: 99900, currency };
//                         localStorage.setItem('auth', JSON.stringify(ls));
    
//                         toast.success("Payment successful & profile updated!");
//                     } catch (error) {
//                         console.error("Error during handler:", error);
//                         alert("Payment  successful");
//                     }
//                 },
//                 theme: { color: "#4CAF50" },
//                 modal: {
//                     ondismiss: function () {
//                         alert("🛑 Payment was cancelled!");
//                     },
//                 },
//             };
    
//             const rzp1 = new window.Razorpay(options);
//             rzp1.open();
//         } catch (error) {
//             console.error("Error initializing Razorpay:", error);
//             alert("⚠️ Failed to initiate payment. Please try again.");
//         }
//     };
    










//     return auth?.user ? (
//         <Layout title={'Dashboard'}>
//             <div className="flex flex-col lg:flex-row bg-gray-100">
//                 {/* Sidebar */}
//                 <div>
//                     <UserMenu />
//                 </div>

//                 {/* Main Content */}
//                 <main className="flex-1 p-6 lg:p-8 w-full lg:w-3/4">
//                     <h1 className="text-3xl font-bold text-gray-800 flex flex-wrap gap-2">
//                         Welcome <span className="text-pink-500">{auth?.user?.name}</span>
//                     </h1>

//                     {/* Conditional UI Based on Subscription Status */}
//                     {!auth.user.receipt ? (
//                         /* Non-Subscriber View */
//                         <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
//                             <h2 className="text-2xl font-semibold text-gray-800">Upgrade to Premium</h2>
//                             <p className="text-gray-600 mt-2">
//                                 Enjoy exclusive benefits, ad-free experience, and premium content for just ₹999/Year.
//                             </p>
//                             <button 
//                                 onClick={loadRazorpay}
//                                 className="text-gray-50 text-center mt-4 p-2 w-32 rounded-full bg-pink-500 hover:bg-pink-600 transition block mx-auto"
//                             >
//                                 Subscribe
//                             </button>
//                         </div>
//                     ) : (
//                         /* Subscriber View */
//                         <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
//                             <h2 className="text-2xl font-semibold text-green-600">You are a Premium Member 🎉</h2>
//                             <p className="text-gray-700 mt-2 font-medium">Amount Paid: ₹{auth.user.amount/100}</p>
//                             <p className="text-gray-600">
//                                 Subscribed on: {new Date(auth.user.updatedAt).toLocaleDateString('en-GB')}
//                             </p>
//                             <p className="text-gray-500 text-sm mt-2">
//                                 Enjoy your premium benefits! Thank you for supporting us. 🙌
//                             </p>
//                             {loading ? (
//             <p className="text-center text-gray-500">Loading data...</p>
//           ) : (
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4 text-blue-700">
//                 Name: <span className="text-gray-800">{userDetails.name}</span>
//               </h2>
//               <h2 className="text-xl font-semibold mb-4 text-blue-700">
//                 Email: <span className="text-gray-800">{userDetails.email}</span>
//               </h2>
//               <h2 className="text-xl font-semibold mb-4 text-blue-700">
//                 Phone: <span className="text-gray-800">{userDetails.phone}</span>
//               </h2>
//               <h2 className="text-xl font-semibold mb-4 text-blue-700">
//   Valid Before:{" "}
//   <span className="text-gray-800">
//     {userDetails.updatedAt
//       ? new Date(new Date(userDetails.updatedAt).setFullYear(new Date(userDetails.updatedAt).getFullYear() + 1))
//           .toLocaleDateString('en-GB')
//       : "—"}
//   </span>
// </h2>

//               <h2 className="text-xl font-semibold mb-4 text-blue-700">
//                 Number of successful referrals: <span className="text-gray-800">{successCount}</span>
//               </h2>

//               {referredUsers.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full table-auto border border-gray-300">
//                     <thead className="bg-blue-100 text-gray-700">
//                       <tr>
//                         <th className="px-4 py-2 border">#</th>
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">Email</th>
//                         <th className="px-4 py-2 border">Phone</th>
//                         <th className="px-4 py-2 border">Registered On</th>
//                         <th className="px-4 py-2 border">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {referredUsers.map((user, index) => (
//                         <tr key={index} className="even:bg-gray-100 hover:bg-gray-50">
//                           <td className="px-4 py-2 border text-center">{index + 1}</td>
//                           <td className="px-4 py-2 border">{user.name}</td>
//                           <td className="px-4 py-2 border">{user.email}</td>
//                           <td className="px-4 py-2 border">{user.phone || '—'}</td>
//                           <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
//                           <td className="px-4 py-2 border">
//                             {user.receipt ? (
//                               <span className="text-green-600">Success ✅</span>
//                             ) : (
//                               <span className="text-yellow-500">Pending 🟡</span>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-gray-600">No referrals found for this user.</p>
//               )}
//             </div>
//           )}
//                         </div>
                        
//                     )}
//                 </main>
//             </div>
//         </Layout>
//     ) : (
//         <p className="text-center text-gray-500">No user data available.</p>
//     );
// };

// export default Dashboard;






















