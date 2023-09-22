import {configureStore} from '@reduxjs/toolkit'
import contractReducer from '@/redux/features/contractSlice'
import lotteryReducer from '@/redux/features/lotterySlice'

export const store = configureStore({
  reducer: {
    contractSlice: contractReducer,
    lotterySlice: lotteryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch