'use client'
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  [key: string]: string;
}
import axiosInstance from '../../axios';

export default function SignUp() {
  const router = useRouter();
const[formData,setFormData] = useState<FormData>({
  name:'',
  email:'',
  password:'',
  confirmPassword:'',
})
const [checkPassMach ,setCheckPassMatch] =useState<boolean>(true)
const [passwordError, setPasswordError] = useState<string | null>(null);

const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


async function submitForm(e:any) {
  e.preventDefault()

  if (!validatePassword(formData.password) && formData.confirmPassword !== formData.password ) {
return null
  }


  const response = await axiosInstance.post(`/auth/register`,formData)
  if (response.data.data.proceed){

    return router.push(`/otp?email=${encodeURIComponent(formData.email)}`)
  }
  else{
    // show unsuccessfull message here
  }
  
}

async function checkingPasswordMatch(confPass:any) {
  if (confPass === formData.password) {
    setCheckPassMatch(() => true); // Matches
  } else {
    setCheckPassMatch(() => false); // Does not match
  }
  
  
}
//valiate password
const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,}$/;
  return passwordRegex.test(password);
};

async function validateStrongPass(pass:string) {
  
    if (!validatePassword(pass)) {
      setPasswordError(
        "Password must be at least 7 characters long, contain an uppercase letter, a number, and a special character."
      );
    } else {
      setPasswordError(null); // Clear error if valid
    }
  
}



  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitForm} method="POST" className="space-y-6">
          <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Name 
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>

            <div className="flex items-center justify-between">
            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}

              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    handleChange(e);
                    validateStrongPass(e.target.value);
                  }}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>

            <div className="flex items-center justify-between">
            {!checkPassMach && <span className="text-red-500">Both passwords should match</span>}

              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Confirm  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    handleChange(e);
                    checkingPasswordMatch(e.target.value);
                  }}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
