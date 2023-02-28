import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

app.get('/summaries', (req: Request, res: Response) => {
  const { type, addresses } = req.query;
  axios
    .request({
      method: 'POST',
      url: `${process.env.URL}/bulk/${process.env.PROVIDER}/cluster/summary?type=${type}`,
      data: { addresses },
      headers: {
        api_key: process.env.KEY,
      },
    })
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});
