'use client'
import { useState,useEffect, } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Dropdown from '../../components/dropDown/DropDown'
import Tags from '../../components/Tags/Tags'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import DynamicInputs from '../../components/DynamicInputs/DynamicInputs'
import Variants from '../../components/Variants/Variants'
import {addProducts} from '../../utils/api/productApi'
import {getCategories} from '../../utils/api/categoryApi'
import { useRouter } from 'next/navigation';



function AddProducts() {
  const router = useRouter();

  const [categoriesData,setCategoriesData] = useState([])
  const [productDetails,setProductDetails]=useState({
  name: '',
  slugName: '',
  description: '',
  price: '',
  costPrice: '',
  discountPrice: '',
  tax: '',
  stockQuantity: '',
  stockStatus: '',
  reorderLevel: '',
  weight: '',
  shippingCharge: '',
  dimensions: '',
  category: '',
  subCategory: '',
  manufacturer:'',
  tags: [],
  images: [],
  dynamicInput:{},
  variantInput:[],
})

  useEffect(()=>{
    fetchCatData()
  },[])

const fetchCatData = async()=>{
  try {
    const response = await getCategories()
    setCategoriesData(response?.data?.data)
    console.log(response?.data?.data)
  } catch (error) {
    
  }
}

const handelChange =(e)=>{

 const {name,value} = e.target;
 setProductDetails({...productDetails,[name]:value})
}

  // Handle dropdown change
  const handleDropdownChange = (field, value) => {
    console.log('categ',{[field]: value._id})
    setProductDetails({ ...productDetails, [field]: value._id });
  };

  // Handle tag updates
  const handleTagsUpdate = (newTags) => {
    setProductDetails({ ...productDetails, tags: newTags });
  };

  // Handle image uploads
  const handleImageUpload = (uploadedImages) => {
    setProductDetails({ ...productDetails, images: uploadedImages });
  };

  //dynamic values
  const handleDynamicInput = (DynData)=>{
setProductDetails({...productDetails,dynamicInput:DynData})

  }

 const handleVariants = (varData) =>{
  setProductDetails({...productDetails,variantInput:varData})
 }

 

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Submitting Product Data:', productDetails);

    const formData = new FormData();
    Object.keys(productDetails).forEach((key) => {
      if (key === 'images') {
        // Add images array to FormData
        productDetails.images.forEach((image) => formData.append('images', image));
      } else if (key === 'tags' || key === 'variantInput') {
        // Add array fields
        formData.append(key, JSON.stringify(productDetails[key]));
      } else if (key === 'dynamicInput') {
        // Add object fields
        formData.append(key, JSON.stringify(productDetails[key]));
      } else {
        // Add other fields
        formData.append(key, productDetails[key]);
      }
    });


    try {
      const response = await addProducts(formData)
      console.log(response)
      if(response.status === 200){
        console.log(response)
        return router.push(`/products`)
      }

    } catch (error) {
      console.log(error)
    }

    // Call API or backend to save productData
  };


  return (
    <div className='flex flex-col ' >
    <Breadcrumb pageName="Add Products" />
    
<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 ">
<div className="flex flex-col gap-9 ">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               
              </h3>
m            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">

              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Basic information
              </h3>
            </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     name
                    </label>
                    <input
                    name='name'
                    value={productDetails.name}
                    onChange={handelChange}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      slug  name
                    </label>
                    <input
                    name='slugName'
                                        value={productDetails.slugName}
                                        onChange={handelChange}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                  name='description'
                                      value={productDetails.description}
                                      onChange={handelChange}
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Pricing
              </h3>
            </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     price
                    </label>
                    <input
                    name='price'
                                        value={productDetails.price}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      cost price
                    </label>
                    <input
                    name='costPrice'
                                        value={productDetails.costPrice}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Discount Price
                    </label>
                    <input
                    name='discountPrice'
                                        value={productDetails.discountPrice}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      tax
                    </label>
                    <input
                    name='tax'
                                        value={productDetails.tax}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Inventory
              </h3>
            </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Stock Quantity
                    </label>
                    <input
                    name='stockQuantity'
                                        value={productDetails.stockQuantity}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Stock status
                    </label>
                    <input
                    name='stockStatus'
                                        value={productDetails.stockStatus}
                                        onChange={handelChange}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Reorder level
                    </label>
                    <input
                    name='reorderLevel'
                                        value={productDetails.reorderLevel}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                </div>

            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark ">
              <h3 className="font-medium text-black dark:text-white ">
               Shipping
              </h3>
            </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     weight
                    </label>
                    <input
                    name='weight'
                                        value={productDetails.weight}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      shipping charge
                    </label>
                    <input
                    name='shippingCharge'
                                        value={productDetails.shippingCharge}
                                        onChange={handelChange}
                      type="number"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Dimension
                  </label>
                  <input
                     name='dimensions'
                     value={productDetails.dimensions}
                     onChange={handelChange}
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="p-6.5">
                {/* Form content goes here */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category
                  </label>
                  
                </div>
                <Dropdown type="category" handleSelectedCategory={handleDropdownChange} catData={categoriesData} />

              </div>
              {/* <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Sub Category
                  </label>
                  
                </div>
                <Dropdown type="subCategory" handleSelectedCategory={handleDropdownChange}  />

              </div> */}

              <div className="p-6.5">
                {/* Form content goes here */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Tags
                  </label>
                  
                </div>
                <Tags  tags={productDetails.tags} onUpdate={handleTagsUpdate} />

              </div>

              {/* <div className="flex flex-col gap-5.5 p-6.5">

<div>
  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
    Attach Photo
  </label>
  <input
    type="file"
    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
  />
</div>
</div> */}
<div>
<ImageUploader onUpload={handleImageUpload}/>
</div>

<div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Additional information
              </h3>
            </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Manufacturer
                    </label>
                    <input
                    name='manufacturer'
                                        value={productDetails.manufacturer}
                                        onChange={handelChange}
                                          type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Warranty
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div> */}
                </div>
                {/* <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Return Policy
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div> */}

                <div>
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Dynamic informations 
              </h3>
            </div>
                  <DynamicInputs dynamicInputDatas={handleDynamicInput} />
                </div>

<div>
<div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Variants
              </h3>
            </div>
  <Variants variationInputData={handleVariants} />
</div>


                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
</div>

    </div>
  )
}

export default AddProducts       