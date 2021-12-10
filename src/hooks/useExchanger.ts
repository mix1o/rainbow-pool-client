import { parseUnits } from "@ethersproject/units";
import { useState, useMemo, useCallback } from "react";
import { useBorrower } from "../hooks/contracts/useBorrower";
import { useFlashLoan } from "../hooks/contracts/useFlashLoan";
import { useLpToken } from "../hooks/contracts/useLpToken";
import { usePool } from "../hooks/contracts/usePool";
import { useRainbowToken } from "../hooks/contracts/useRainbowToken";
import { constants } from "ethers";
import { useUserBalance } from "../context/UserBalance";
import { useTypedWeb3React } from "./useTypedWeb3React";

export const useExchanger = () => {
  const pool = usePool();
  const rainbowToken = useRainbowToken();
  const lpToken = useLpToken();
  const flashLoan = useFlashLoan();
  const borrower = useBorrower();
  const { rainbowBalance, lpTokenBalance } = useUserBalance();
  const { account } = useTypedWeb3React();

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const handleFlashLoan = useCallback(
    async (amountTokens: string) => {
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
    },
    [borrower, flashLoan, rainbowToken]
  );

  const handleDeposit = useCallback(
    async (amountTokens: string) => {
      if (!pool) return;
      setIsTransactionLoading(true);
      const tx = await pool.deposit(parseUnits(amountTokens));
      await tx.wait();
      setIsTransactionLoading(false);
    },
    [pool]
  );

  const handleApprove = useCallback(async () => {
    if (!pool || !rainbowToken || !rainbowBalance) return;
    setIsTransactionLoading(true);
    const tx = await rainbowToken.approve(pool.address, rainbowBalance);
    await tx.wait();
    setIsTransactionLoading(false);
  }, [pool, rainbowBalance, rainbowToken]);

  const handleWithdraw = useCallback(async () => {
    if (!pool || !rainbowToken || !rainbowBalance || !account || !lpToken)
      return;

    if (!lpTokenBalance) return;

    setIsTransactionLoading(true);
    const txApprove = await lpToken.approve(pool.address, lpTokenBalance);
    await txApprove.wait();

    const txWithdraw = await pool.withdraw();
    await txWithdraw.wait();
    setIsTransactionLoading(false);
  }, [account, lpToken, lpTokenBalance, pool, rainbowBalance, rainbowToken]);

  const handleCollectRewards = useCallback(async () => {
    if (!lpToken || !account) return;
    setIsTransactionLoading(true);
    const tx = await lpToken.collectRewards();
    await tx.wait();
    setIsTransactionLoading(false);
  }, [account, lpToken]);

  const userHasLpTokens = useMemo(() => {
    return Number(lpTokenBalance) > 0;
  }, [lpTokenBalance]);

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
