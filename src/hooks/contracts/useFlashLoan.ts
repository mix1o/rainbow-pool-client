import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  ChainId,
  FlashLoan__factory,
  getContractAddressesForChainOrThrow,
} from "rainbow-abis";

export const useFlashLoan = () => {
  const { library, account } = useWeb3React<Web3Provider>();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new FlashLoan__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).flashLoan
    );
  }, [library, account]);
};
