var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getERC20Contract } from '@lynx-sdk/contracts';
import { useCallback } from 'react';
import { useSDK } from './useSDK';
import { useMountedState } from './useMountedState';
export const useTokenToWallet = (address, image) => {
    const [loading, setLoading] = useMountedState(false);
    const { providerRpc, providerWeb3, onError } = useSDK();
    const handleAdd = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const provider = providerWeb3 === null || providerWeb3 === void 0 ? void 0 : providerWeb3.provider;
        if (!(provider === null || provider === void 0 ? void 0 : provider.request))
            return false;
        try {
            setLoading(true);
            const contract = getERC20Contract(address, providerRpc);
            const [symbol, decimals] = yield Promise.all([contract.symbol(), contract.decimals()]);
            const result = yield provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals,
                        image,
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                },
            });
            return !!result;
        }
        catch (error) {
            onError(error);
            return false;
        }
        finally {
            setLoading(false);
        }
    }), [address, image, providerWeb3, providerRpc, setLoading, onError]);
    const canAdd = !!(providerWeb3 === null || providerWeb3 === void 0 ? void 0 : providerWeb3.provider.isMetaMask);
    const addToken = canAdd ? handleAdd : undefined;
    return {
        addToken,
        loading,
    };
};
