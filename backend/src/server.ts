import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер ГСК запущен!');
});

import garagesRouter from './routes/garages';

// ...

app.use('/api/garages', garagesRouter);
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});