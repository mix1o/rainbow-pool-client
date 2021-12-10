import { useMemo } from "react";
import {
  ChainId,
  FlashLoan__factory,
  getContractAddressesForChainOrThrow,
} from "rainbow-abis";
import { useTypedWeb3React } from "../useTypedWeb3React";

export const useFlashLoan = () => {
  const { library, account } = useTypedWeb3React();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new FlashLoan__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).flashLoan
    );
  }, [library, account]);
};
