import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export interface ILottery {
  _id: string
  ended: boolean
  requestEnd: boolean
  currentId: number
  ticketsCount: number
  buyersCount: number
  startDate: number
  endDate: number
  __v: number
  endedTxHash: string
  timestampEnd?: number
}

export interface Buyer {
  _id: string
  address: string
  lotteries: string[]
  tickets: string[]
  __v: number
}

export interface ITickets {
  _id: string
  buyer: Buyer
  lottery: string
  ticketId: number
  txHash: string
  timestampTx: number
  win: boolean
  createdAt: string
  updatedAt: string
  __v: number,
  prize?: number
}

export interface IUserData {
  address: string
  username: string
  lotteries: IUserLotteries[]
  tickets: ITicketsUser[]
}

export interface IUserLotteries {
  _id: string
  endDate: number
  startDate: number
  buyersCount: number
  ticketsCount: number
  currentId: number
  requestEnd: boolean
  ended: boolean
  endedTxHash: string
  timestampEnd?: number
}

export interface ITicketsUser {
  buyer: string
  _id: string
  lottery: string
  ticketId: number
  txHash: string
  timestampTx: number
  win: boolean
  prize?: number
}

interface IInitialState {
  lottery: ILottery | null
  tickets: ITickets[] | []
  user: IUserData | null
  lastLotteries: {
    lottery: ILottery | null
    tickets: ITickets[] | []
  }[] | []
  chosenLottery: {
    lottery: ILottery | null
    tickets: ITickets[] | []
  }
  latestActivity: ITickets[] | []
  currentAmountUserTickets: number
  availableAmountTickets: number
}

export const getLottery = createAsyncThunk(
  'getLottery',
  async (id: number | string) => {
    try {
      console.log(process.env, 'env')

      const response = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/lottery/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/lottery/${+id - 1}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${+id - 1}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/lottery/${+id - 2}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${+id - 2}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/lottery/${+id - 3}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${+id - 3}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/last/tickets`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        })
      ])
      return response
    } catch (e) {
      console.log(e)
    }
  }
)

export const getChosenLottery = createAsyncThunk(
  'getChosenLottery',
  async (id: number | string) => {
    try {
      const response = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/lottery/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
        axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        }),
      ])
      return response
    } catch (e) {
      console.log(e)
    }
  }
)

export const getUserLotteries = createAsyncThunk(
  'getUserLotteries',
  async (address: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/user/${address}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)

export const getCurrentAmountUserTickets = createAsyncThunk(
  'getCurrentAmountUserTickets',
  async ({id, address}: { id: string | number, address: string }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_HOST}/api/ticket/${id}/${address}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)

const initialState: IInitialState = {
  lottery: null,
  tickets: [],
  user: null,
  lastLotteries: [],
  chosenLottery: {
    lottery: null,
    tickets: []
  },
  latestActivity: [],
  currentAmountUserTickets: 0,
  availableAmountTickets: 0
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setPurchasedTickets: (state, action) => {
      state.currentAmountUserTickets = action.payload
    },
    setCurrentAvailableAmountTickets: (state, action) => {
      state.availableAmountTickets = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLottery.fulfilled, (state, action) => {
      if (action.payload) {
        state.lottery = action.payload[0].data?.user
        state.tickets = action.payload[1].data?.tickets
        state.lastLotteries = [{
          lottery: action.payload[2].data?.user,
          tickets: action.payload[3].data?.tickets
        }, {
          lottery: action.payload[4].data?.user,
          tickets: action.payload[5].data?.tickets
        }, {
          lottery: action.payload[6].data?.user,
          tickets: action.payload[7].data?.tickets
        }]
        state.latestActivity = action.payload[8].data?.tickets
      }
    }).addCase(getUserLotteries.fulfilled, (state, action) => {
      if (action.payload && action.payload.user) state.user = action.payload?.user
    }).addCase(getChosenLottery.fulfilled, (state, action) => {
      if (action.payload) {
        state.chosenLottery.lottery = action.payload[0].data?.user
        // @ts-ignore
        state.chosenLottery.tickets = action.payload[1].data?.tickets?.map((_t: any, index: number) => action.payload[1].data.tickets[action.payload[1].data.tickets?.length - 1 - index])
      }
    }).addCase(getCurrentAmountUserTickets.fulfilled, (state, action) => {
      state.currentAmountUserTickets = action.payload?.tickets?.length
    })
  }
})

export const {setPurchasedTickets, setCurrentAvailableAmountTickets} = contractSlice.actions

export default contractSlice.reducer