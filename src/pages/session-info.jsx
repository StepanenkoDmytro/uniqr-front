import BackToTable from '../components/back-to-table.jsx';


export default function SessionInfo(props) {
	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			<h1>Session Info Works</h1>
		</>
	);
}
