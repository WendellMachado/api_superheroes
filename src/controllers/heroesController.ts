import { Request, Response } from "express";
import responseCodes from './responseCode';
import endpoints from '../externalApi/endpoints';
import axiosInstance from '../externalApi/axiosConfig';
import {cacheIsEmpty, setCacheKey, getCacheKey} from '../cache/cache';
import deepFilter from 'deep-filter-object'; 

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
                const responseData = getCacheKey('heroes');
                const filteredResponse = responseData.filter((hero) => {
                    return Object.values(hero).toString().toLowerCase().includes(q.toLowerCase()); 
                });
                return response.send(filteredResponse);
            }
            else {
                const responseData = getCacheKey('heroes');
                const filteredResponse = responseData.filter((hero) => {
                    return Object.values(hero).toString().toLowerCase().includes(q.toLowerCase()); 
                });
                return response.send(filteredResponse);
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
