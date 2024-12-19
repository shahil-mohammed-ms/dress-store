'use client'
import React,{useState,useEffect} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getCategories} from '../../utils/api/categoryApi'
// import { Product } from "@/types/product";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; // Edit icon import



const categoryData= [
  {
    image: "/images/product/product-01.png",
    desc: "Apple Watch Series 7",
    name: "Electronics",

  },

];


function Categories() {

  const [categoriesData,setCategoriesData] = useState([])

  useEffect(()=>{
  fetchData()
  },[])

const fetchData = async()=>{
  try {
    const response = await getCategories()
    setCategoriesData(response?.data?.data)
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
    Categories
      </h2>



      <div className="flex gap-2 mr-5 ml-5">
      <Link
        href="/categories/addCategory"
        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-green-500 px-6 py-2 text-center font-medium text-white hover:bg-green-600"
      >
        <span>
          <AddCircleOutlineOutlinedIcon />
        </span>
        Add
      </Link>
      <Link
        href="/categories/editCategory"
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
        <p className="font-medium"> Picture</p>
      </div>
      {/* <div className="col-span-3 flex items-center">
        <p className="font-medium"> Name</p>
      </div> */}
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="font-medium">description</p>
      </div>
    
    </div>

    {categoriesData?.map((product, key) => (
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
            {product.desc}
          </p>
        </div>
      

      </div>
    ))}
  </div>
  )
}

export default Categories