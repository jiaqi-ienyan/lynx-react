import { BaseProvider } from '@ethersproject/providers';
import { SWRResponse } from './useLidoSWR';
import { FilterAsyncMethods, UnpackedPromise } from './types';
import { SWRConfiguration } from 'swr';
export declare const useEthereumSWR: <P extends BaseProvider, M extends FilterAsyncMethods<P>, R extends UnpackedPromise<ReturnType<P[M]>>, F extends boolean>(props: {
    method: M;
    shouldFetch?: F;
    providerRpc?: P;
    params?: F extends false ? unknown[] : Parameters<P[M]>;
    config?: Partial<import("swr/dist/types").PublicConfiguration<R, Error, import("swr").BareFetcher<any>>>;
}) => SWRResponse<R, Error>;
