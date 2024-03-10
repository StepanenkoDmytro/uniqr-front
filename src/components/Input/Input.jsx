import './Input.css';

export default function Input({value, type, label, placeholder, id, onInput, readonly}) {

	return (
		<>
			<div className="input-wrapper">
				{label && <div className="input-label">{label}</div>}
				<input
					id={id}
					className="input-element"
					type={type || 'text'}
					value={value}
					placeholder={placeholder}
					readOnly={readonly || false}
					onInput={(event) => onInput && onInput(event.target?.value)}
				/>
			</div>
		</>
	);
}
