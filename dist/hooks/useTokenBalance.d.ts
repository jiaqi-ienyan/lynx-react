import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
import { SWRConfiguration } from 'swr';
export declare const useTokenBalance: (token: string, account?: string, config?: SWRConfiguration<BigNumber>) => SWRResponse<BigNumber>;
