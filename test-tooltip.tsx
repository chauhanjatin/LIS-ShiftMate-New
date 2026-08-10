import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Test() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['A', 'B'] }]}
      series={[{ data: [1, 2] }]}
      slots={{
        tooltip: (props: any) => <div className='my-custom-tooltip'>Test</div>,
      }}
    />
  )
}
