import { BaseContract } from '@ethersproject/contracts';
import { CHAINS } from '@lynx-sdk/constants';
import { Factory } from '@lynx-sdk/contracts';
export declare const contractHooksFactory: <C extends BaseContract>(factory: Factory<C>, getTokenAddress: (chainId: CHAINS) => string) => {
    useContractRPC: () => C;
    useContractWeb3: () => C | null;
};
export declare const useWSTETHContractRPC: () => WstethAbi;
export declare const useWSTETHContractWeb3: () => any;
export declare const useSTETHContractRPC: () => StethAbi;
export declare const useSTETHContractWeb3: () => any;
export declare const useLDOContractRPC: () => LdoAbi;
export declare const useLDOContractWeb3: () => any;
export declare const useWithdrawalQueueContractRPC: () => WithdrawalQueueAbi;
export declare const useWithdrawalQueueContractWeb3: () => any;
