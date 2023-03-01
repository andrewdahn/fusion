import React, { useCallback, useState } from 'react';
import Form from './Form';
import axios from 'axios';
import { Summary } from '../types';

const App: React.FC = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  const fetchSummaries = useCallback(
    (type: string, addresses: string[], key: string): void => {
      axios
        .get('/summaries', { params: { type, addresses, key } })
        .then(({ data }) => setSummaries(data))
        .catch((error) => console.log(error));
    },
    []
  );

  return (
    <div>
      <Form fetchSummaries={fetchSummaries} />
      {summaries.map((summary: Summary) => {
        return <div>{summary.address}</div>;
      })}
    </div>
  );
};

export default App;
