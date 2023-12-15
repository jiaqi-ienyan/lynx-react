import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
import { SWRConfiguration } from 'swr';
export declare const useEthereumBalance: (account?: string, config?: SWRConfiguration<BigNumber, Error>) => SWRResponse<BigNumber>;
