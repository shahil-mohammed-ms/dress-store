'use client';
import { useState } from 'react';

const SingleImageUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null); // State to store a single image

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setImage(file); // Update the state with the new file
      if (onUpload) {
        // Pass the selected image to the parent component
        onUpload(file);
      }
    }
  };

  const removeImage = () => {
    setImage(null); // Clear the selected image
    if (onUpload) {
      // Pass null to the parent to indicate no image
      onUpload(null);
    }
  };

  return (
    <div className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Attach Photo
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
        />
      </div>

      {/* Display selected image */}
      {image && (
        <div className="relative inline-block">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="h-24 w-24 object-cover rounded-md border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-0 right-0 flex items-center justify-center h-10 w-10 bg-red-800 text-white rounded-full text-lg font-bold hover:bg-red-700"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleImageUploader;
