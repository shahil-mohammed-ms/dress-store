'use client'
import { useState } from 'react';

const Dropdown = ({type,handleSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Options');

  const items = ['Item 1', 'Item 2', 'Item 3']; // List of dropdown items

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    handleSelectedCategory(type,item)
    console.log(`${type}: ${item}`);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedItem}
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
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  handleItemClick(item); // Handle item selection
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
