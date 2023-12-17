import { SWRConfiguration } from 'swr';
import { CHAINS } from '@lynx-sdk/constants';
import { BaseProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
export type SourceFeeHistory = {
    oldestBlock: number;
    baseFeePerGas: readonly string[];
    gasUsedRatio: readonly number[];
};
export type FeeHistory = {
    oldestBlock: number;
    baseFeePerGas: readonly BigNumber[];
    gasUsedRatio: readonly number[];
};
export declare const historyCache: Map<CHAINS, FeeHistory>;
export declare const getBlockNumber: (provider: BaseProvider) => Promise<number>;
export declare const getChunksArguments: <T extends [number, string, number[]]>(fromBlock: number, toBlock: number, chunkSize?: number) => T[];
export declare const combineHistory: (...histories: FeeHistory[]) => FeeHistory;
export declare const trimHistory: (history: FeeHistory, blocks: number) => FeeHistory;
export declare const getFeeHistory: (provider: JsonRpcProvider, fromBlock: number, toBlock: number, chunkSize?: number) => Promise<FeeHistory>;
export declare const useFeeHistory: <P extends JsonRpcProvider, W extends Web3Provider>(props?: {
    shouldFetch?: boolean;
    providerRpc?: P;
    providerWeb3?: W;
    blocks?: number;
    config?: SWRConfiguration<FeeHistory, Error>;
}) => SWRResponse<FeeHistory, Error>;
