import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';
import { Textarea } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { Select, Option } from '@material-tailwind/react';
import { Asset } from '../types';

interface Props {
  fetchSummaries: (type: string, addresses: string[], key: string) => void;
  loading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const options: Asset[] = [
  {
    key: 'btc',
    type_long: 'Bitcoin',
  },
  {
    key: 'eth',
    type_long: 'Ethereum',
  },
  {
    key: 'ltc',
    type_long: 'Litecoin',
  },
];

const Form: React.FC<Props> = ({
  fetchSummaries,
  loading,
  error,
  setError,
}) => {
  const [key, setKey] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<string>('btc');

  const handleTextAreaInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setContent(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKey(e.target.value);
  };

  const handleAddrTypeChange = (e: any): void => {
    setType(e);
  };

  const handleSubmit = (): void => {
    const addr = content ? content.split('\n') : [];
    if (!type || !content || !key) {
      setError('Fill in all the text fields!');
      return;
    }
    fetchSummaries(type, addr, key);
  };

  return (
    <div className='flex flex-col items-center space-y-2'>
      <Input label='API Key' onChange={handleKeyChange} />
      <Textarea
        value={content}
        onChange={handleTextAreaInput}
        label='Enter Addresses'
      />
      <Select
        label='Select Address Type'
        value={type}
        onChange={handleAddrTypeChange}
      >
        {options.map((o, index) => {
          return (
            <Option key={index} value={o.key}>
              {o.type_long}
            </Option>
          );
        })}
      </Select>
      <Button onClick={handleSubmit}>{loading ? 'Loading' : 'Search'}</Button>
      <div className='text-red-500'>{error}</div>
    </div>
  );
};

export default Form;
