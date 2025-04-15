import { useAuth } from "../../context/Auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../../components/layout/Layout';
import UserMenu from "../../components/layout/UserMenu";

const Dashboard = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // const loadRazorpay = async () => {
    //     try {
    //         const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/createsubscribe`);
    //         const options = {
    //             key: "rzp_test_kZ85G3MYrmQk4J",
    //             amount: 99900,
    //             currency: res.data.currency,
    //             name: "Premium Subscription",
    //             description: "Get exclusive benefits for ₹999/Year",
    //             order_id: res.data.id,
    //             handler: async function (response) {
    //                 try {
    //                       setAuth((prevAuth) => ({
    //                              ...prevAuth,
    //                              user: res.data?.order,
    //                            }));
    //                            let ls = localStorage.getItem("auth");
    //                            ls = JSON.parse(ls);
    //                            ls.user = data.order;
    //                            localStorage.setItem('auth', JSON.stringify(ls));
    //                            toast.success("Profile updated successfully");
                     

    //                 } catch (error) {
    //                     alert(" Payment Verification Success please login again!");
    //                 }
    //             },
    //             theme: { color: "#4CAF50" },
    //             modal: {
    //                 ondismiss: function () {
    //                     alert("🛑 Payment was cancelled!");
    //                 },
    //             },
    //         };
    //         const rzp1 = new window.Razorpay(options);
    //         rzp1.open();
    //     } catch (error) {
    //         console.error("Error initializing Razorpay:", error);
    //         alert("⚠️ Failed to initiate payment. Please try again.");
    //     }
    // };





    const loadRazorpay = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/createsubscribe`);
    
            const { currency, receipt } = res.data;
    
            const options = {
                key: "rzp_test_kZ85G3MYrmQk4J",
                amount: 99900,
                currency: currency,
                receipt: receipt,
                name: "Your Company/Brand Name",
                description: "Subscription Payment",
                handler: async function (response) {
                    try {
                        // Update state
                        setAuth((prevAuth) => ({
                            ...prevAuth,
                            user: { ...prevAuth.user, receipt, amount: 99900, currency }
                        }));
    
                        // Update localStorage
                        let ls = localStorage.getItem("auth");
                        ls = JSON.parse(ls);
                        ls.user = { ...ls.user, receipt, amount: 99900, currency };
                        localStorage.setItem('auth', JSON.stringify(ls));
    
                        toast.success("Payment successful & profile updated!");
                    } catch (error) {
                        console.error("Error during handler:", error);
                        alert("Payment was successful, but profile update failed. Please login again!");
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
            <div className="flex flex-col lg:flex-row bg-gray-100">
                {/* Sidebar */}
                <div>
                    <UserMenu />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 w-full lg:w-3/4">
                    <h1 className="text-3xl font-bold text-gray-800 flex flex-wrap gap-2">
                        Welcome <span className="text-pink-500">{auth?.user?.name}</span>
                    </h1>

                    {/* Conditional UI Based on Subscription Status */}
                    {!auth.user.receipt ? (
                        /* Non-Subscriber View */
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800">Upgrade to Premium</h2>
                            <p className="text-gray-600 mt-2">
                                Enjoy exclusive benefits, ad-free experience, and premium content for just ₹999/Year.
                            </p>
                            <button 
                                onClick={loadRazorpay}
                                className="text-gray-50 text-center mt-4 p-2 w-32 rounded-full bg-pink-500 hover:bg-pink-600 transition block mx-auto"
                            >
                                Subscribe
                            </button>
                        </div>
                    ) : (
                        /* Subscriber View */
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
                            <h2 className="text-2xl font-semibold text-green-600">You are a Premium Member 🎉</h2>
                            <p className="text-gray-700 mt-2 font-medium">Amount Paid: ₹{auth.user.amount/10}</p>
                            <p className="text-gray-600">
                                Subscribed on: {new Date(auth.user.updatedAt).toLocaleDateString('en-GB')}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Enjoy your premium benefits! Thank you for supporting us. 🙌
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    ) : (
        <p className="text-center text-gray-500">No user data available.</p>
    );
};

export default Dashboard;
