const NodeCache = require( "node-cache" );

const cacheInstance = new NodeCache();

export const cacheIsEmpty = () => {
    return cacheInstance.keys().length < 1;
}

export const setCacheKey = (key: string, value: Array<string>, timeToExpire: number) => {
    cacheInstance.set(key, value, timeToExpire);
}

export const getCacheKey = (key: string) => {
    return cacheInstance.get(key);
}
