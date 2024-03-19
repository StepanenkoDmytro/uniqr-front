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

	return (
			<section className="d-flex justify-center">
				<div>
					<h1>Проверьте правильность данных для сессии {form.name || ''}:</h1>
					{img && <img className="uploaded-img my-2" src={img} />}
					{Object.entries(form).map(([key, value]) => (
						<p>
							{key !== 'image' && key !== 'name' &&
								<div key={key}><span className="bold">{ key }:</span> { value }</div>
							}
						</p>
					))}
				</div>
			</section>
	);
}
