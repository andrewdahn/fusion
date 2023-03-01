import React, { useEffect, useCallback, useState } from 'react';
import Chart from 'react-apexcharts';
import { Summary } from '../types';

interface Props {
  summaries: Summary[];
}

const SummariesChart: React.FC<Props> = ({ summaries }) => {
  const [series, setSeries] = useState([
    {
      data: [1, 2, 3, 4, 5],
    },
  ]);
  const [options, setOptions] = useState({
    xaxis: {
      categories: ['', '', '', '', ''],
    },
  });

  const getSeries = useCallback(() => {
    const sortedSummaries = summaries.sort(
      (a, b) => b.totalSentAmount - a.totalSentAmount
    );
    const data = sortedSummaries.map((s) => s.totalSentAmount).slice(0, 5);
    const categories = sortedSummaries.map((s) => s.address).slice(0, 5);

    setSeries([{ data }]);
    setOptions({ xaxis: { categories: categories } });
  }, [summaries]);

  useEffect(() => {
    getSeries();
  }, [summaries]);

  return (
    <div>
      <Chart options={options} series={series} type='bar' />
    </div>
  );
};

export default SummariesChart;
