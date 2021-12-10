import { ChangeEvent, FC, useState } from "react";
import { useInputValidation } from "../../hooks/useInputValidation";
import {
  ActionButton,
  Input,
  OptionButton,
  Container,
} from "./ExchangerStyled";
import { formatUnits } from "@ethersproject/units";
import {
  SmallSpinner,
  Loading,
  TransactionLoading,
} from "../../animation/Spinner";
import { useUserBalance } from "../../context/UserBalance";
import { useExchanger } from "../../hooks/useExchanger";
import { options } from "../../enums/options";
import { useTypedWeb3React } from "../../hooks/useTypedWeb3React";

const Exchanger: FC = () => {
  const [userChoice, setUserChoice] = useState(options.pool);
  const [amountTokens, setAmountTokens] = useState("0");

  const { account } = useTypedWeb3React();
  const { rainbowBalance, lpTokenBalance } = useUserBalance();
  const { loading, errorMsg, approvalRequired, allowDeposit, isValidInput } =
    useInputValidation(amountTokens);

  const {
    handleDeposit,
    handleWithdraw,
    handleApprove,
    handleFlashLoan,
    handleCollectRewards,
    userHasLpTokens,
    isTransactionLoading,
  } = useExchanger();

  return (
    <>
      {isTransactionLoading && (
        <TransactionLoading>
          <div className="spinner-large">
            <SmallSpinner />
          </div>
        </TransactionLoading>
      )}
      <Container>
        <div className="buttons-container no-wrap">
          <OptionButton
            active={userChoice === options.pool}
            onClick={() => setUserChoice(options.pool)}
          >
            Pool
          </OptionButton>
          <OptionButton
            active={userChoice !== options.pool}
            onClick={() => setUserChoice(options.flashLoan)}
          >
            Flash loan
          </OptionButton>
        </div>
        <div className="actions">
          <h5>Current mode: {userChoice}</h5>
          <h5>
            Balance rainbow tokens:{" "}
            {rainbowBalance ? formatUnits(rainbowBalance) : 0}
          </h5>

          <Input
            type="number"
            placeholder="Amount"
            min="0"
            step="10"
            value={amountTokens}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAmountTokens(e.target.value);
            }}
          />
          {account && userChoice === options.pool && <p>{errorMsg}</p>}
          {loading && <Loading />}
          {account && (
            <>
              {userChoice === options.flashLoan && (
                <div>
                  <ActionButton
                    onClick={() => handleFlashLoan(amountTokens)}
                    correct={!!isValidInput}
                  >
                    Borrow Tokens
                  </ActionButton>
                </div>
              )}
              {userChoice === options.pool && (
                <div className="buttons-container">
                  <div>
                    <ActionButton
                      onClick={() => handleDeposit(amountTokens)}
                      correct={allowDeposit}
                      disabled={!allowDeposit}
                    >
                      Deposit
                    </ActionButton>
                    <ActionButton
                      correct={approvalRequired}
                      disabled={!approvalRequired}
                      onClick={handleApprove}
                    >
                      Approve
                    </ActionButton>
                  </div>
                  <div>
                    <ActionButton
                      onClick={handleWithdraw}
                      correct={userHasLpTokens}
                      disabled={!userHasLpTokens}
                    >
                      Withdraw{" "}
                      {formatUnits(lpTokenBalance ? lpTokenBalance : "0")}
                    </ActionButton>
                    <ActionButton
                      correct={userHasLpTokens}
                      disabled={!userHasLpTokens}
                      onClick={handleCollectRewards}
                    >
                      Collect rewards
                    </ActionButton>
                  </div>
                </div>
              )}
            </>
          )}
          {!account && <p>Please connect to MetaMask</p>}
        </div>
      </Container>
    </>
  );
};

export default Exchanger;
