import './Button.css';

export function Button({ type, onClick, buttonText, disabled }) {
	return (
		<button type={type} className='btn' onClick={onClick} disabled={disabled}>
			{buttonText}
		</button>
	);
}
