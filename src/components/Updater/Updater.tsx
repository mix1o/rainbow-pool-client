import { useEffect, FC } from "react";
import { useUserBalance } from "../../context/UserBalance";
import { useLpToken } from "../../hooks/contracts/useLpToken";
import { useRainbowToken } from "../../hooks/contracts/useRainbowToken";
import { useTypedWeb3React } from "../../hooks/useTypedWeb3React";

const Updater: FC = () => {
  const rainbowToken = useRainbowToken();
  const lpToken = useLpToken();

  const { account, library } = useTypedWeb3React();
  const {
    rainbowBalance,
    setRainbowBalance,
    lpTokenBalance,
    setLpTokenBalance,
    ethBalance,
    setEthBalance,
  } = useUserBalance();

  useEffect(() => {
    const loadUserRainbowBalance = async () => {
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
      loadUserRainbowBalance();
      return;
    }
    const interval = setInterval(() => {
      loadUserRainbowBalance();
    }, 1000);

    return () => clearInterval(interval);
  }, [rainbowToken, account, setRainbowBalance, rainbowBalance]);

  useEffect(() => {
    const userLpTokensBalance = async () => {
      if (!account || !lpToken) return;
      const newLpTokens = await lpToken.balanceOf(account);
      if (lpTokenBalance) {
        if (newLpTokens && !newLpTokens.eq(lpTokenBalance)) {
          setLpTokenBalance(newLpTokens);
        }
      } else {
        setLpTokenBalance(newLpTokens);
      }
    };

    if (!lpTokenBalance) {
      userLpTokensBalance();
      return;
    }

    const interval = setInterval(() => {
      userLpTokensBalance();
    }, 1000);

    return () => clearInterval(interval);
  }, [rainbowBalance, account, lpToken, setLpTokenBalance, lpTokenBalance]);

  useEffect(() => {
    const getEthBalance = async () => {
      if (!account || !library) return;
      const eth = await library.getBalance(account);
      if (ethBalance) {
        if (eth && !eth.eq(ethBalance)) {
          setEthBalance(eth);
        }
      } else {
        setEthBalance(eth);
      }
    };

    if (!ethBalance) {
      getEthBalance();
      return;
    }

    const interval = setInterval(() => {
      getEthBalance();
    }, 1000);

    return () => clearInterval(interval);
  }, [account, library, rainbowBalance, setEthBalance, ethBalance]);

  return <></>;
};

export default Updater;
