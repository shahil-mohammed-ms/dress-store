import React from "react";

const OrderPageCheckoutItem = () => {
  return (
    <div className="font-[sans-serif] bg-white">
<div className="flex items-center space-x-2">
  <button
    // onClick={() => window.history.back()} // Navigate back to the previous page
    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H15a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
    Back
  </button>
</div>


      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Sidebar */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {/* Product Card */}
                {[
                  {
                    image: "https://readymadeui.com/images/product10.webp",
                    title: "Split Sneakers",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                  {
                    image: "https://readymadeui.com/images/product11.webp",
                    title: "Velvet Boots",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                  {
                    image: "https://readymadeui.com/images/product14.webp",
                    title: "Echo Elegance",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                  {
                    image: "https://readymadeui.com/images/product13.webp",
                    title: "Pumps",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                  {
                    image: "https://readymadeui.com/images/product14.webp",
                    title: "Echo Elegance",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                  {
                    image: "https://readymadeui.com/images/product13.webp",
                    title: "Pumps",
                    size: 37,
                    quantity: 2,
                    price: "$40",
                  },
                ].map((product, index) => (
                  <div className="flex items-start gap-4" key={index}>
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">{product.title}</h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li className="flex flex-wrap gap-4">
                          Size <span className="ml-auto">{product.size}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Quantity{" "}
                          <span className="ml-auto">{product.quantity}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price <span className="ml-auto">{product.price}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Total <span className="ml-auto">$84.00</span>
              </h4>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-8">
              <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address Line"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              {/* Buttons */}
              <div className="flex gap-4 max-md:flex-col mt-8">
                <button
                  type="button"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPageCheckoutItem;