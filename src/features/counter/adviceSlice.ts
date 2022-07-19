import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AdviceState {
	advice: string;
	id: number;
	status: 'idle' | 'loading' | 'failed';
}

export interface AdviceResponse {
	slip: {
		advice: string;
		id: number;
	}
}

const initialState: AdviceState = {
	advice: '',
	id: 0,
	status: 'idle',
};

export const fetchAdviceAsync = createAsyncThunk(
	'advice/fetchAdvice',
	async () => {
		return await fetch(`https://api.adviceslip.com/advice`).then(res => {
			return res.json() as Promise<AdviceResponse>;
		})
	}
);

export const adviceSlice = createSlice({
	name: 'advice',
	initialState,
	reducers: {
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(fetchAdviceAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAdviceAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.advice = action.payload.slip.advice;
				state.id = action.payload.slip.id
			})
			.addCase(fetchAdviceAsync.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

// The function below is called a selector and allows us to select a advice from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.advice)`
export const selectCount = (state: RootState) => state.advice.advice;
export const selectId = (state: RootState) => state.advice.id;

export default adviceSlice.reducer;
