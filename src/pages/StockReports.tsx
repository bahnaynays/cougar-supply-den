import React from "react";
import { Pie } from "react-chartjs-2";

const StockReports: React.FC = () => {
  // Sample data (replace with your real data)
  const remainingStocks = [
    { itemName: "Item A", stock: 10 },
    { itemName: "Item B", stock: 20 },
    { itemName: "Item C", stock: 30 },
    { itemName: "Item D", stock: 40 },
  ];

  const data = {
    labels: remainingStocks.map((item) => item.itemName),
    datasets: [
      {
        data: remainingStocks.map((item) => item.stock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h2>Remaining Item Stocks</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default StockReports;