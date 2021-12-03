import { useEffect, useState } from "react";
import { usePool } from "./contracts/usePool";
import { useRainbowToken } from "./contracts/useRainbowToken";
import { useDebounce } from "./useDebounce";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useUserBalance } from "../context/UserBalance";
import { useTypedWeb3React } from "./useTypedWeb3React";

enum ErrorMessages {
  Balance = "Amount exceeds balance",
}

export const useInputValidation = (amountTokens: string) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { rainbowBalance } = useUserBalance();

  const [approvalRequired, setApprovalRequired] = useState(false);
  const [allowDeposit, setAllowDeposit] = useState(false);

  const debouncedInput = useDebounce(amountTokens, 500);

  const rainbowToken = useRainbowToken();
  const { account } = useTypedWeb3React();
  const pool = usePool();
  const isValidInput = debouncedInput && Number(debouncedInput) > 0;

  useEffect(() => {
    const checkAllowance = async () => {
      setLoading(true);

      if (!pool || !account) return;
      const allowance = await rainbowToken?.allowance(account, pool.address);

      if (!allowance || !rainbowBalance) return;

      setLoading(false);

      if (allowance.lt(parseUnits(debouncedInput))) {
        if (BigNumber.from(parseUnits(debouncedInput)).lte(rainbowBalance)) {
          setApprovalRequired(true);
        }
        setAllowDeposit(false);
      } else {
        setApprovalRequired(false);
        setAllowDeposit(true);
      }
    };

    if (isValidInput && rainbowBalance) {
      checkAllowance();
    } else {
      setApprovalRequired(false);
    }
  }, [
    account,
    rainbowBalance,
    isValidInput,
    pool,
    rainbowToken,
    debouncedInput,
  ]);

  useEffect(() => {
    if (rainbowBalance && isValidInput) {
      if (BigNumber.from(parseUnits(debouncedInput)).gt(rainbowBalance)) {
        setErrorMsg(ErrorMessages.Balance);
        setApprovalRequired(false);
        setAllowDeposit(false);
      } else {
        setAllowDeposit(true);
        setErrorMsg("");
      }
    } else {
      setAllowDeposit(false);
      setErrorMsg("");
    }
  }, [rainbowBalance, debouncedInput, isValidInput]);

  return {
    loading,
    errorMsg,
    approvalRequired,
    allowDeposit,
    isValidInput,
  };
};
