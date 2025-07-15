import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', purchases: 4000 },
  { name: 'Feb', purchases: 3000 },
  { name: 'Mar', purchases: 5000 },
  { name: 'Apr', purchases: 4500 },
  { name: 'May', purchases: 6000 },
  { name: 'Jun', purchases: 5500 },
];

const CustomerActivityChart = () => (
  <ResponsiveContainer width="100%" height={150}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" hide />
      <YAxis hide />
      <Tooltip />
      <Line type="monotone" dataKey="purchases" stroke="#8884d8" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default CustomerActivityChart;