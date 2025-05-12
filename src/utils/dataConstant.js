import { BarChart2, Home, Package, Settings, TrendingUp, User } from "lucide-react";
import React from "react"; // Required if you use JSX in React

// Mock Data from CSV files
export const SALES_DATA = [
    { Month: 'Jan', Last_year: 5000, This_year: 6000 },
    { Month: 'Feb', Last_year: 10000, This_year: 2000 },
    { Month: 'Mar', Last_year: 20000, This_year: 40000 },
    { Month: 'Apr', Last_year: 32000, This_year: 21000 },
    { Month: 'May', Last_year: 12000, This_year: 9200 },
    { Month: 'Jun', Last_year: 13000, This_year: 8700 }
];

export const WEB_OFFLINE_SALES_DATA = [
    { date: '2022-12-13 22:05:00', web_sales: 15, offline_sales: 14 },
    { date: '2022-12-14 07:04:00', web_sales: 7526, offline_sales: 4620 }
];

export const PRODUCT_SALES_DATA = [
    { Product: 'Camera Mi 360', sold_amount: 432, unit_price: 120, revenue: 51320, rating: 4.81 },
    { Product: 'Message Gun', sold_amount: 120, unit_price: 60, revenue: 23901, rating: 3.44 },
    { Product: 'Redmi Note 9', sold_amount: 190, unit_price: 87.6, revenue: 87211, rating: 2.5 },
    { Product: 'One Plus Nord CE Lite 2', sold_amount: 140, unit_price: 24.1, revenue: 29809, rating: 4.65 }
];

// Authentication credentials
export const VALID_USERNAME = 'trial';
export const VALID_PASSWORD = 'trial123';

// API Endpoints
export const API_ENDPOINTS = {
    component1: 'http://3.111.196.92:8020/sample_assignment_api_1/',
    component3: 'http://3.111.196.92:8020/sample_assignment_api_3/',
    component4: 'http://3.111.196.92:8020/sample_assignment_api_4/',
    component5: 'http://3.111.196.92:8020/sample_assignment_api_5/'
};

// Function to return icons
const getIcon = (IconComponent) => {
  return React.createElement(IconComponent, { className: "w-6 h-6" });
};


// Navigation components configuration
export const COMPONENTS = [
    { id: 1, name: 'Dashboard', icon: () => getIcon(Home), color: 'bg-blue-500' },
    { id: 2, name: 'Sales', icon: () => getIcon(BarChart2), color: 'bg-green-500' },
    { id: 3, name: 'Profile', icon: () => getIcon(User), color: 'bg-purple-500' },
    { id: 4, name: 'Inventory', icon: () => getIcon(Package), color: 'bg-red-500' },
    { id: 5, name: 'Reports', icon: () => getIcon(TrendingUp), color: 'bg-yellow-500' },
    { id: 6, name: 'Settings', icon: () => getIcon(Settings), color: 'bg-indigo-500' }
];
