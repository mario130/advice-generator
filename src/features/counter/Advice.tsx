import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	fetchAdviceAsync,
	selectAdvice,
	selectId,
	selectStatus
} from './adviceSlice';
import AnimatedText from 'react-animated-text-content';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from 'react-loader-spinner'

export function Advice() {
	const dispatch = useAppDispatch();
	const advice = useAppSelector(selectAdvice);
	const id = useAppSelector(selectId);
	let status = useAppSelector(selectStatus);

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
		<div className='m-auto bg-secondary-light rounded-xl p-6 max-w-sm text-white flex flex-col justify-center items-center transition-all relative duration-500'>
			<div className='flex space-x-2 items-center'>
				<p className='uppercase tracking-widest text-primary text-xs font-semibold'>Advice #{id}</p>
			</div>
			<AnimatedText
				type="words" // animate words or chars
				animation={{
					x: '-50px',
					y: '200px',
					scale: 1.1,
					ease: 'ease-in-out',
				}}
				animationType="blocks"
				interval={0.01}
				duration={0.2}
				tag="p"
				className="animated-paragraph p-4 text-xl font-bold text-center leading-7"
				includeWhiteSpaces
				threshold={0.4}
				rootMargin="20%"
			>
				{advice}
			</AnimatedText>

			{/* br */}
			<img className='mb-6' src={`/images/pattern-divider-${isMobile ? 'mobile' : 'desktop'}.svg`} alt="" />
			<button
				className='bg-primary text-secondary font-bold p-4 rounded-full absolute -bottom-7 hover:bg-white transition-all duration-500'
				onClick={() => dispatch(fetchAdviceAsync())}
			>
				{status !== 'loading'
					? <img src="/images/icon-dice.svg" alt="" />
					: <Oval
						height="19"
						width="19"
						color='white'
						ariaLabel='loading'
						secondaryColor='#313a49'
					/>
				}
			</button>
		</div>
	);
}
