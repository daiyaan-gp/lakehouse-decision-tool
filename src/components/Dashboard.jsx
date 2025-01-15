// src/components/Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import gsap from 'gsap';
import DropdownSelector from './DropdownSelector';
import TimeToMarketChart from './TimeToMarketChart';
import CostDonutChart from './CostDonutChart';
import lakehouseMatrix from '../data/lakehouseMatrix';

// The 7 Lakehouse components
const COMPONENTS = [
  "Data Storage",
  "Data Ingestion",
  "Data Processing",
  "ML Training",
  "Machine Learning Serving (Inference)",
  "Exploratory Data Analysis",
  "Dashboards / BI"
];

// Add scaling factors after COMPONENTS array
const SCALING_FACTORS = [
    { label: "Current (~10GB)", value: 1 },
    { label: "10–100 GB Data", value: 2.5 },
    { label: "100 GB–1 TB Data", value: 5 },
    { label: "1 TB–10 TB Data", value: 10 },
  ];

function Dashboard() {
  // Add refs for animation
  const headerRef = useRef(null);
  const buttonsRef = useRef(null);
  const dropdownsRef = useRef(null);
  const chartsRef = useRef(null);
  const tableRef = useRef(null);
  const creditsRef = useRef(null);

  // Add animation effect
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo(buttonsRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 },
      '-=0.2'
    )
    .fromTo(dropdownsRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 },
      '-=0.1'
    )
    .fromTo([chartsRef.current, tableRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 },
      '-=0.1'
    )
    .fromTo(creditsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.2'
    );
  }, []);

  // 1) Initialize state so each component defaults to "AWS Managed"
  const [selectedTech, setSelectedTech] = useState(
    COMPONENTS.reduce((acc, comp) => {
      acc[comp] = "AWS Managed";
      return acc;
    }, {})
  );

  // Add scaling factor state
  const [scalingFactor, setScalingFactor] = useState(SCALING_FACTORS[0].value);

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

  // 4) Calculate summary metrics
  const summaryMetrics = {
    totalPrice: selectedData.reduce((sum, row) => sum + (row?.price || 0), 0),
    totalTimeToMarket: selectedData.reduce((sum, row) => sum + (row?.timeToMarketDays || 0), 0)
  };

  // Add scaled price calculation
  const scaledPrice = summaryMetrics.totalPrice * scalingFactor;

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

  // Check for mixed cloud providers and get the odd one out
  const getOddProviderOut = () => {
    const cloudSelections = Object.entries(selectedTech).filter(([_, tech]) => 
      !["Self-Hosted", "Databricks Managed"].includes(tech)
    );
    
    if (cloudSelections.length < 2) return null;
    
    // Count occurrences of each provider
    const providerCounts = cloudSelections.reduce((acc, [_, tech]) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {});
    
    // Find the majority provider
    const majorityProvider = Object.entries(providerCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    // Find components using non-majority provider
    return Object.entries(selectedTech).find(([_, tech]) => 
      !["Self-Hosted", "Databricks Managed"].includes(tech) && 
      tech !== majorityProvider
    )?.[1];
  };

  const isOddSelection = (tech) => {
    const oddProvider = getOddProviderOut();
    return tech === oddProvider;
  };

  // 5) Render UI
  return (
    <div className="max-w-[1920px] mx-auto px-2">
      <div className="sticky top-0 bg-white z-10 pb-2">
        <div ref={headerRef}>
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Lakehouse Architecture Decision Dashboard
          </h1>
          
          {getOddProviderOut() && (
            <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
              <p className="text-sm font-medium">
                ⚠️ Multi-cloud setup will lead to increased complexity and higher operational costs
              </p>
            </div>
          )}
        </div>

        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-2 py-4 px-8 bg-gray-50 rounded-lg">
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

        <div ref={dropdownsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-white p-4 rounded-lg shadow-sm">
          {COMPONENTS.map((comp) => (
            <DropdownSelector
              key={comp}
              label={comp}
              value={selectedTech[comp]}
              onChange={(tech) => handleSelectionChange(comp, tech)}
              hasError={isOddSelection(selectedTech[comp])}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <div ref={chartsRef} className="grid grid-cols-2 gap-4">
            <div className="w-full bg-white p-4 rounded-lg shadow-sm">
              <TimeToMarketChart selectedData={selectedData} />
            </div>
            <div className="w-full bg-white p-4 rounded-lg shadow-sm">
              <CostDonutChart selectedData={selectedData} />
            </div>
          </div>

          <div ref={creditsRef} className="bg-red-50 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-bold mb-2 text-red-900">Startup Credits (if approved)</h3>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li><span className="font-bold">AWS</span> (Most Mature) - Up to $100,000 in credits for 1 year</li>
              <li><span className="font-bold">Google Cloud</span> (Emerging) - Up to $200,000 in credits for 2 years</li>
              <li><span className="font-bold">Azure</span> (Mature) - Up to $150,000 in credits for 1 year</li>
              <li><span className="font-bold">Databricks</span> - Up to $6,000 in credits for 6 months (Approved ✅)</li>
            </ul>
          </div>
        </div>

        <div ref={tableRef} className="w-full">
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

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Estimated Price / Month for Current Data Volume</h3>
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
            
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Estimated Price per Month at Scale</h3>
                <div className="relative">
                  <select 
                    value={scalingFactor}
                    onChange={(e) => setScalingFactor(Number(e.target.value))}
                    className="appearance-none bg-yellow-50 border border-yellow-200 text-sm rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  >
                    {SCALING_FACTORS.map(factor => (
                      <option key={factor.value} value={factor.value}>
                        {factor.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$
                <CountUp
                  end={scaledPrice}
                  separator=","
                  duration={0.5}
                  preserveValue={true}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
