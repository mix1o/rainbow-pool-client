import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { useTypedWeb3React } from "./useTypedWeb3React";

export const useEagerConnect = (injected: InjectedConnector) => {
  const { activate, active } = useTypedWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate, injected]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
