import React from "react";
import "@fontsource/inter";
import "@fontsource/prata";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-[#0E1C36] p-4 flex items-center shadow-md">
        <img src="/nu_logo.png" alt="NU Logo" className="h-12" />
      </div>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 text-center border border-gray-200">
          <h1 className="font-prata text-2xl mb-6 text-gray-800">
            Welcome to the internal information portal of NAZARBAYEV UNIVERSITY
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-inter focus:outline-none focus:ring-2 focus:ring-[#0E1C36] focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 font-inter focus:outline-none focus:ring-2 focus:ring-[#0E1C36] focus:border-transparent"
          />
          <button className="w-full bg-[#0E1C36] text-white p-3 rounded-lg font-inter hover:bg-[#1A2A50] transition duration-300 shadow-md hover:shadow-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
