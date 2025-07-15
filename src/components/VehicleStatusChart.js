import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sedan', total: 20, available: 15, maintenance: 3, booked: 2 },
  { name: 'SUV', total: 15, available: 10, maintenance: 2, booked: 3 },
  { name: 'Van', total: 10, available: 7, maintenance: 1, booked: 2 },
  { name: 'Truck', total: 5, available: 3, maintenance: 1, booked: 1 },
];

const VehicleStatusChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="available" stackId="a" fill="#4caf50" />
      <Bar dataKey="maintenance" stackId="a" fill="#ff9800" />
      <Bar dataKey="booked" stackId="a" fill="#2196f3" />
    </BarChart>
  </ResponsiveContainer>
);

export default VehicleStatusChart;