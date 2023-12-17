import { useLidoSWR } from './useLidoSWR';
export const useLidoSWRImmutable = (key, fetcher, config) => {
    return useLidoSWR(key, fetcher, Object.assign({ revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }, config));
};
