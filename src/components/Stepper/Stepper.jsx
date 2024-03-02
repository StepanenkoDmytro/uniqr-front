import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './Stepper.css'; // Assume you have a CSS file for styling

const Step = ({ stepNumber, title, children, isActive }) => (
	<div className={`step ${isActive ? 'active' : ''}`}>
		<div className="step-header">
			<span className="step-number">{stepNumber}</span>
			<span className="step-title">{title}</span>
		</div>
		{isActive && <div className="step-content">{children}</div>}
	</div>
);

const Stepper = ({ steps }) => {
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

	const confirm = () => {};

	return (
		<>
			<div className="stepper-container">
				{steps.map((step) => (
					<Step key={step.order} stepNumber={step.order} title={step.title} isActive={activeStep === step.order}>
						{step.cmp}
						{/*<input type="text" placeholder="Name*" />*/}
						{step.order > 1 ? <button onClick={goBack}>Back</button> : <></>}
						{step.order < steps.length ? <button onClick={goNext}>Next</button> : <></>}
						{step.order === steps.length ? <button onClick={confirm}>Confirm</button> : <></>}
					</Step>
				))}
			</div>
		</>
	);
};

export default Stepper;
