import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import Form from './components/Form';
import SummariesList from './components/SummariesList';
import SummariesChart from './components/SummariesChart';
import { Summary } from './types';

const App: React.FC = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchSummaries = useCallback(
    (type: string, addresses: string[], key: string): void => {
      setLoading(true);
      setError('');
      axios
        .get('/summaries', { params: { type, addresses, key } })
        .then(({ data }) => {
          setSummaries(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    },
    []
  );

  return (
    <div className='container mx-auto'>
      <Typography variant='h4'>BlockTrace Challenge</Typography>
      <Form
        fetchSummaries={fetchSummaries}
        loading={loading}
        error={error}
        setError={setError}
      />
      <SummariesList summaries={summaries} />
      <SummariesChart summaries={summaries} />
    </div>
  );
};

export default App;
