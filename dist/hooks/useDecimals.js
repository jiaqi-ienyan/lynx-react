import invariant from 'tiny-invariant';
import { getERC20Contract } from '@lynx-sdk/contracts';
import { useContractSWR } from './useContractSWR';
import { useSDK } from './useSDK';
export const useDecimals = (token, config) => {
    const { providerRpc } = useSDK();
    invariant(token != null, 'Token address is required');
    const contract = getERC20Contract(token, providerRpc);
    const result = useContractSWR({ contract, method: 'decimals', config });
    return result;
};
