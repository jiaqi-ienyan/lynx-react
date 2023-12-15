var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BigNumber } from '@ethersproject/bignumber';
import { getAggregatorContract } from '@lynx-sdk/contracts';
import { getAggregatorAddress, CHAINS } from '@lynx-sdk/constants';
import { divide } from '@lynx-sdk/helpers';
import { useSDK } from './useSDK';
import { useLidoSWR } from './useLidoSWR';
export const useEthPrice = (config) => {
    const { providerMainnetRpc } = useSDK();
    const address = getAggregatorAddress(CHAINS.Mainnet);
    const aggregatorContract = getAggregatorContract(address, providerMainnetRpc);
    return useLidoSWR(['lido-swr:eth-price', aggregatorContract], () => __awaiter(void 0, void 0, void 0, function* () {
        const [decimals, latestAnswer] = yield Promise.all([
            aggregatorContract.decimals(),
            aggregatorContract.latestAnswer(),
        ]);
        return divide(latestAnswer, BigNumber.from(10).pow(decimals));
    }), config);
};
