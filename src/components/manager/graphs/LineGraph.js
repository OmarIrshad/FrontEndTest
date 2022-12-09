import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Week 1',
    Sales: 2400,
    Orders: 2400,
  },
  {
    name: 'Week 2',
    Sales: 1398,
    Orders: 2210,
  },
  {
    name: 'Week 3',
    Sales: 9800,
    Orders: 2290,
  },
  {
    name: 'Week 4',
    Sales: 3908,
    Orders: 2000,
  },
  {
    name: 'Week 5',
    Sales: 4800,
    Orders: 2181,
  },
  {
    name: 'Week 6',
    Sales: 3800,
    Orders: 2500,
  },
  {
    name: 'Week 7',
    Sales: 4300,
    Orders: 2100,
  },
];

/**
 * react component for line graph
 * @function
 * @author @AakashHaran
 */
export default class LineGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line type="monotone" dataKey="Sales" stroke="#cf0d2e" activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="Orders" stroke="black" activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
