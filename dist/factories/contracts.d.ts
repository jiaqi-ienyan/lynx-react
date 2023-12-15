import { BaseContract } from '@ethersproject/contracts';
import { CHAINS } from '@lynx-sdk/constants';
export declare const contractHooksFactory: <C extends BaseContract>(factory: Factory<C>, getTokenAddress: (chainId: CHAINS) => string) => {
    useContractRPC: () => C;
    useContractWeb3: () => C | null;
};
export declare const useWSTETHContractRPC: () => BaseContract;
export declare const useWSTETHContractWeb3: () => BaseContract | null;
export declare const useSTETHContractRPC: () => BaseContract;
export declare const useSTETHContractWeb3: () => BaseContract | null;
export declare const useLDOContractRPC: () => BaseContract;
export declare const useLDOContractWeb3: () => BaseContract | null;
export declare const useWithdrawalQueueContractRPC: () => BaseContract;
export declare const useWithdrawalQueueContractWeb3: () => BaseContract | null;
