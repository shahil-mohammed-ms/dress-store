import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa'; // FontAwesome arrow

const MobileWishlist = ({ product, quantities, updateQuantity, removeItem }) => {
  return (
    <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
      {/* Mobile cart table */}
      {product.map((x, index) => {
        return (
          <div key={index} className="flex w-full border px-4 py-4">
            <img
              className="self-start object-contain"
              width="90px"
              src={x.image}
              alt="bedroom image"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{x.name}</p>
              </div>
              {/* Additional code for size and price remains unchanged */}
              <p className="py-3 text-xl font-bold text-violet-900">
                ${x.price}
              </p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                <button className="w-full bg-green-900 px-5 py-2 text-white  rounded-md">
                  Add to cart
                </button>
                </div>
                <FaTrashAlt
                  onClick={() => removeItem(index)}
                  className="m-0 h-5 w-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        );
      })}

<div className="flex justify-center items-center space-x-2">
  <button className="w-full flex items-center justify-center bg-green-900 px-5 py-2 text-white rounded-md">
    <span>Continue Shopping</span>
    <FaArrowRight className="ml-2" />
  </button>
</div>

    </section>
  );
};

export default MobileWishlist;
