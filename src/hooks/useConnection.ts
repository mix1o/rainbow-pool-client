import { useState, useEffect } from "react";
import { MetaMask } from "../connectors/MetaMask";
import { useEagerConnect } from "./useEagerConnect";
import { useInactiveListener } from "./useInactiveListener";
import { useTypedWeb3React } from "./useTypedWeb3React";

export const useConnection = () => {
  const { connector } = useTypedWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect(MetaMask);
  return useInactiveListener(!triedEager || !activatingConnector, MetaMask);
};
