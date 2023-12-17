import { useContext } from 'react';
import { SDKContext } from '../context';
import invariant from 'tiny-invariant';
export const useSDK = () => {
    const contextValue = useContext(SDKContext);
    invariant(contextValue, 'useSDK was used outside of SDKContext');
    return contextValue;
};
