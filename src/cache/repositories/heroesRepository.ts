import { getCacheKey, setCacheKey, cacheIsEmpty } from '../cache';

class HeroesRepository {
    async filterHero(searchTerm: string)
    {
        const responseData = await getCacheKey('heroes');
        const filteredResponse = responseData.filter((hero: any) => {
            return Object.values(hero).toString().toLowerCase().includes(searchTerm.toLowerCase()); 
        });

        return filteredResponse;
    }

    async findHero (slug: string)
    {
        const responseData = await getCacheKey('heroes');
        const filteredResponse = responseData.filter((hero: any) => {
            return hero.slug.toString().toLowerCase() === slug.toLowerCase(); 
        });

        return filteredResponse;
    }

    async setHeroesJson(json: Array<string>){
        await setCacheKey('heroes', json, 86400);//seta o cache pra durar 1 dia
    }

    cacheIsEmpty()
    {
        return cacheIsEmpty();
    }
}

export default HeroesRepository;
