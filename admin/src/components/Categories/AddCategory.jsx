'use client'
import { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SingleImageUploader from '@/components/ImageUploader/SingleImageUploader'
import {addCategory} from '../../utils/api/categoryApi'
import { useRouter } from 'next/navigation';


function AddCategory() {
  const router = useRouter();

  const [formData,setFormData] = useState({
    name:'',
    desc:'',
    image:null,
  })

  const handelChange =(e)=>{

    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
   }

     // Handle image uploads
  const handleImageUpload = (uploadedImages) => {
    setFormData({ ...formData, image: uploadedImages });
  };
  
  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Submitting Product Data:', formData);

    const formDatas = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'image' && formData.image) {
        // Add the single image to FormData
        formDatas.append('image', formData.image);
      } else {
        // Add other fields
        formDatas.append(key, formData[key]);
      }
    });
    try {
      const response = await addCategory(formDatas)
      console.log(response)
      if(response.status === 200){
        console.log(response)
        return router.push(`/categories`)
      }

    } catch (error) {
      console.log(error)
      alert(error.message)
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
            </div>
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
                    value={formData.name}
                    onChange={handelChange}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>


                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                  name='desc'
                                      value={formData.desc}
                                      onChange={handelChange}
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

  




                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Inventory
              </h3>
            </div>
<div>
<SingleImageUploader onUpload={handleImageUpload}/>
</div>
<div>
</div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
</div>

    </div>
  )
}

export default AddCategory