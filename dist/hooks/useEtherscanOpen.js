import { getEtherscanLink, openWindow } from '@lynx-sdk/helpers';
import { useCallback } from 'react';
import { useSDK } from './useSDK';
export const useEtherscanOpen = (hash, entity) => {
    const { chainId } = useSDK();
    return useCallback(() => {
        const link = getEtherscanLink(chainId, hash, entity);
        openWindow(link);
    }, [chainId, entity, hash]);
};
