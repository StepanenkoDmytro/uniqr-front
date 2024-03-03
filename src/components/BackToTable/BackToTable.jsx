export default function BackToTable(props) {
	return (
		<button className="btn" onClick={() => props.onClick()}>← Вернуться к списку сессий</button>
	);
}
