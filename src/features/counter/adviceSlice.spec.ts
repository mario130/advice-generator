import counterReducer, {
	adviceSlice,
  AdviceState,
	fetchAdviceAsync
} from './adviceSlice';

import { render } from '@testing-library/react';
import {Advice} from './Advice'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {useAppDispatch} from '../../app/hooks'


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

	// it('should handle fetchAdviceAsync', () => {
	// 	const actual = adviceSlice.reducer(initialState, fetchAdviceAsync());

	// })

  // it('should handle fetch advice', () => {
	// 	store = mockStore(initialState);
	// 	render(
	// 		<Provider store={store}>
	// 			<Advice />
	// 		</Provider>
	// 	);

  //   const actual = counterReducer(initialState, fetchAdviceAsync());
  //   expect(actual.value).toEqual(5);
  // });
});
