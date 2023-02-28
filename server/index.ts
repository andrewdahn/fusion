import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
