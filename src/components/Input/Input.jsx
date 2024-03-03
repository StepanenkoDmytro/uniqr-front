import './Input.css';

export default function Input({value, type, label, placeholder, id, onInput}) {

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
					onInput={onInput}
				/>
			</div>
		</>
	);
}
