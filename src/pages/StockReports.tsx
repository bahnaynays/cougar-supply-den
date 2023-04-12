import React from 'react';
import { Pie } from 'react-chartjs-2';

type StockItem = {
  name: string;
  stockAmount: number;
};

const stockItems: StockItem[] = [
  { name: 'Item A', stockAmount: 50 },
  { name: 'Item B', stockAmount: 25 },
  { name: 'Item C', stockAmount: 30 },
  { name: 'Item D', stockAmount: 10 },
];

const StockReports: React.FC = () => {
  const pieData = {
    labels: stockItems.map((item) => item.name),
    datasets: [
      {
        data: stockItems.map((item) => item.stockAmount),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  return (
    <div>
      <h1>Stock Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock Amount</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.stockAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pie data={pieData} />
    </div>
  );
};

export default StockReports;