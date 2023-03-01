import React, { Fragment } from 'react';
import { Summary } from '../types';
import { formatAddr } from '../utils';

interface Props {
  summaries: Summary[];
}

const HEADERS: string[] = [
  'Address',
  'Name',
  'Type',
  'Balance',
  'Sent',
  'Received',
  'Score',
];

const SummariesList: React.FC<Props> = ({ summaries }) => {
  return (
    <>
      {summaries.length > 0 ? (
        <table className='min-w-full my-2'>
          <thead>
            <tr className='bg-gray-100'>
              {HEADERS.map((header, index) => {
                return (
                  <th key={index} className='border px-4 py-6'>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary: any, index: number) => {
              return (
                <tr key={index} className='even:bg-gray-100 odd:bg-white'>
                  <td className='border px-4 py-2'>
                    {formatAddr(summary.address)}
                  </td>
                  <td className='border px-4 py-2'>{summary.name}</td>
                  <td className='border px-4 py-2'>{summary.type}</td>
                  <td className='border px-4 py-2'>{summary.balance}</td>
                  <td className='border px-4 py-2'>
                    {summary.totalSentAmount}
                  </td>
                  <td className='border px-4 py-2'>
                    {summary.totalReceivedAmount}
                  </td>
                  <td className='border px-4 py-2'>{summary.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default SummariesList;
