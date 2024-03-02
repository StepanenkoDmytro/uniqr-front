import BackToTable from '../components/back-to-table.jsx';
import Stepper from '../components/Stepper/Stepper.jsx';


export default function GenerateSession(props) {
	const steps = [
		{order: 1, title: '1', cmp: <BackToTable />},
		{order: 2, title: '2', cmp: <BackToTable />},
		{order: 3, title: '3', cmp: <BackToTable />},
	];
	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			<h1>Generate Session Works!</h1>
			<Stepper steps={steps}/>
		</>
	);
}
