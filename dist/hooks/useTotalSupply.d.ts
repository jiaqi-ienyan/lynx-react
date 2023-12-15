import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
import { SWRConfiguration } from 'swr';
export declare const useTotalSupply: (token: string, config?: SWRConfiguration<BigNumber>) => SWRResponse<BigNumber>;
