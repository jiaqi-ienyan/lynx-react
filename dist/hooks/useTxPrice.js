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
import { WeiPerEther } from '@ethersproject/constants';
import { divide } from '@lynx-sdk/helpers';
import { useCallback, useMemo } from 'react';
import { useEthereumSWR } from './useEthereumSWR';
import { useEthPrice } from './useEthPrice';
const getTxPrice = (gasLimit, ethPrice, gasPrice) => {
    if (!gasLimit || ethPrice == null || gasPrice == null) {
        return undefined;
    }
    const txCostInWei = gasPrice.mul(BigNumber.from(gasLimit));
    const txCostInEth = divide(txCostInWei, WeiPerEther);
    return ethPrice * txCostInEth;
};
export const useTxPrice = (gasLimit) => {
    const eth = useEthPrice();
    const gas = useEthereumSWR({ method: 'getGasPrice' });
    const ethPrice = eth.data;
    const gasPrice = gas.data;
    const data = useMemo(() => {
        return getTxPrice(gasLimit, ethPrice, gasPrice);
    }, [gasLimit, ethPrice, gasPrice]);
    const updateEth = eth.update;
    const updateGas = gas.update;
    const update = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const [ethPrice, gasPrice] = yield Promise.all([updateEth(), updateGas()]);
        return getTxPrice(gasLimit, ethPrice, gasPrice);
    }), [gasLimit, updateEth, updateGas]);
    return {
        update,
        data,
        /*
         * support dependency collection
         * https://swr.vercel.app/advanced/performance#dependency-collection
         */
        get loading() {
            return eth.loading || gas.loading;
        },
        get initialLoading() {
            return eth.initialLoading || gas.initialLoading;
        },
        get error() {
            return eth.error || gas.error;
        },
    };
};
