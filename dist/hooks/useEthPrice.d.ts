import { SWRConfiguration } from 'swr';
import { SWRResponse } from './useLidoSWR';
type useEthPriceResult = number;
export declare const useEthPrice: (config?: SWRConfiguration<useEthPriceResult, unknown>) => SWRResponse<useEthPriceResult>;
export {};
