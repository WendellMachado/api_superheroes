import { getCacheKey, setCacheKey, cacheIsEmpty } from '../cache';

class HeroesRepository {
    filterHero(searchTerm: string)
    {
        const responseData = getCacheKey('heroes');
        const filteredResponse = responseData.filter((hero: any) => {
            return Object.values(hero).toString().toLowerCase().includes(searchTerm.toLowerCase()); 
        });

        return filteredResponse;
    }

    findHero (slug: string)
    {
        const responseData = getCacheKey('heroes');
        const filteredResponse = responseData.filter((hero: any) => {
            return hero.slug.toString().toLowerCase() === slug.toLowerCase(); 
        });

        return filteredResponse;
    }

    setHeroesJson(json: Array<string>){
        setCacheKey('heroes', json, 86400);//seta o cache pra durar 1 dia
    }

    cacheIsEmpty()
    {
        return cacheIsEmpty();
    }
}

export default HeroesRepository;
