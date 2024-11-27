'use client'
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';import axios from 'axios';
import axiosInstance from '../../axios';

const OTPPage = () => {
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Retrieve 'email' from the query string
  
console.log(email)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<{ message: string,data:any }>('/auth/verify-otp', { otp,email });
      setMessage(response.data.message);
if(response?.data?.data.proceed){
  localStorage.setItem(
    "Tokens",
    JSON.stringify({
      access: response?.data?.data?.token?.accessToken,
      refresh: response?.data?.data?.token?.refreshToken,
    })
  );

 return router.push(`/`)

}

    } catch (error: any) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Verify OTP</h2>
        <p className="mt-2 text-center text-gray-600">
          Please enter the OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white rounded-lg ${
              isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
