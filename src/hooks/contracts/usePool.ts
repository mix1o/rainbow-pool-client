import { useMemo } from "react";
import {
  ChainId,
  getContractAddressesForChainOrThrow,
  Pool__factory,
} from "rainbow-abis";
import { useTypedWeb3React } from "../useTypedWeb3React";

export const usePool = () => {
  const { library, account } = useTypedWeb3React();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new Pool__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).pool
    );
  }, [library, account]);
};
