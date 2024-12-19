'use client'
import { useState,useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
// import { Product } from "@/types/product";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; // Edit icon import
import {getProductsAdmin} from '../../utils/api/productApi'



const productData= [
  {
    image: "/images/product/product-01.png",
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: "/images/product/product-02.png",
    name: "Macbook Pro M1",
    category: "Electronics",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: "/images/product/product-03.png",
    name: "Dell Inspiron 15",
    category: "Electronics",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: "/images/product/product-04.png",
    name: "HP Probook 450",
    category: "Electronics",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

function Products() {
const [proData,setProData] = useState([])
  useEffect(()=>{
    fetchProData()
  },[])

const fetchProData = async()=>{
  try {
    const response = await getProductsAdmin()
    setProData(response?.data?.data)
    console.log(response?.data?.data)
  } catch (error) {
    
  }
}

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    {/* <div className="px-4 py-6 md:px-6 xl:px-7.5">
      <h4 className="text-xl font-semibold text-black dark:text-white">
         Products
      </h4>
    </div> */}

<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white  ml-2" >
    Products
      </h2>



      <div className="flex gap-2 mr-5 ml-5">
      <Link
        href="/products/addProducts"
        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-green-500 px-6 py-2 text-center font-medium text-white hover:bg-green-600"
      >
        <span>
          <AddCircleOutlineOutlinedIcon />
        </span>
        Add
      </Link>
      <Link
        href="/products/editProducts"
        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-6 py-2 text-center font-medium text-white hover:bg-blue-600"
      >
        <span>
          <EditOutlinedIcon />
        </span>
        Edit
      </Link>
    </div>

    </div>


    <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-3 flex items-center">
        <p className="font-medium">Product Name</p>
      </div>
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="font-medium">Category</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Price</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Sold</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Profit</p>
      </div>
    </div>

    {proData.map((product, key) => (
      <div
        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        key={key}
      >
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              {/* <Image
                src={product.image}
                width={60}
                height={50}
                alt="Product"
              /> */}
            </div>
            <p className="text-sm text-black dark:text-white">
              {product.name}
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm text-black dark:text-white">
            {product.category.name}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">
            ${product.price}
          </p>
        </div>
        {/* <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">{product.sold}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-meta-3">${product.profit}</p>
        </div> */}
      </div>
    ))}
  </div>
  )
}

export default Products