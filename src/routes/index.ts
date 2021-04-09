import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({
  message: 'server on',
}));

export default routes;
