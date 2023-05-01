import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../../types/ticket';

type TicketsState = {
  tickets: Ticket[];
  isLoading: boolean;
  stop: boolean;
  errorCount: number;
  visibleTickets: number;
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, rejectWithValue }) => {
  const state = (getState() as RootState).tickets;

  if (state.errorCount >= 5) {
    throw new Error('Too many errors!');
  }
  try {
    const searchId = sessionStorage.getItem('id');
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    const { tickets, stop } = await response.json();
    return { tickets, stop };
  } catch (error) {
    error instanceof Error ? rejectWithValue(error.message) : rejectWithValue('Unknown error');
  }
});

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    isLoading: false,
    stop: false,
    errorCount: 0,
    visibleTickets: 5,
  } as TicketsState,
  reducers: {
    showMore(state) {
      state.visibleTickets = state.visibleTickets += 5;
    },
    sortByOptimal(state) {
      state.tickets = state.tickets.sort((a, b) => {
        const aDuration = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
        const bDuration = b.segments.reduce((acc, segment) => acc + segment.duration, 0);
        return aDuration - bDuration;
      });
    },
    sortByFastest(state) {
      state.tickets = state.tickets.sort((a, b) => {
        const aDuration = Math.min(...a.segments.map((segment) => segment.duration));
        const bDuration = Math.min(...b.segments.map((segment) => segment.duration));
        return aDuration - bDuration;
      });
    },
    sortByCheapest(state) {
      state.tickets = state.tickets.sort((a, b) => a.price - b.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const tickets = action.payload?.tickets || [];
        const stop = action.payload?.stop || false;
        state.tickets = [...state.tickets, ...tickets];
        state.stop = stop;
        if (state.stop) {
          state.isLoading = false;
        }
        state.errorCount = 0;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.isLoading = false;
        state.errorCount++;
      });
  },
});

export const { showMore, sortByCheapest, sortByFastest, sortByOptimal } = ticketSlice.actions;
export default ticketSlice.reducer;

type RootState = {
  tickets: TicketsState;
};
