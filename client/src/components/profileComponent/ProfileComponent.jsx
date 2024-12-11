'use client'
import React from "react";
import { useSelector } from 'react-redux';
import AddressList from "../addressList/addressList";

const ProfileCard = () => {
  const userDetails = useSelector((state) => state.userDetails);
  console.log('ussrr',userDetails)
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
      {/* Profile Section */}
      <div className="md:grid grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">
        {/* Profile Image Section */}
        <div className="col-span-1 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
            className="w-36 h-36 rounded-full border-2 border-gray-200 shadow-md"
            alt="Profile"
          />
        </div>

        {/* Profile Information Section */}
        <div className="col-span-3 space-y-4">
          {/* Name */}
          <div className="flex items-center">
            <span className="text-sm bg-blue-50 font-bold uppercase border border-gray-200 rounded-l px-4 py-2 w-1/4">
              Name:
            </span>
            <input
              className="px-4 py-2 border-l-0 border-gray-300 rounded-r shadow-sm w-3/4"
              type="text"
              value={userDetails.name}
              readOnly
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <span className="text-sm bg-blue-50 font-bold uppercase border border-gray-200 rounded-l px-4 py-2 w-1/4">
              Email:
            </span>
            <input
              className="px-4 py-2 border-l-0 border-gray-300 rounded-r shadow-sm w-3/4"
              type="text"
              value={userDetails.email}
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <span className="text-sm bg-blue-50 font-bold uppercase border border-gray-200 rounded-l px-4 py-2 w-1/4">
              Phone:
            </span>
            <input
              className="px-4 py-2 border-l-0 border-gray-300 rounded-r shadow-sm w-3/4"
              type="text"
              value={userDetails.phone||'not given'}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Address List Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
        <AddressList />
      </div>
    </div>
  );
};

export default ProfileCard;
