import { InjectedConnector } from "@web3-react/injected-connector";
import { useTypedWeb3React } from "../hooks/useTypedWeb3React";

export const MetaMask = new InjectedConnector({ supportedChainIds: [1, 4] });

export const useMetaMask = () => {
  const { activate } = useTypedWeb3React();

  const connectMetaMask = () => {
    activate(MetaMask);
  };

  return {
    connectMetaMask,
  };
};
