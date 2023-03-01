import React, { useEffect, useCallback, useState } from 'react';
import Chart from 'react-apexcharts';
import { Summary } from '../types';
import { isEmpty } from 'lodash';

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

  const getParams = useCallback(() => {
    if (isEmpty(summaries[0])) {
      setSeries([{ data: [1, 2, 3, 4, 5] }]);
      setOptions({
        xaxis: { categories: ['a', 'b', 'c', 'd', 'e'] },
      });
    } else {
      const sortedSummaries = summaries.sort(
        (a, b) => b.totalSentAmount - a.totalSentAmount
      );
      const data = sortedSummaries.map((s) => s.totalSentAmount).slice(0, 5);
      const categories = sortedSummaries.map((s) => s.address).slice(0, 5);

      setSeries([{ data }]);
      setOptions({ xaxis: { categories } });
    }
  }, [summaries]);

  useEffect(() => {
    getParams();
  }, [summaries]);

  return (
    <div>
      {!isEmpty(summaries) ? (
        <Chart options={options} series={series} type='bar' />
      ) : null}
    </div>
  );
};

export default SummariesChart;
