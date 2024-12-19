'use client'
import { useState } from 'react';

const ImageUploader = ({ onUpload }) => {

  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => {
      const newImages = [...prevImages, ...files];
      if (onUpload) {
        // Pass image details to the parent component when images are selected
        onUpload(newImages);
      }
      return newImages;
    });
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      if (onUpload) {
        // Pass updated image details to the parent component after removing an image
        onUpload(newImages);
      }
      return newImages;
    });
  };

  return (
    <div className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Attach Photos
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
        />
      </div>

      {/* Display selected images */}
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative inline-block">
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected ${index}`}
              className="h-24 w-24 object-cover rounded-md border border-gray-300"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 flex items-center justify-center h-10 w-10 bg-red-800 text-white rounded-full text-lg font-bold hover:bg-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
