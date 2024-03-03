import { useState } from 'preact/hooks';
import './Stepper.css';

const Step = ({ children, isActive }) => (
	<div className={`step ${isActive ? 'active' : ''}`}>
		{isActive && <div className="step-content">{children}</div>}
	</div>
);

const Stepper = ({ steps, onConfirm }) => {
	const [activeStep, setActiveStep] = useState(1);
	const totalSteps = 3;

	const goNext = () => {
		if (activeStep < totalSteps) {
			setActiveStep(activeStep + 1);
		}
	};

	const goBack = () => {
		if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};

	const handleGoToStep = (step) => {
		setActiveStep(step);
	}


	return (
		<>
			<div className="stepper-header">
				{steps.map((step) => (
					<div
						className={`step-header ${activeStep === step.order ? 'active' : ''}`}
						onClick={() => handleGoToStep(step.order)}
					>
						<span className="step-number">{step.order}</span>
						<span className="step-title">{step.title}</span>
					</div>
				))}
			</div>

			<div className="stepper-container">
				{steps.map((step) => (
					<Step key={step.order} isActive={activeStep === step.order}>
						<section className="stepper-content">
							{step.content}
						</section>

						<div className="step-actions">
							{step.order > 1 && <button onClick={goBack}>Назад</button>}
							{(step.order < steps.length) && <button onClick={goNext}>Далее</button>}
							{(step.order === steps.length) && <button onClick={onConfirm}>Сгенерировать</button>}
						</div>
					</Step>
				))}
			</div>
		</>
	);
};

export default Stepper;
