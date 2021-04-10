import { Request, Response } from "express";
import responseCodes from './responseCode';
import endpoints from '../externalApi/endpoints';
import axiosInstance from '../externalApi/axiosConfig';
import {cacheIsEmpty, setCacheKey, getCacheKey} from '../cache/cache';

function filterHero (searchTerm: string) {
    const responseData = getCacheKey('heroes');
    const filteredResponse = responseData.filter((hero: any) => {
        return Object.values(hero).toString().toLowerCase().includes(searchTerm.toLowerCase()); 
    });

    return filteredResponse;
}

function findHero (slug: string)
{
    const responseData = getCacheKey('heroes');
    const filteredResponse = responseData.filter((hero: any) => {
        return hero.slug.toString().toLowerCase() === slug.toLowerCase(); 
    });

    return filteredResponse;
}

class HeroesController {
    async search (request: Request, response: Response)
    {
        const { q } = request.query;

        if(String(q).length < 3 || q == undefined) {
            return response.status(responseCodes.HTTP_BAD_REQUEST).json({
                message:'search term must have at least 3 characters',
            });
        }

        try{
            if(cacheIsEmpty())
            {
                const data = await axiosInstance.get(endpoints.searchHeroes);
                setCacheKey('heroes', data.data, 86400);

                const heroes = filterHero(String(q));
                let responseCode = responseCodes.HTTP_OK;
                if(heroes.length < 1)
                {
                    responseCode = responseCodes.HTTP_NO_CONTENT;
                }
                return response.status(responseCode).send(heroes);
            }
            else {
                const heroes = filterHero(String(q));
                let responseCode = responseCodes.HTTP_OK;
                if(heroes.length < 1)
                {
                    responseCode = responseCodes.HTTP_NO_CONTENT;
                }
                return response.status(responseCode).send(heroes);
            }
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
            if(cacheIsEmpty())
            {
                const data = await axiosInstance.get(endpoints.searchHeroes);
                setCacheKey('heroes', data.data, 86400);

                const hero = findHero(slug);

                let responseCode = responseCodes.HTTP_OK;

                if(hero.length < 1)
                {
                    responseCode = responseCodes.HTTP_NOT_FOUND;
                }
                return response.status(responseCode).send(hero);
            }
            else {
                const hero = findHero(slug);

                let responseCode = responseCodes.HTTP_OK;

                if(hero.length < 1)
                {
                    responseCode = responseCodes.HTTP_NOT_FOUND;
                }
                return response.status(responseCode).send(hero);
            }
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
