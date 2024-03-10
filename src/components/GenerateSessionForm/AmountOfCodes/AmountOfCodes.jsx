import { Input } from '../../index.js';


export default function AmountOfCodes({ onAmountChange }) {


	return (
		<>
			<div className="d-flex justify-center">
				<section>
					<h2>Сколько нужно сгенерировать QR-кодов?:</h2>
					<Input
						type={'number'}
						label={'Количество QR-кодов'}
						onInput={(amount) => onAmountChange({ 'qrAmount': amount })} />
				</section>
			</div>
		</>
	);
}
