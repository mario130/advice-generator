import counterReducer, {
	adviceSlice,
  AdviceState,
	fetchAdviceAsync
} from './adviceSlice';

import { render, screen } from '@testing-library/react';
import {Advice} from './Advice'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('advice reducer', () => {
	const mockStore = configureStore();
  const initialState: AdviceState = {
		id: 0,
		advice: '',
		status: 'idle'
	};
	let store;

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
			id: 0,
			advice: '',
      status: 'idle',
    });
  });

  // it('should handle fetch advice', () => {
	// 	store = mockStore(initialState);
	// 	const actual = adviceSlice.reducer(initialState, fetchAdviceAsync());
	// 	expect(actual.advice).not.toEqual('');

	// 	expect(screen.getByRole('button')).toBeInTheDocument();
  // });
});
