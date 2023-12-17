import invariant from 'tiny-invariant';
import { useLidoSWR } from './useLidoSWR';
export const useContractEstimateGasSWR = (props) => {
    const { shouldFetch = true, params = [], contract, method, config } = props;
    invariant(method != null, 'Method is required');
    return useLidoSWR(shouldFetch && contract ? [contract, method, ...params] : null, (contract, method, ...params) => {
        return contract.estimateGas[method](...params);
    }, config);
};
