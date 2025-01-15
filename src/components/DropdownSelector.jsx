// src/components/DropdownSelector.jsx
import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

const options = ["AWS Managed", "Azure Managed", "GCP Managed", "Databricks Managed", "Self-Hosted"];

function DropdownSelector({ label, value, onChange, hasError }) {
  const getOptions = () => {
    if (label === "Data Storage") {
      return options.filter(opt => opt !== "Databricks Managed");
    }
    return options;
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </Listbox.Label>
        <Listbox.Button 
          className={`relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-lg cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
          }`}
        >
          <span className="block truncate">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className={`h-5 w-5 ${hasError ? 'text-red-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {getOptions().map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                cursor-default select-none relative py-2 pl-3 pr-9 list-none`
              }
            >
              {({ active, selected }) => (
                <Fragment>
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {option}
                  </span>
                  {selected && (
                    <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                      active ? 'text-white' : 'text-blue-600'
                    }`}>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </Fragment>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default DropdownSelector;
