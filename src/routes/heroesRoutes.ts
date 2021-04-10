import { Router } from 'express';
import HeroesController from '../controllers/heroesController';

const heroesRoutes = Router();
const heroesController = new HeroesController();

heroesRoutes.get('/heroes/', async (req, res) => {
    return await heroesController.search(req, res);
});

export default heroesRoutes;
