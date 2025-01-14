// src/components/Dashboard.jsx
import React, { useState } from 'react';
import CountUp from 'react-countup';
import DropdownSelector from './DropdownSelector';
import TimeToMarketChart from './TimeToMarketChart';
import CostDonutChart from './CostDonutChart';
import lakehouseMatrix from '../data/lakehouseMatrix';

// The 7 Lakehouse components
const COMPONENTS = [
  "Data Storage",
  "Data Ingestion",
  "Data Processing (ETL/ELT)",
  "Machine Learning Training",
  "Machine Learning Serving (Inference)",
  "Exploratory Data Analysis",
  "Dashboards / BI"
];

function Dashboard() {
  // 1) Initialize state so each component defaults to "AWS Managed"
  const [selectedTech, setSelectedTech] = useState(
    COMPONENTS.reduce((acc, comp) => {
      acc[comp] = "AWS Managed";
      return acc;
    }, {})
  );

  // 2) Handler to change a single component's technology selection
  const handleSelectionChange = (component, tech) => {
    setSelectedTech({
      ...selectedTech,
      [component]: tech
    });
  };

  // 3) For each selected component-technology, find the matching row in our matrix
  const selectedData = COMPONENTS.map((comp) => {
    return lakehouseMatrix.find(
      (item) => item.component === comp && item.technology === selectedTech[comp]
    );
  });

  // 4) Aggregate numeric values for the chart and summaries
  const aggregatedMetrics = {
    cost: selectedData.reduce((sum, row) => sum + (row?.costValue || 0), 0),
    timeToMarket: selectedData.reduce((sum, row) => sum + (row?.timeToMarketValue || 0), 0),
    complexity: selectedData.reduce((sum, row) => sum + (row?.complexityValue || 0), 0)
  };

  const summaryMetrics = {
    totalPrice: selectedData.reduce((sum, row) => sum + (row?.price || 0), 0),
    totalTimeToMarket: selectedData.reduce((sum, row) => sum + (row?.timeToMarketDays || 0), 0)
  };

  // Add bulk update handler
  const handleBulkUpdate = (technology) => {
    const newSelections = COMPONENTS.reduce((acc, comp) => {
      if (comp === "Data Storage" && technology === "Databricks Managed") {
        acc[comp] = "AWS Managed"; // Always set to AWS Managed when Databricks is selected
      } else {
        acc[comp] = technology;
      }
      return acc;
    }, {});
    setSelectedTech(newSelections);
  };

  // Check for mixed cloud providers
  const hasMixedProviders = () => {
    const providers = new Set(
      Object.values(selectedTech).filter(tech => 
        !["Self-Hosted", "Databricks Managed"].includes(tech)
      )
    );
    return providers.size > 1;
  };

  // 5) Render UI
  return (
    <div className="max-w-[1920px] mx-auto px-2">
      <div className="sticky top-0 bg-white z-10 pb-2">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Lakehouse Architecture Decision Dashboard</h1>
        
        {/* Alert for mixed providers */}
        {hasMixedProviders() && (
          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
            <p className="text-sm font-medium">
              ⚠️ Multi-cloud setup will lead to increased complexity and higher operational costs
            </p>
          </div>
        )}

        {/* Quick selection buttons */}
        <div className="flex flex-wrap justify-center gap-2 py-4 px-8 bg-gray-50 rounded-lg">
          <button onClick={() => handleBulkUpdate("AWS Managed")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm">
            Set All to AWS Managed
          </button>
          <button onClick={() => handleBulkUpdate("Azure Managed")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm">
            Set All to Azure Managed
          </button>
          <button onClick={() => handleBulkUpdate("GCP Managed")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm">
            Set All to GCP Managed
          </button>
          <button onClick={() => handleBulkUpdate("Databricks Managed")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm">
            Set All to Databricks Managed
          </button>
          <button onClick={() => handleBulkUpdate("Self-Hosted")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm">
            Set All to Self-Hosted
          </button>
        </div>

        {/* 5.1. Dropdown selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-white p-4 rounded-lg shadow-sm">
          {COMPONENTS.map((comp) => (
            <DropdownSelector
              key={comp}
              label={comp}
              value={selectedTech[comp]}
              onChange={(tech) => handleSelectionChange(comp, tech)}
            />
          ))}
        </div>
      </div>

      {/* Chart and Table side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* 5.2. Charts */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full bg-white p-4 rounded-lg shadow-sm">
              <TimeToMarketChart selectedData={selectedData} />
            </div>
            <div className="w-full bg-white p-4 rounded-lg shadow-sm">
              <CostDonutChart selectedData={selectedData} />
            </div>
          </div>

          {/* Startup Credits Section */}
          <div className="bg-red-50 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-bold mb-2 text-red-900">Startup Credits (if approved)</h3>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li><span className="font-bold">AWS</span> - Up to $100,000 in credits for 2 years</li>
              <li><span className="font-bold">Google Cloud</span> - Up to $100,000 in credits for 1 year</li>
              <li><span className="font-bold">Azure</span> - Up to $150,000 in credits for 1 year</li>
              <li><span className="font-bold">Databricks</span> - Up to $6,000 in credits</li>
            </ul>
          </div>
        </div>

        {/* 5.3. Table */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Selected Metrics per Component</h2>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Component", "Technology", "Cost", "Time to Market", "Complexity"].map(header => (
                  <th 
                    key={header} 
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedData.map(row => {
                if (!row) return null;
                const getColor = (value) => {
                  if (value === "Low") return "text-green-500";
                  if (value === "Moderate") return "text-yellow-500";
                  if (value === "High") return "text-red-500";
                  return "text-gray-900";
                };
                return (
                  <tr key={row.component} className="hover:bg-gray-100 transition-colors">
                    <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{row.component}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">{row.technology}</td>
                    <td className={`px-2 py-2 whitespace-nowrap text-sm ${getColor(row.cost)}`}>{row.cost}</td>
                    <td className={`px-2 py-2 whitespace-nowrap text-sm ${getColor(row.timeToMarket)}`}>{row.timeToMarket}</td>
                    <td className={`px-2 py-2 whitespace-nowrap text-sm ${getColor(row.complexity)}`}>{row.complexity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Summary Section */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Estimated Price / Month</h3>
              <p className="text-2xl font-bold text-gray-900">$
                <CountUp
                  end={summaryMetrics.totalPrice}
                  separator=","
                  duration={0.5}
                  preserveValue={true}
                />
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Time to Market</h3>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp
                  end={summaryMetrics.totalTimeToMarket}
                  duration={0.5}
                  preserveValue={true}
                /> days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
