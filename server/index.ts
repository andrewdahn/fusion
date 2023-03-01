import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';
import { pick } from 'lodash';
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

app.get('/summaries', (req: Request, res: Response) => {
  const { type, addresses, key } = req.query;
  axios
    .request({
      method: 'POST',
      url: `${process.env.URL}/bulk/${process.env.PROVIDER}/cluster/summary/all?type=${type}`,
      data: { addresses },
      headers: { api_key: key as string },
    })
    .then(({ data }) => {
      const keep = [
        'address',
        'name',
        'type',
        'balance',
        'totalSentAmount',
        'totalReceivedAmount',
        'score',
      ];

      let result: any = [];
      data.forEach((d: any) => {
        if (d.summary.status === 'Error') return;
        result.push(pick(d.summary, keep));
      });

      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(404).send(e.message);
    });
});
