import './Loading.css';
import logo from './logo.svg';

export function Loading() {
	return (
		<div className='load'>
			<img src={logo} className='loading' alt='logo' />
			<span>loading...</span>
		</div>
	);
}
