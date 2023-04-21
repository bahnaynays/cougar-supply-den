import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Product } from '../interfaces/ProductInterface';

interface PerformanceMetricChartProps {
  products: Product[];
}

const PerformanceMetricChart: React.FC<PerformanceMetricChartProps> = ({ products }) => {
  // Process the products data for the chart here
  // For example, you can create an array containing the number of products per product type

  const productTypeCounts = products.reduce((acc, product) => {
    if (!acc[product.prod_type]) {
      acc[product.prod_type] = 1;
    } else {
      acc[product.prod_type] += 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(productTypeCounts).map(([key, value]) => ({
    prod_type: key,
    count: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="prod_type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceMetricChart;