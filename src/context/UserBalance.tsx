import { BigNumber } from "@ethersproject/bignumber";
import { createContext, useState, FC, useContext } from "react";

export const UserBalanceContext = createContext<{
  rainbowBalance?: BigNumber;
  setRainbowBalance: (val: BigNumber) => void;
  lpTokenBalance?: BigNumber;
  setLpTokenBalance: (val: BigNumber) => void;
  ethBalance?: BigNumber;
  setEthBalance: (val: BigNumber) => void;
}>({
  rainbowBalance: undefined,
  setRainbowBalance: () => null,
  lpTokenBalance: undefined,
  setLpTokenBalance: () => null,
  ethBalance: undefined,
  setEthBalance: () => null,
});

export const UserBalanceProvider: FC = ({ children }) => {
  const [rainbowBalance, setRainbowBalance] = useState<BigNumber | undefined>(
    undefined
  );
  const [lpTokenBalance, setLpTokenBalance] = useState<BigNumber | undefined>(
    undefined
  );
  const [ethBalance, setEthBalance] = useState<BigNumber | undefined>(
    undefined
  );

  return (
    <UserBalanceContext.Provider
      value={{
        rainbowBalance,
        setRainbowBalance,
        lpTokenBalance,
        setLpTokenBalance,
        ethBalance,
        setEthBalance,
      }}
    >
      {children}
    </UserBalanceContext.Provider>
  );
};

export const useUserBalance = () => {
  return useContext(UserBalanceContext);
};
