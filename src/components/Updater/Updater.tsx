import { useWeb3React } from "@web3-react/core";
import { useEffect, FC } from "react";
import { useBalance } from "../../context/UserBalance";
import { useLpToken } from "../../hooks/contracts/useLpToken";
import { useRainbowToken } from "../../hooks/contracts/useRainbowToken";

const Updater: FC = () => {
  const { account } = useWeb3React();
  const rainbowToken = useRainbowToken();
  const lpToken = useLpToken();

  const { library } = useWeb3React();
  const {
    rainbowBalance,
    setRainbowBalance,
    lpTokenBalance,
    setLpTokenBalance,
    setEthBalance,
  } = useBalance();

  useEffect(() => {
    const loadUserBalance = async () => {
      if (!account || !rainbowToken) return;
      const newBalance = await rainbowToken.balanceOf(account);
      if (rainbowBalance) {
        if (newBalance && !newBalance.eq(rainbowBalance)) {
          setRainbowBalance(newBalance);
        }
      } else {
        setRainbowBalance(newBalance);
      }
    };

    if (!rainbowBalance) {
      loadUserBalance();
      return;
    }
    const interval = setInterval(() => {
      loadUserBalance();
    }, 1000);

    return () => clearInterval(interval);
  }, [rainbowToken, account, setRainbowBalance, rainbowBalance]);

  useEffect(() => {
    const userLpTokensBalance = async () => {
      if (!account || !lpToken) return;
      const newLpTokens = await lpToken.balanceOf(account);
      if (lpTokenBalance) {
        if (newLpTokens && !newLpTokens.eq(lpTokenBalance))
          setLpTokenBalance(newLpTokens);
      } else {
        setLpTokenBalance(newLpTokens);
      }
    };

    userLpTokensBalance();
  }, [rainbowBalance, account, lpToken, setLpTokenBalance, lpTokenBalance]);

  useEffect(() => {
    const getEthBalance = async () => {
      if (!account || !library) return;
      const eth = await library.getBalance(account);
      setEthBalance(eth);
    };
    getEthBalance();
  }, [account, library, rainbowBalance, setEthBalance]);

  return <></>;
};

export default Updater;
