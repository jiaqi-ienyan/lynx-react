import { getTokenAddress } from '@lynx-sdk/constants';
import { useSDK } from './useSDK';
export const useTokenAddress = (token) => {
    const { chainId } = useSDK();
    return getTokenAddress(chainId, token);
};
