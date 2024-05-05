import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLeaderboard } from '../../services/leaderboard-service'

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async ({ page, pageSize }) => {
    const response = await getLeaderboard(page, pageSize)
    return response
  },
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: { entries: [], loading: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entries = action.payload
      })
  },
})

export default leaderboardSlice.reducer
