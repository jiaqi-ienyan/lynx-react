import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { SWRConfiguration } from 'swr';
import { FeeHistory } from './useFeeHistory';
import { SWRResponse } from './useLidoSWR';
export type FeeAnalytics = SWRResponse<FeeHistory, Error> & {
    percentile: number;
    baseFee: BigNumber;
};
export declare const calculatePercentile: (array: BigNumber[], target: BigNumber) => number;
export declare const useFeeAnalytics: (props?: {
    shouldFetch?: boolean;
    providerRpc?: JsonRpcProvider;
    providerWeb3?: Web3Provider;
    blocks?: number;
    config?: SWRConfiguration<FeeHistory, Error>;
}) => FeeAnalytics;
