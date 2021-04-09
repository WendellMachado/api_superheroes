import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
