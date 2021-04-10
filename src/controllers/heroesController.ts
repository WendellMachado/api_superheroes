import { Request, Response } from "express";
import responseCodes from './responseCode';
import endpoints from '../externalApi/endpoints';
import axiosInstance from '../externalApi/axiosConfig';
import HeroesRepository from '../cache/repositories/heroesRepository';

class HeroesController {

    heroesRepository = new HeroesRepository();

    async fillCache() 
    {
        const data = await axiosInstance.get(endpoints.searchHeroes);

        await this.heroesRepository.setHeroesJson(data.data);
    }

    getResponseCode(length: number, errorCode: number)
    {
        if(length < 1)
        {
            return errorCode;
        }
        return responseCodes.HTTP_OK;
    }

    async search (request: Request, response: Response)
    {
        const { q } = request.query;

        if(String(q).length < 3 || q == undefined) {
            return response.status(responseCodes.HTTP_BAD_REQUEST).json({
                message:'search term must have at least 3 characters',
            });
        }

        try{
            if(this.heroesRepository.cacheIsEmpty())
            {
                await this.fillCache();
            }

            const heroes = await this.heroesRepository.filterHero(String(q));

            const status = this.getResponseCode(heroes.length, responseCodes.HTTP_NO_CONTENT);

            return response.status(status).send(heroes);
        }
        catch(error)
        {
            console.error(error.message);
            return response.status(responseCodes.HTTP_INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `failed to fetch from the superheroes api with error: ${error.message}`,
            })
        }
    }

    async show(request: Request, response: Response) {
        const { slug } = request.params;

        try{
            if(this.heroesRepository.cacheIsEmpty())
            {
                await this.fillCache();
            }
                const hero = await this.heroesRepository.findHero(slug);

                const status = this.getResponseCode(hero.length, responseCodes.HTTP_NOT_FOUND);

                return response.status(status).send(hero);
        }
        catch(error)
        {
            console.error(error.message);
            return response.status(responseCodes.HTTP_INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `failed to fetch from the superheroes api with error: ${error.message}`,
            })
        }

    }
}

export default HeroesController;
