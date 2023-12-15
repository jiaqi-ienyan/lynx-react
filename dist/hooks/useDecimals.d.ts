import { SWRResponse } from './useLidoSWR';
import { SWRConfiguration } from 'swr';
export declare const useDecimals: (token: string, config?: SWRConfiguration<number>) => SWRResponse<number>;
