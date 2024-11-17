'use client'
import React, { useEffect, useState } from 'react';
import MobileWishlist from './MobileWishlist';
import DesktopWishlist from './DesktopWishlist';


const initialProductItems = [
  {
    name: 'ITALIAN BED',
    image: 'https://i.imgur.com/ohfEDZm.jpg',
    size: 'XL',
    price: 120,
  },
  {
    name: 'ITALIAN BED',
    image: 'https://i.imgur.com/74oR13w.jpg',
    size: 'XL',
    price: 30,
  },
  {
    name: 'ITALIAN BED',
    image: 'https://i.imgur.com/82cs9j1.jpg',
    size: 'XL',
    price: 220,
  },
  {
    name: 'ITALIAN BED',
    image: 'https://i.imgur.com/dejlILO.jpg',
    size: 'XL',
    price: 90,
  },
  // Add more product items as needed
];

const WishlistPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [productItems, setProductItems] = useState(initialProductItems); // Assuming initialProductItems is your initial array

  // Initialize quantity state for each product
  const initialQuantities = productItems.map(() => 1);
  const [quantities, setQuantities] = useState(initialQuantities);

  // Function to update quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    setQuantities(
      quantities.map((qty, i) => (i === index ? newQuantity : qty))
    );
  };
  const calculateSubtotal = () => {
    return productItems.reduce((total, item, index) => {
      return total + item.price * quantities[index];
    }, 0);
  };
  const removeItem = (index) => {
    const newProductItems = [...productItems];
    const newQuantities = [...quantities];

    newProductItems.splice(index, 1);
    newQuantities.splice(index, 1);

    setProductItems(newProductItems);
    setQuantities(newQuantities);
  };
  useEffect(() => {
    setSubtotal(calculateSubtotal());
  }, [quantities]);

  return (
    <>
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        <MobileWishlist
          product={productItems}
          quantities={quantities}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        <DesktopWishlist
          product={productItems}
          quantities={quantities}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />


      </section>
    </>
  );
};

export default WishlistPage;
