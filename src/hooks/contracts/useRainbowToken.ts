import { useMemo } from "react";
import {
  ChainId,
  getContractAddressesForChainOrThrow,
  MyToken__factory,
} from "rainbow-abis";
import { useTypedWeb3React } from "../useTypedWeb3React";

export const useRainbowToken = () => {
  const { library, account } = useTypedWeb3React();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new MyToken__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).myToken
    );
  }, [library, account]);
};
