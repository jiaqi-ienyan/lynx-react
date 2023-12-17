import { TOKENS, getTokenAddress, getWithdrawalQueueAddress } from '@lynx-sdk/constants';
import { WstethAbiFactory, StethAbiFactory, LdoAbiFactory, createContractGetter, WithdrawalQueueAbiFactory, } from '@lynx-sdk/contracts';
import { useMemo } from 'react';
import { useSDK } from '../hooks';
export const contractHooksFactory = (factory, getTokenAddress) => {
    const getContract = createContractGetter(factory);
    return {
        useContractRPC: () => {
            const { chainId, providerRpc } = useSDK();
            const tokenAddress = getTokenAddress(chainId);
            return getContract(tokenAddress, providerRpc);
        },
        useContractWeb3: () => {
            const { chainId, providerWeb3 } = useSDK();
            const tokenAddress = getTokenAddress(chainId);
            const signer = useMemo(() => {
                return providerWeb3 === null || providerWeb3 === void 0 ? void 0 : providerWeb3.getSigner();
            }, [providerWeb3]);
            if (!signer)
                return null;
            return getContract(tokenAddress, signer);
        },
    };
};
const wsteth = contractHooksFactory(WstethAbiFactory, chainId => getTokenAddress(chainId, TOKENS.WSTETH));
export const useWSTETHContractRPC = wsteth.useContractRPC;
export const useWSTETHContractWeb3 = wsteth.useContractWeb3;
const steth = contractHooksFactory(StethAbiFactory, chainId => getTokenAddress(chainId, TOKENS.STETH));
export const useSTETHContractRPC = steth.useContractRPC;
export const useSTETHContractWeb3 = steth.useContractWeb3;
const ldo = contractHooksFactory(LdoAbiFactory, chainId => getTokenAddress(chainId, TOKENS.LDO));
export const useLDOContractRPC = ldo.useContractRPC;
export const useLDOContractWeb3 = ldo.useContractWeb3;
const withdrawalQueue = contractHooksFactory(WithdrawalQueueAbiFactory, chainId => getWithdrawalQueueAddress(chainId));
export const useWithdrawalQueueContractRPC = withdrawalQueue.useContractRPC;
export const useWithdrawalQueueContractWeb3 = withdrawalQueue.useContractWeb3;
