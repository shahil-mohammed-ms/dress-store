'use client'
import React, { useState,useEffect ,ChangeEvent} from 'react';
import {getAddress,addAddress,deleteAddress,defaultAddress} from '../../utils/api/addressApi'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type Address = {
  id: number;
  name: string;
  addressLine: string;
  city: string;
  state:string;
  pin:number;
  isDefault: boolean;
};

type RealAddress = {
  _id: string;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pin: string;
  primary: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    addressLine: '123 Main Street',
    city: 'San Francisco, CA',
    pin:123,
    state:'kerala',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Michael Foster',
    addressLine: '456 Elm Street',
    city: 'New York, NY',
    state:'kerala',
    pin:123,
    isDefault: false,
  },
];

export default function AddressList() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [realAddress,setRealAddress] = useState<RealAddress[]>([])
  const [open, setOpen] = useState(false)


  //get address
  useEffect(() => {

    fetchData()
  
  }, [])
  const fetchData = async () => {
    try {
     const fetchAddress:any = await getAddress();
     console.log(fetchAddress?.data?.data)
     setRealAddress(fetchAddress?.data?.data || [])
     // setAddresses(fetchAddress?.data?.data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const addAddress = () => {
    setOpen(true)
   
  };


  const setDefault =async (id: any) => {
console.log('idd',id)
    try {
      const response = await defaultAddress(id)
      console.log(response)
      if(response.status === 200){
        setRealAddress(
          realAddress.map((address) =>
            address._id === id
              ? { ...address, primary: true }
              : { ...address, primary: false }
          )
        )
      }

    } catch (error) {
      console.log(error)
    }

    setAddresses(
      addresses.map((address) =>
        address.id === id
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  const deleteAddressFn =async (id: any) => {
try {
  const response = await deleteAddress(id)
  console.log(response)
  if(response.status === 200){
    const filteredAddress = realAddress.filter((del)=>del._id!==id.toString())
    setRealAddress(filteredAddress)
  }
} catch (error) {
  console.log(error)
}

  };

  const editAddressfn = (id: number) => {
    alert(`Edit address with ID: ${id}`);
    // Logic for editing the address can go here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
      {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">Address List</h2> */}
      <ul className="divide-y divide-gray-200">
        {realAddress.map((address) => (
          <li key={address._id} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">{address.name}</p>
              <p className="text-sm text-gray-500">{address.addressLine}</p>
              <p className="text-sm text-gray-500">{address.city}</p>
              {address.primary && (
                <span className="mt-1 inline-block text-xs text-green-500 font-medium">
                  Default Address
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {!address.primary && (
                <button
                   onClick={() => setDefault(address._id)}
                  className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Set Default
                </button>
              )}
              <button
                // onClick={() => editAddress(address._id)}
                className="px-2 py-1 text-xs text-white bg-yellow-500 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                 onClick={() => deleteAddressFn(address._id)}
                className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={addAddress}
        className="mt-4 w-full px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
      >
        Add Address
      </button>
      <AddressAddForm open={open} setOpen={setOpen}  fetchData={fetchData}  />
    </div>
  );
}









interface AddressAddFormProps {
  open: boolean; // Whether the dialog is open
  setOpen: (state: boolean) => void; // Function to toggle dialog open state
  fetchData:any,
}
interface FormData {
  [key: string]: string;
}

const AddressAddForm: React.FC<AddressAddFormProps> = ({
  open,
  setOpen,
  fetchData,
}) => {

  const[formData,setFormData] = useState<FormData>({
    name:'',
    addressLine:'',
    city:'',
    state:'',
    pin:'',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  async function submitForm(e:any) {
    e.preventDefault()

try {
  const response:any =await addAddress(formData)
 
  if (response.status === 201){

    setOpen(false)
    fetchData()
    setFormData({    
      name:'',
      addressLine:'',
      city:'',
      state:'',
      pin:'',})
  }else{
alert('retry something went wrong')

  }

} catch (error) {
  console.log(error)
}

console.log(formData)
  }


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="text-center">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Add New Address
                </DialogTitle>
                <div className="mt-4">
                  <form
                    onSubmit={(e) => {
                      submitForm(e)
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                      onChange={handleChange}
                      value={formData.name} 
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                      onChange={handleChange}
                      value={formData.city} 
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                      onChange={handleChange}
                      value={formData.state} 
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="addressLine"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address Line
                      </label>
                      <textarea
                        id="addressLine"
                        name="addressLine"
                        value={formData.addressLine} 
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pin"
                        className="block text-sm font-medium text-gray-700"
                      >
                        pin
                      </label>
                      <input
                        type="text"
                        id="pin"
                        name="pin"
                        value={formData.pin} 
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};


