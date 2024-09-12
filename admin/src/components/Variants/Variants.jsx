'use client'
import { useState } from 'react';

const Variants = () => {
  const [variantFields, setVariantFields] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [variantValues, setVariantValues] = useState({});

  const handleAddField = () => {
    if (inputValue && !variantFields.includes(inputValue)) {
      setVariantFields((prevFields) => [...prevFields, inputValue]);
      setVariantValues((prevValues) => ({ ...prevValues, [inputValue]: [] }));
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddVariant = (fieldName, variant, quantity) => {
    if (variant && quantity > 0) {
      setVariantValues((prevValues) => ({
        ...prevValues,
        [fieldName]: [...prevValues[fieldName], { variant, quantity }],
      }));
    }
  };

  const handleRemoveVariant = (fieldName, index) => {
    setVariantValues((prevValues) => {
      const updatedVariants = prevValues[fieldName].filter((_, i) => i !== index);
      return { ...prevValues, [fieldName]: updatedVariants };
    });
  };

  const handleKeyPress = (event, fieldName) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const [variant, quantity] = event.target.value.split(':').map(s => s.trim());
      if (variant && quantity) {
        handleAddVariant(fieldName, variant, parseInt(quantity, 10));
        event.target.value = '';
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleAddField()}
            placeholder="Enter variant type (e.g., Color, Size)"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          {variantFields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="relative">
              <label className="block text-sm font-medium mb-2">{field}</label>
              <div className="flex flex-col gap-2">
                {variantValues[field].map((variant, variantIndex) => (
                  <div key={variantIndex} className="relative flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                    <span>{variant.variant}: {variant.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(field, variantIndex)}
                      className="text-red-600 text-lg font-bold hover:bg-red-200 rounded-full p-1"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder={`Add ${field} (e.g., Red: 10)`}
                  onKeyPress={(e) => handleKeyPress(e, field)}
                  className="border rounded p-2"
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Variants;
