import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Week 1',
    Customers: 4000,
    amt: 2400,
  },
  {
    name: 'Week 2',
    Customers: 3000,
    amt: 2210,
  },
  {
    name: 'Week 3',
    Customers: 2000,
    amt: 2290,
  },
  {
    name: 'Week 4',
    Customers: 2780,
    amt: 2000,
  },
  {
    name: 'Week 5',
    Customers: 1890,
    amt: 2181,
  },
  {
    name: 'Week 6',
    Customers: 2390,
    amt: 2500,
  },
  {
    name: 'Week 7',
    Customers: 3490,
    amt: 2100,
  },
];
/**
 * react component for barchart 
 * @function
 * @author @AakashHaran
 */
export default class BarChartGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Customers" fill="#cf0d2e" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
