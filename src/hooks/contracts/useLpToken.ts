import { useMemo } from "react";
import {
  ChainId,
  getContractAddressesForChainOrThrow,
  LpToken__factory,
} from "rainbow-abis";
import { useTypedWeb3React } from "../useTypedWeb3React";

export const useLpToken = () => {
  const { library, account } = useTypedWeb3React();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new LpToken__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).lpToken
    );
  }, [library, account]);
};
