import React, { useCallback, useState } from 'react';
import Form from './Form';
import SummariesList from './SummariesList';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Summary } from '../types';
import SummariesChart from './SummariesChart';

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
    <div className='container mx-auto'>
      <Typography variant='h4'>BlockTrace Challenge</Typography>
      <Form fetchSummaries={fetchSummaries} />
      <SummariesList summaries={summaries} />
      <SummariesChart summaries={summaries} />
    </div>
  );
};

export default App;
