import BackToTable from '../components/BackToTable/BackToTable.jsx';


export default function SessionInfo(props) {
	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			<h1>Session Info Works</h1>
		</>
	);
}
