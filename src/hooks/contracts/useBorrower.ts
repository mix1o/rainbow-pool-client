import { useMemo } from "react";
import {
  ChainId,
  getContractAddressesForChainOrThrow,
  Borrower__factory,
} from "rainbow-abis";
import { useTypedWeb3React } from "../useTypedWeb3React";

export const useBorrower = () => {
  const { library, account } = useTypedWeb3React();

  return useMemo(() => {
    if (!library || !account) return null;
    const signer = library.getSigner();
    if (!signer) return null;
    return new Borrower__factory(signer).attach(
      getContractAddressesForChainOrThrow(ChainId.rinkeby).borrower
    );
  }, [library, account]);
};
