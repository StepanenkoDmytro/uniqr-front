import { useState } from 'preact/hooks';
import SessionSummary from '../components/GenerateSessionForm/SessionSummary/SessionSummary.jsx';
import { BackToTable, ProductDescription, AmountOfCodes, Stepper } from '../components/index.js';
import apiService from '../services/ApiService.js';


export default function GenerateSession(props) {
	const [formValue, setFormValue] = useState({});

	const steps = [
		{order: 1, title: 'Описание Товара', content: <ProductDescription onDescriptionChanged={(data) => updateForm(data)}/>},
		{order: 2, title: 'Количество QR-кодов', content: <AmountOfCodes onAmountChange={(data) => updateForm(data)} />},
		{order: 3, title: 'Генерация QR-кодов', content: <SessionSummary form={formValue}/>},
	];

	const handleConfirm = async () => {
		console.log('=== CONFIRM', formValue);
		try {
			const result = await apiService.generateSession(formValue);
			console.log('===', result);
		} catch (e) {
			console.error("Error while upload info: ", e);
		}
	}

	const updateForm = (data) => {
		setFormValue({...formValue, ...data});
	}

	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			<Stepper steps={steps} onConfirm={handleConfirm}/>
		</>
	);
}
