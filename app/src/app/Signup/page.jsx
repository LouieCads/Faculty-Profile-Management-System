// Sign Up
"use client";
import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ChevronRight } from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-2xl">
        {/* Left side - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#125E20]/65 bg-opacity-30 z-10"></div>
          <img
            className="object-cover z-50 h-full w-full brightness-90 contrast-95"
            src="/Images/UMak.jpg"
            alt="University"
          />
          <div className="absolute bottom-12 left-12 z-20 text-white">
            <h3 className="text-[2.5rem] font-bold">Welcome, Herons!</h3>
            <p className="text-md opacity-90">
              Create an account to continue
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 p-14 bg-white">
          <h2 className="mb-8 text-[2.5rem] font-bold text-center text-gray-800">
            Get Started Now
          </h2>

          <div className="space-y-6">
            {/* Username */}
            {/* <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63a02b] focus:border-transparent text-gray-800"
                  placeholder="Your username"
                />
              </div>
            </div> */}

            {/* Email */}
            <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63a02b] focus:border-transparent text-gray-800"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-base font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-[#63a02b] hover:text-[#125E20] font-medium transition duration-200"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63a02b] focus:border-transparent text-gray-800"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63a02b] focus:border-transparent text-gray-800"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#63a02b] hover:bg-[#125E20] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center group"
            >
              Create Account
              <ChevronRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-500">Already have an account?</span>
            <a
              href="/Login"
              className="ml-1 font-medium text-[#63a02b] hover:text-[#125E20] transition duration-200"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
