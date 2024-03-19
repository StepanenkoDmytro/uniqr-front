import { useState } from 'preact/hooks';
import SessionSummary from '../components/GenerateSessionForm/SessionSummary/SessionSummary.jsx';
import { BackToTable, ProductDescription, AmountOfCodes, Stepper, Error } from '../components/index.js';
import apiService from '../services/ApiService.js';


export default function GenerateSession(props) {
	const [formValue, setFormValue] = useState({});
	const [isError, setIsError] = useState(false);
	const [activeStep, setActiveStep] = useState(1);

	const steps = [
		{order: 1, title: 'Описание Товара', content: <ProductDescription onDescriptionChanged={(data) => updateForm(data)}/>},
		{order: 2, title: 'Количество QR-кодов', content: <AmountOfCodes onAmountChange={(data) => updateForm(data)} />},
		{order: 3, title: 'Генерация QR-кодов', content: <SessionSummary form={formValue}/>},
	];

	const handleConfirm = async () => {
		try {
			const result = await apiService.generateSession(formValue);
			props.onSessionCreated(result);
		} catch (e) {
			console.error("Error while upload info: ", e);
			setIsError(true);
		}
	}

	const handleOnRetry = () => {
		setActiveStep(1);
		setIsError(false);
	}

	const updateForm = (data) => {
		setFormValue({...formValue, ...data});
	}

	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			{isError
				? <Error onRetry={() => handleOnRetry()}/>
				: <Stepper steps={steps} activeStep={activeStep} onConfirm={handleConfirm}/>
			}
		</>
	);
}
