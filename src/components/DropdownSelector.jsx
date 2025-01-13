// src/components/DropdownSelector.jsx
import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';

function DropdownSelector({ label, value, onChange }) {
  const options = label === "Data Storage" 
    ? ["AWS Managed", "Azure Managed", "GCP Managed", "Self-Hosted"]
    : ["AWS Managed", "Azure Managed", "GCP Managed", "Databricks Managed", "Self-Hosted"];

  return (
    <div className="w-72">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </Listbox.Label>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default 
            focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="block truncate">{value}</span>
          </Listbox.Button>
          <Listbox.Options 
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm list-none"
          >
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li 
                    className={`${
                      active ? 'text-white bg-indigo-600' : 'text-gray-900'
                    } cursor-default select-none relative py-2 pl-3 pr-9`}
                  >
                    <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                      {option}
                    </span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default DropdownSelector;
