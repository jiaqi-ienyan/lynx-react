import { BigNumber } from '@ethersproject/bignumber'
import { CHAINS } from '@lido-sdk/constants'
import {
  SWRResponse,
  UseApproveResponse,
  UseApproveWrapper,
  useAllowance,
  useDecimals,
  useTokenBalance,
  useTotalSupply,
  useApprove,
} from '../hooks'
export declare const hooksFactory: (getTokenAddress: (chainId: CHAINS) => string) => {
  useTokenBalance: () => SWRResponse<BigNumber>
  useTotalSupply: () => SWRResponse<BigNumber>
  useDecimals: () => SWRResponse<number>
  useAllowance: (spender: string) => SWRResponse<BigNumber>
  useApprove: (amount: BigNumber, spender: string, wrapper: UseApproveWrapper) => UseApproveResponse
}
export declare const useWSTETHBalance: () => SWRResponse<BigNumber>
export declare const useWSTETHTotalSupply: () => SWRResponse<BigNumber>
export declare const useWSTETHDecimals: () => SWRResponse<number>
export declare const useWSTETHAllowance: (spender: string) => SWRResponse<BigNumber>
export declare const useWSTETHApprove: (
  amount: BigNumber,
  spender: string,
  wrapper: UseApproveWrapper
) => UseApproveResponse
export declare const useSTETHBalance: () => SWRResponse<BigNumber>
export declare const useSTETHTotalSupply: () => SWRResponse<BigNumber>
export declare const useSTETHDecimals: () => SWRResponse<number>
export declare const useSTETHAllowance: (spender: string) => SWRResponse<BigNumber>
export declare const useSTETHApprove: (
  amount: BigNumber,
  spender: string,
  wrapper: UseApproveWrapper
) => UseApproveResponse
export declare const useLDOBalance: () => SWRResponse<BigNumber>
export declare const useLDOTotalSupply: () => SWRResponse<BigNumber>
export declare const useLDODecimals: () => SWRResponse<number>
export declare const useLDOAllowance: (spender: string) => SWRResponse<BigNumber>
export declare const useLDOApprove: (
  amount: BigNumber,
  spender: string,
  wrapper: UseApproveWrapper
) => UseApproveResponse
