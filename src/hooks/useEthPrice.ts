import { SWRConfiguration } from 'swr'
import { BigNumber } from '@ethersproject/bignumber'
import { getAggregatorContract } from '@lynx-sdk/contracts'
import { getAggregatorAddress, CHAINS } from '@lynx-sdk/constants'
import { divide } from '@lynx-sdk/helpers'
import { useSDK } from './useSDK'
import { SWRResponse, useLidoSWR } from './useLidoSWR'

type useEthPriceResult = number

export const useEthPrice = (config?: SWRConfiguration<useEthPriceResult, unknown>): SWRResponse<useEthPriceResult> => {
  const { providerMainnetRpc } = useSDK()
  const address = getAggregatorAddress(CHAINS.Mainnet)
  const aggregatorContract = getAggregatorContract(address, providerMainnetRpc)

  return useLidoSWR(
    ['lido-swr:eth-price', aggregatorContract],
    async () => {
      const [decimals, latestAnswer] = await Promise.all([
        aggregatorContract.decimals(),
        aggregatorContract.latestAnswer(),
      ])
      return divide(latestAnswer, BigNumber.from(10).pow(decimals))
    },
    config
  )
}
