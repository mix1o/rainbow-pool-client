import {
  ButtonData,
  ContainerButtons,
  ContainerHistory,
  Data,
  HistoryDetail,
  ContainerDetails,
} from "./HistoryStyled";
import { options } from "./historyOptions";
import { useEffect, useState } from "react";
import { convertAddress } from "../../functions/convertAddress";
import { getRewards, getWithdraws, getDeposits } from "../../api/history";
import {
  DepositAndWithdrawInterface,
  RewardInterface,
} from "./historyInterface";
import { Loading } from "../../animation/Spinner";
import { formatUnits } from "@ethersproject/units";

const History = () => {
  const [option, setOption] = useState(options.reward);

  const [deposits, setDeposits] = useState<DepositAndWithdrawInterface[]>([]);
  const [withdraws, setWithdraws] = useState<DepositAndWithdrawInterface[]>([]);
  const [rewards, setRewards] = useState<RewardInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async (option: string) => {
    setOption(option);

    if (option === options.deposit) {
      setLoading(true);
      const { data, loading } = await getDeposits();
      setLoading(loading);
      setDeposits(data.deposits);
      return;
    }
    if (option === options.withdraw) {
      setLoading(true);
      const { data, loading } = await getWithdraws();
      setWithdraws(data.withdraws);
      setLoading(loading);
      return;
    }
    if (option === options.reward) {
      setLoading(true);
      const { data, loading } = await getRewards();
      setRewards(data.poolHistories);
      setLoading(loading);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, loading } = await getRewards();
      setRewards(data.poolHistories);
      setLoading(loading);
    })();
  }, []);

  console.log(loading);
  return (
    <ContainerHistory>
      <ContainerButtons>
        <div>
          <ButtonData
            active={option === options.reward}
            onClick={() => {
              handleFetchData(options.reward);
            }}
          >
            Pool rewards
          </ButtonData>
        </div>
        <div>
          <ButtonData
            active={option === options.withdraw}
            onClick={() => {
              handleFetchData(options.withdraw);
            }}
          >
            Withdraws
          </ButtonData>
          <ButtonData
            active={option === options.deposit}
            onClick={() => {
              handleFetchData(options.deposit);
            }}
          >
            Deposits
          </ButtonData>
        </div>
      </ContainerButtons>
      <Data>
        <h3 className="heading">{option}</h3>
        <ContainerDetails>
          {loading && <Loading />}
          {!loading &&
            option === options.reward &&
            rewards.map(({ reward, poolAddress }, idx) => {
              return (
                <HistoryDetail key={idx}>
                  <p>Pool: {convertAddress(poolAddress)}</p>
                  <p>Reward: {formatUnits(reward)}</p>
                </HistoryDetail>
              );
            })}
          {!loading &&
            option === options.deposit &&
            deposits.map(({ tokenAmount, poolAddress, poolDepositor }, idx) => {
              return (
                <HistoryDetail key={idx}>
                  <p>User: {convertAddress(poolDepositor.id)} </p>
                  <p>Pool: {convertAddress(poolAddress)}</p>
                  <p>Amount: {formatUnits(tokenAmount)}</p>
                </HistoryDetail>
              );
            })}
          {!loading &&
            option === options.withdraw &&
            withdraws.map(
              ({ tokenAmount, poolAddress, poolDepositor }, idx) => {
                return (
                  <HistoryDetail key={idx}>
                    <p>User: {convertAddress(poolDepositor.id)} </p>
                    <p>Pool: {convertAddress(poolAddress)}</p>
                    <p>Amount: {formatUnits(tokenAmount)}</p>
                  </HistoryDetail>
                );
              }
            )}
        </ContainerDetails>
      </Data>
    </ContainerHistory>
  );
};

export default History;
