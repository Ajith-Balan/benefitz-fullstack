import { useAuth } from "../../context/Auth";
import React, { useState } from "react";
import { FaCopy, FaCheck, FaGift } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Referral = () => {
    const [copied, setCopied] = useState(false);
    const [auth] = useAuth();
    
    const referralLink = `http://localhost:5173/register/${auth?.user?.usercode || ""}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return auth?.user ? (
        <Layout title={"Referral Program"}>
           <div className="flex flex-col lg:flex-row  bg-gray-100">
            {/* Mobile Sidebar Toggle */}
            <div>
            <UserMenu/>

            </div>
                
                {/* Main Content */}
                <main className="flex-1 bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                        <FaGift className="text-pink-500" /> Welcome, <span className="text-pink-500">{auth?.user?.name}</span>
                    </h1>
                    
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">Refer a Friend & Earn 7% off on your Filing Amount!</h2>
                    <p className="text-gray-600 mt-2">Invite your friends and earn rewards when they make their first premium purchase.</p>
                    
                    {/* Steps */}
                    <div className="mt-6 ">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-blue-600">Step 1</h3>
                            <p className="text-gray-600">Share your referral link with friends.</p>
                        </div>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-green-600">Step 2</h3>
                            <p className="text-gray-600">They sign up and make a premium purchase.</p>
                        </div>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-yellow-600">Step 3</h3>
                            <p className="text-gray-600">You receive 7% off on your Filing Amount!</p>
                        </div>
                    </div>
                    
                    {/* Referral Link */}
                    <div className="mt-8 p-6 border rounded-lg shadow-md w-full max-w-xl mx-auto bg-gray-50">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Your Referral Link</p>
                        <div className="flex items-center border p-3 rounded-md bg-white">
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="w-full bg-transparent outline-none text-gray-700"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                {copied ? <FaCheck /> : <FaCopy />}
                            </button>
                        </div>
                        {copied && <p className="text-green-600 mt-2">Copied to clipboard!</p>}
                    </div>
                    
                    {/* Rewards Section */}
                    <div className="mt-8 p-6 border rounded-lg shadow-md w-full max-w-xl mx-auto bg-purple-50 text-center">
                        <h3 className="text-xl font-semibold text-purple-700">Track Your Rewards</h3>
                        <p className="text-gray-600 mt-2">Check your dashboard to see how much cashback you've earned!</p>
                    </div>
                </main>
            </div>
        </Layout>
    ) : (
        <p className="text-center text-gray-500">No user data available.</p>
    );
};

export default Referral;
