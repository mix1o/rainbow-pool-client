export interface DepositAndWithdrawInterface {
  id: string;
  tokenAmount: string;
  poolAddress: string;
  poolDepositor: {
    id: string;
  };
}
export interface RewardInterface {
  id: string;
  reward: string;
  poolAddress: string;
}
