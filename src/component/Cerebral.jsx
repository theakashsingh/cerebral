import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Import all components
import {
  SALES_DATA,
  WEB_OFFLINE_SALES_DATA,
  PRODUCT_SALES_DATA,
  VALID_USERNAME,
  VALID_PASSWORD,
  API_ENDPOINTS,
  COMPONENTS,
} from "../utils/dataConstant";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

const Cerebral = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Error handling states
  const [loginError, setLoginError] = useState("");
  const [componentErrors, setComponentErrors] = useState({});

  // Component data states
  const [componentData, setComponentData] = useState({
    component1: null,
    component2: null,
    component3: null,
    component4: null,
    component5: null,
    component6: null,
  });

  // Login handler
  const handleLogin = e => {
    e.preventDefault();
    setLoginError("");

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  // Fetch API data with improved error handling
  const fetchComponentData = async () => {
    const newComponentData = { ...componentData };
    const newComponentErrors = {};

    // Fetch API-based components
    for (const [component, url] of Object.entries(API_ENDPOINTS)) {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${btoa(
              `${VALID_USERNAME}:${VALID_PASSWORD}`
            )}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        newComponentData[component] = await response.json();
      } catch (error) {
        console.error(`Error fetching ${component} data:`, error);
        newComponentErrors[component] = `Failed to load ${component} data`;
        newComponentData[component] = null;
      }
    }

    // Add CSV data for specific components
    newComponentData.component2 = SALES_DATA;
    newComponentData.component4 = WEB_OFFLINE_SALES_DATA;
    newComponentData.component6 = PRODUCT_SALES_DATA;

    setComponentData(newComponentData);
    setComponentErrors(newComponentErrors);
  };

  // Retry data fetching
  const retryDataFetch = () => {
    fetchComponentData();
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Component render helper
  const renderComponent = (componentKey, componentNumber) => {
    const data = componentData[componentKey];
    const error = componentErrors[componentKey];

    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 relative h-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Component {componentNumber}
        </h2>
        {error && (
          <div className="absolute top-4 right-4 text-red-500 flex items-center">
            <AlertCircle className="mr-2 w-5 h-5" />
            <button
              onClick={retryDataFetch}
              className="hover:underline flex items-center"
            >
              <RefreshCw className="mr-1 w-4 h-4" /> Retry
            </button>
          </div>
        )}
        {data ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(data[0] || {}).map(header => (
                    <th
                      key={header}
                      className="px-2 sm:px-4 py-2 text-left border text-xs sm:text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-2 sm:px-4 py-2 border text-xs sm:text-sm"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <RefreshCw className="mr-2 animate-spin" />
            Loading data...
          </div>
        )}
      </div>
    );
  };

  // Use Effects
  useEffect(() => {
    if (isLoggedIn) {
      fetchComponentData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && componentData.component2) {
      const ctx = document.getElementById("salesChart");
      if (ctx) {
        // Destroy existing chart if it exists
        Chart.getChart(ctx)?.destroy();

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: SALES_DATA.map(item => item.Month),
            datasets: [
              {
                label: "Last Year",
                data: SALES_DATA.map(item => item.Last_year),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
              {
                label: "This Year",
                data: SALES_DATA.map(item => item.This_year),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Monthly Sales Comparison",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [isLoggedIn, componentData.component2]);

  useEffect(() => {
    const handleResize = () => {
      const chart = Chart.getChart("salesChart");
      if (chart) {
        chart.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Conditional rendering
  if (!isLoggedIn) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <DashboardLayout
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      components={COMPONENTS}
      renderComponent={renderComponent}
      componentData={componentData}
    />
  );
};

export default Cerebral;
