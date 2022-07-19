import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	fetchAdviceAsync,
	selectAdvice,
	selectId
} from './adviceSlice';
import AnimatedText from 'react-animated-text-content';

export function Advice() {
	const dispatch = useAppDispatch();
	const advice = useAppSelector(selectAdvice);
	const id = useAppSelector(selectId);

	useEffect(() => {
		dispatch(fetchAdviceAsync());
	}
		, []);

	const [width, setWidth] = useState<number>(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);
	const isMobile = width <= 768;

	return (
		<div className='m-auto bg-secondary-light rounded-xl p-6 max-w-sm text-white flex flex-col justify-center items-center transition-all relative'>
			<p className='uppercase tracking-widest text-primary text-xs font-semibold'>Advice #{id}</p>
			<AnimatedText
				type="words" // animate words or chars
				animation={{
					x: '-50px',
					y: '200px',
					scale: 1.1,
					ease: 'ease-in-out',
				}}
				animationType="blocks"
				interval={0.04}
				duration={0.3}
				tag="p"
				className="animated-paragraph p-4 text-xl font-bold text-center leading-7"
				includeWhiteSpaces
				threshold={0.1}
				rootMargin="20%"
			>
				{advice}
			</AnimatedText>
			{/* <p className='p-4 text-xl font-bold text-center leading-7'>
				{advice}
			</p> */}
			{/* <div className='bg-gray-600 h-px w-full mb-4'></div> */}
			<img className='mb-6' src={`/images/pattern-divider-${isMobile ? 'mobile' : 'desktop'}.svg`} alt="" />
			<button
				className='bg-primary text-secondary font-bold p-4 rounded-full absolute -bottom-7 hover:bg-white transition-all duration-500'
				onClick={() => dispatch(fetchAdviceAsync())}
			>
				<img src="/images/icon-dice.svg" alt="" />
			</button>
		</div>
	);
}
