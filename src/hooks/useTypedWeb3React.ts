import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const useTypedWeb3React = () => {
  return useWeb3React<Web3Provider>();
};
