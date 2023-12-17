import { BaseContract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
import { FilterAsyncMethods } from './types';
import { SWRConfiguration } from 'swr';
export declare const useContractEstimateGasSWR: <C extends BaseContract, M extends FilterAsyncMethods<C["estimateGas"]>, F extends boolean>(props: {
    contract?: C;
    method: M;
    shouldFetch?: F;
    params?: F extends false ? unknown[] : Parameters<C["estimateGas"][M]>;
    config?: SWRConfiguration<BigNumber, Error>;
}) => SWRResponse<BigNumber, Error>;
