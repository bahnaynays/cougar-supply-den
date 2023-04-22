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

interface MetricChartStock {
  products?: Product[];
}

const PerformanceMetricChart: React.FC<MetricChartStock> = ({
  products = [],
}) => {

  // Process the products data for the chart here
  // For examples, you can create an array containing the number of products per product type

  const productTypeCounts = products.reduce((acc, product) => {
    if (!acc[product.Inv_quantity]) {
      acc[product.Inv_quantity] = 1;
    } else {
      acc[product.Inv_quantity] += 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(productTypeCounts).map(([key, value]) => ({
    Inv_quantity: key,
    count: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Inv_quantity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#05b48c" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceMetricChart;