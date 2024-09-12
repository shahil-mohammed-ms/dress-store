'use client'
import { useState } from 'react';

const DynamicInputs = () => {
  const [fields, setFields] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chipValues, setChipValues] = useState({});

  const handleAddField = (e) => {
    e.preventDefault()
    if (inputValue && !fields.includes(inputValue)) {
      setFields((prevFields) => [...prevFields, inputValue]);
      setChipValues((prevChipValues) => ({ ...prevChipValues, [inputValue]: [] }));
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFieldInputChange = (fieldName, index, value) => {

    setChipValues((prevChipValues) => {
      const updatedValues = [...prevChipValues[fieldName]];
      updatedValues[index] = value;
      return { ...prevChipValues, [fieldName]: updatedValues };
    });
  };

  const handleKeyPress = (event, fieldName, index) => {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFieldInputChange(fieldName, index, event.target.value);
      event.target.value = '';
    }
  };

  const handleRemoveChip = (fieldName, index) => {
    setChipValues((prevChipValues) => {
      const updatedValues = prevChipValues[fieldName].filter((_, i) => i !== index);
      return { ...prevChipValues, [fieldName]: updatedValues };
    });
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleAddField(e)}
          placeholder="Enter field name"
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="relative">
            <label className="block text-sm font-medium mb-2">{field}</label>
            <div className="flex flex-wrap gap-2">
              {chipValues[field].map((chip, chipIndex) => (
                <div key={chipIndex} className="relative flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                  <span>{chip}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChip(field, chipIndex)}
                    className="text-red-600 text-lg font-bold hover:bg-red-200 rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder={`Add ${field}`}
                onKeyPress={(e) => handleKeyPress(e, field, chipValues[field].length)}
                className="border rounded p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicInputs;
