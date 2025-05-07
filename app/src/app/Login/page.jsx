"use client";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useAccount,
  useWriteContract,
  useChainId,
  useReadContract,
  useWatchContractEvent,
} from "wagmi"
import { Eye, EyeOff, Mail, Lock, ChevronRight, Wallet } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const { isConnected } = useAccount()
  const [showPassword, setShowPassword] = useState(false);

  const { data, isLoading, isSuccess, isError, isPending, writeContract } = useWriteContract()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-2xl">
        {/* Left side - Login Form */}
        <div className="w-1/2 p-14 bg-white">
          <h2 className="mb-8 text-[2.5rem] font-bold text-center text-gray-800">
            Welcome, Herons!
          </h2>

          <div className="space-y-6">
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

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#63a02b] hover:bg-[#125E20] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center group"
            >
              Sign in
              <ChevronRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-500">Don't have an account yet?</span>
            <a
              href="/Signup"
              className="ml-1 font-medium text-[#63a02b] hover:text-[#125E20] transition duration-200"
            >
              Sign up
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 my-4 w-full">
            <hr className="flex-grow border-gray-300" />
            <h4 className="text-gray-500 whitespace-nowrap">or</h4>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex flex-col gap-2">
            {isConnected ? (
              <Link href="/Faculty-Homepage">
                <button className="w-full py-3 px-4 bg-[#63a02b] hover:bg-[#125E20] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center group">
                  Go to Dashboard
                  <ChevronRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
            ) : (
              <>
                <div className="flex items-center justify-center w-full mb-3">
                  <h3 className="text-gray-600">Connect your wallet to log in</h3>
                </div>
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button
                      onClick={openConnectModal}
                      className="w-full py-3 px-4 bg-[#464646] hover:bg-[#000000] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center group"
                    >
                      Connect Wallet
                      <Wallet
                        size={20}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  )}
                </ConnectButton.Custom>
              </>
            )}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#125E20]/65 bg-opacity-30 z-10"></div>
          <img
            className="object-cover z-0 h-full w-full brightness-90 contrast-95"
            src="/Images/UMak.jpg"
            alt="University"
          />
          <div className="absolute bottom-12 left-12 z-20 text-white">
            <h3 className="text-[2.5rem] font-bold">Welcome, Herons!</h3>
            <p className="text-md opacity-90">Sign in to access your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;