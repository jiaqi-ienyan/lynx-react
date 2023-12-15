import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from './useLidoSWR';
export declare const useAllowance: (token: string, spender: string, owner?: string) => SWRResponse<BigNumber>;
