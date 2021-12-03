import { parseUnits } from "@ethersproject/units";
import { useState } from "react";
import { useBorrower } from "../hooks/contracts/useBorrower";
import { useFlashLoan } from "../hooks/contracts/useFlashLoan";
import { useLpToken } from "../hooks/contracts/useLpToken";
import { usePool } from "../hooks/contracts/usePool";
import { useRainbowToken } from "../hooks/contracts/useRainbowToken";
import { constants } from "ethers";
import { useBalance } from "../context/UserBalance";
import { useWeb3React } from "@web3-react/core";

export const useExchanger = () => {
  const pool = usePool();
  const rainbowToken = useRainbowToken();
  const lpToken = useLpToken();
  const flashLoan = useFlashLoan();
  const borrower = useBorrower();
  const { rainbowBalance, lpTokenBalance } = useBalance();
  const { account } = useWeb3React();

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const handleFlashLoan = async (amountTokens: string) => {
    if (!rainbowToken || !borrower || !flashLoan) return;
    setIsTransactionLoading(true);

    const tx = await rainbowToken.approve(
      borrower.address,
      constants.MaxUint256
    );

    await tx.wait();

    const borrowTx = await flashLoan.borrowTokens(
      borrower.address,
      rainbowToken.address,
      parseUnits(amountTokens)
    );
    await borrowTx.wait();
    setIsTransactionLoading(false);
  };

  const handleDeposit = async (amountTokens: string) => {
    if (!pool) return;
    setIsTransactionLoading(true);
    const tx = await pool.deposit(parseUnits(amountTokens));
    await tx.wait();
    setIsTransactionLoading(false);
  };

  const handleApprove = async () => {
    if (!pool || !rainbowToken || !rainbowBalance) return;
    setIsTransactionLoading(true);
    const tx = await rainbowToken.approve(pool.address, rainbowBalance);
    await tx.wait();
    setIsTransactionLoading(false);
  };

  const handleWithdraw = async () => {
    if (!pool || !rainbowToken || !rainbowBalance || !account || !lpToken)
      return;

    if (!lpTokenBalance) return;

    setIsTransactionLoading(true);
    const txApprove = await lpToken.approve(pool.address, lpTokenBalance);
    await txApprove.wait();

    const txWithdraw = await pool.withdraw();
    await txWithdraw.wait();
    setIsTransactionLoading(false);
  };

  const handleCollectRewards = async () => {
    if (!lpToken || !account) return;
    setIsTransactionLoading(true);
    const tx = await lpToken.collectRewards();
    await tx.wait();
    setIsTransactionLoading(false);
  };

  const userHasLpTokens = () => (Number(lpTokenBalance) > 0 ? true : false);

  return {
    handleDeposit,
    handleWithdraw,
    handleApprove,
    handleFlashLoan,
    handleCollectRewards,
    userHasLpTokens,
    isTransactionLoading,
  };
};
