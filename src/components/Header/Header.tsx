import { FC, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { formatUnits } from "@ethersproject/units";
import { Web3Provider } from "@ethersproject/providers";
import { useRainbowToken } from "../../hooks/contracts/useRainbowToken";
import {
  HeaderButton,
  DetailsContainer,
  HeaderContainer,
  Heading,
} from "./HeaderStyled";
import { TransactionLoading, SmallSpinner } from "../../animation/Spinner";
import { useBalance } from "../../context/UserBalance";

const MetaMask = new InjectedConnector({ supportedChainIds: [1, 4] });

const Header: FC = ({ children }) => {
  const { connector, account, activate, active, chainId } =
    useWeb3React<Web3Provider>();

  const [activatingConnector, setActivatingConnector] = useState();

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const { ethBalance } = useBalance();

  const rainbowToken = useRainbowToken();

  useEffect(() => {
    if (activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect(MetaMask);
  useInactiveListener(!triedEager || !activatingConnector, MetaMask);

  const connectMetaMask = () => {
    activate(MetaMask);
  };

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
              <span>Balance:</span>{" "}
              {formatUnits(ethBalance ? ethBalance : "0", 18)} ETH
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
