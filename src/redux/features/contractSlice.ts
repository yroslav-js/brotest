import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export type PriceType = { error: Error, result?: undefined, status: "failure" }
  | { error?: undefined, result: BigInt, status: "success" }
  | undefined

export interface ILotteryData {
  price: PriceType
  currentTickets: PriceType
  maxTicketsForWallet: PriceType
  maxTickets: PriceType
  currentId: PriceType
  endDate: PriceType
  minForClaim: PriceType
}

interface IUserContract {
  walletToRefferalReward: PriceType
  walletToCountRefferal: PriceType
  walletToRefferalRewardForClaim: PriceType
}

interface IInitialState {
  isModalOpen: boolean
  isConnectModalOpen: boolean
  contractData: ILotteryData
  userData: IUserContract
  refetch: boolean
}

export const contractItems: ILotteryData = {
  price: undefined,
  currentTickets: undefined,
  maxTicketsForWallet: undefined,
  currentId: undefined,
  endDate: undefined,
  maxTickets: undefined,
  minForClaim: undefined
}

export const contractUserItems: IUserContract = {
  walletToRefferalReward: undefined,
  walletToCountRefferal: undefined,
  walletToRefferalRewardForClaim: undefined
}

const initialState: IInitialState = {
  isModalOpen: false,
  isConnectModalOpen: false,
  contractData: {
    ...contractItems
  },
  userData: {
    walletToRefferalReward: undefined,
    walletToCountRefferal: undefined,
    walletToRefferalRewardForClaim: undefined
  },
  refetch: true
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<[boolean, 'participate' | 'connect']>) => {
      if (action.payload[0]) document.querySelector("body")?.classList.add("open")
      else document.querySelector("body")?.classList.remove("open")
      if (action.payload[1] === 'participate') state.isModalOpen = action.payload[0]
      else state.isConnectModalOpen = action.payload[0]
    },
    setContractData: (state, action: PayloadAction<ILotteryData>) => {
      state.contractData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload
    }
  }
})

export const {
  setIsModalOpen,
  setContractData,
  setUserData,
  setRefetch
} = contractSlice.actions

export default contractSlice.reducer