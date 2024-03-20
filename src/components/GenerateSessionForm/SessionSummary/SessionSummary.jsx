import { useEffect, useState } from 'preact/hooks';
import SessionComponent from '../../SessionComponent/SessionComponent';


export default function SessionSummary({ form }) {

	const [img, setImg] = useState(null);

	useEffect(() => {
		previewFile(form.image);
	}, [form.image]);

	const previewFile = (file) => {
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImg(reader.result);
		};
		reader.readAsDataURL(file);
	}

	console.log('=== form', form)

	return (
			<section className="d-flex column align-center justify-center">
					<h1>Проверьте правильность данных для сессии {form.name || ''}:</h1>
					{img && <SessionComponent sessionInfo={{...form, imageURL: img}}/>}
				<div><span className="bold">Количество qr-кодов:</span> { form.qrAmount }</div>
			</section>
	);
}
