import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
