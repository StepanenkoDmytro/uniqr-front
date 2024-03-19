import { useEffect, useState } from 'preact/hooks';


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
					{img && <img className="uploaded-img my-2" src={img} />}
					{Array.from(Object.keys(form)).map((key) => (
						<p>
							{key !== 'image' && key !== 'name' && key !== 'qrAmount' &&
								<div key={key}><span className="bold">{ key }:</span> { form[key] }</div>
							}
						</p>
					))}
				<div><span className="bold">Количество qr-кодов:</span> { form.qrAmount }</div>
			</section>
	);
}
