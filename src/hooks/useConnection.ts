import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { useEagerConnect } from "./useEagerConnect";
import { useInactiveListener } from "./useInactiveListener";
import { useTypedWeb3React } from "./useTypedWeb3React";

export const useConnection = (type: InjectedConnector) => {
  const { connector } = useTypedWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect(type);
  return useInactiveListener(!triedEager || !activatingConnector, type);
};
