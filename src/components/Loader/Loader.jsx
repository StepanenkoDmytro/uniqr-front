import './Loader.css'

export default function Loader(props) {

	return (
		<>
			<div className="loader-outlet">
				<div className="dynamic-indicator"></div>
				<div className="loader-text">Подождите, идет загрузка...</div>
			</div>
		</>
	);
}
