import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa'; // FontAwesome arrow

const DesktopWishlist = ({
  product,
  quantities,
  updateQuantity,
  removeItem,
}) => {
  return (
    <section className="hidden h-[600px] w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
      {/* Desktop cart table */}
      <table className="table-fixed">
        {/* <thead className="h-16 bg-neutral-100">
          <tr>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead> */}
        <tbody className="">
          {product.map((x, index) => {
            return (
              <tr className="h-[100px] border-b" key={index}>
                <td className="align-middle">
                  {/* Render product details from the prop */}
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src={x.image}
                      alt="bedroom image"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">{x.name}</p>
                      <p className="text-sm text-gray-400">Size: {x.size}</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">${x.price}</td>
                {/* Additional code for quantity and total remains unchanged */}
                <td className="align-middle">
                <button className="w-full bg-green-900 px-5 py-2 text-white  rounded-md">
                  Add to cart
                </button>
                </td>
                <td className="align-middle">
                  <FaTrashAlt
                    onClick={() => removeItem(index)}
                    className="m-0 h-5 w-5 cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-center items-center space-x-2">
  <button className="w-full flex items-center justify-center bg-green-900 px-5 py-2 text-white rounded-md">
    <span>Continue Shopping</span>
    <FaArrowRight className="ml-2" />
  </button>
</div>

    </section>
  );
};

export default DesktopWishlist;
