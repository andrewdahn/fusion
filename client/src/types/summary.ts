interface summary {
  address: string;
  addressCount: string;
  balance: number;
  depositCount: number;
  outputAsset: string;
  rootAddress: string;
  source: string;
  status: string;
  totalFeesAmount: number;
  totalReceivedAmount: number;
  totalSentAmount: number;
  transferCount: number;
  withdrawalCount: number;
}

interface Summary {
  address: string;
  asset: string;
  summary: summary;
}

export default Summary;
