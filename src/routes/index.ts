import { Router } from 'express';
import heroesRoutes from './heroesRoutes';

const routes = Router();
routes.use(heroesRoutes);

routes.get('/', (req, res) => res.json({
  message: 'server on',
}));

export default routes;
