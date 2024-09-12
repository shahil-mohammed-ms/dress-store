'use client'
import { useState } from 'react';

const Tags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ['Popular', 'Featured', 'New', 'Trending', 'Sale']; // List of available tags

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
    setIsOpen(false); // Close the dropdown after selecting a tag
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedTags.length > 0 ? selectedTags.join(', ') : 'Select Tags'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v10.586l2.707-2.707a1 1 0 111.414 1.414l-4.414 4.414a1 1 0 01-1.414 0l-4.414-4.414a1 1 0 011.414-1.414L9 14.586V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="tags-menu">
            {tags.map((tag, index) => (
              <a
                key={index}
                href="#"
                className={`block px-4 py-2 text-sm ${selectedTags.includes(tag) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  handleTagClick(tag); // Handle tag selection
                }}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Display selected tags as chips */}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-indigo-500 rounded-full"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-indigo-200 hover:text-white"
              onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
