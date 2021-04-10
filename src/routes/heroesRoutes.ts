import { Router } from 'express';
import HeroesController from '../controllers/heroesController';

const heroesRoutes = Router();
const heroesController = new HeroesController();

heroesRoutes.get('/search', async (req, res) => {
    return await heroesController.search(req, res);
});

heroesRoutes.get('/hero/:slug', async (req, res) => {
    return await heroesController.show(req, res);
});

export default heroesRoutes;
