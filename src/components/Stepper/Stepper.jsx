import { useEffect, useState } from 'preact/hooks';
import './Stepper.css';

const Step = ({ children, isActive }) => (
	<div className={`step ${isActive ? 'active' : ''}`}>
		{isActive && <div className="step-content">{children}</div>}
	</div>
);

const Stepper = (props) => {
	const [activeStep, setActiveStep] = useState(props.activeStep);
	useEffect(() => {
		setActiveStep(props.activeStep);
	}, [props])

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
				{props.steps.map((step) => (
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
				{props.steps.map((step) => (
					<Step key={step.order} isActive={activeStep === step.order}>
						<section className="stepper-content">
							{step.content}
						</section>

						<div className="step-actions">
							{step.order > 1 && <button className="btn btn-danger" onClick={goBack}>Назад</button>}
							{(step.order < props.steps.length) && <button className="btn ms-2" onClick={goNext}>Далее</button>}
							{(step.order === props.steps.length) && <button className="btn ms-2" onClick={props.onConfirm}>Сгенерировать</button>}
						</div>
					</Step>
				))}
			</div>
		</>
	);
};

export default Stepper;
