import { FC, useState } from "react";
import { formatUnits } from "@ethersproject/units";
import { useRainbowToken } from "../../hooks/contracts/useRainbowToken";
import {
  HeaderButton,
  DetailsContainer,
  HeaderContainer,
  Heading,
} from "./HeaderStyled";
import { TransactionLoading, SmallSpinner } from "../../animation/Spinner";
import { useUserBalance } from "../../context/UserBalance";
import { useTypedWeb3React } from "../../hooks/useTypedWeb3React";
import { useConnection } from "../../hooks/useConnection";
import { useMetaMask } from "../../connectors/MetaMask";

const Header: FC = ({ children }) => {
  const { account, active, chainId } = useTypedWeb3React();

  useConnection();

  const { connectMetaMask } = useMetaMask();
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const { ethBalance } = useUserBalance();

  const rainbowToken = useRainbowToken();

  const convertAddress = () => {
    return `${account?.substring(0, 5)}...${account?.substring(
      account.length - 4,
      account.length
    )}`;
  };

  const handleAddTokens = async () => {
    if (!rainbowToken) return;
    setIsTransactionLoading(true);
    const tx = await rainbowToken.addTokens();
    await tx.wait();
    setIsTransactionLoading(false);
  };

  return (
    <>
      {isTransactionLoading && (
        <TransactionLoading>
          <div className="spinner-large">
            <SmallSpinner />
          </div>
        </TransactionLoading>
      )}

      <HeaderContainer>
        <div>
          <Heading>Rainbow</Heading>
          {children}
        </div>
        {active && (
          <DetailsContainer>
            <p>
              <span>Connected:</span> {convertAddress()}
            </p>
            <p>
              <span>Balance:</span> {formatUnits(ethBalance ? ethBalance : "0")}{" "}
              ETH
            </p>
          </DetailsContainer>
        )}
        <div>
          <HeaderButton
            background
            onClick={() => {
              if (!active) connectMetaMask();
            }}
          >
            {active && chainId === 4 ? "Rinkeby" : "Connect to MetaMask"}
          </HeaderButton>
          {active && (
            <HeaderButton onClick={handleAddTokens}>
              Get some rainbows
            </HeaderButton>
          )}
        </div>
      </HeaderContainer>
    </>
  );
};

export default Header;
