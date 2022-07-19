import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Advice } from './features/counter/Advice';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios.get('https://api.adviceslip.com/advice').then(res => {
			console.log(`FROM APP ${res.data.slip.advice}`);
		});
	}, [])
	
  return (
    <div className='App bg-secondary h-screen flex align-middle justify-center'>
			<Advice />
		</div>
  );
}

export default App;
