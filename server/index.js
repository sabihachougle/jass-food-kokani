import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send({ status: 'running', service: 'Jass Food and Kokani Delicacies API' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
