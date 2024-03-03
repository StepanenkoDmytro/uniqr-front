import { useState } from 'preact/hooks';
import { BackToTable, ProductDescription, Stepper } from '../components/index.js';


export default function GenerateSession(props) {
	const steps = [
		{order: 1, title: 'Описание Товара', content: <ProductDescription />},
		{order: 2, title: 'Количество QR-кодов', content: <BackToTable />},
		{order: 3, title: 'Генерация QR-кодов', content: <BackToTable />},
	];

	const [formValue, setFormValue] = useState({});

	const handleConfirm = () => {
		console.log('=== CONFIRM', formValue);
	}

	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()}/>
			<Stepper steps={steps} onConfirm={handleConfirm}/>
		</>
	);
}
