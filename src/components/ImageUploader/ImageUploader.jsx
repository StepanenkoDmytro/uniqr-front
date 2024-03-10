import { useState } from 'preact/hooks';
import './ImageUploader.css';


export default function ImageUploader({ onImageChanged }) {

	const [isDragging, setIsDragging] = useState(false);
	const [uploadedImg, setUploadedImg] = useState(null);
	const [isMouseEnter, setIsMouseEnter] = useState(false);

	const onDragEnter = () => {
		setIsDragging(true);
	};

	const onDragLeave = () => {
		setIsDragging(false);
	};

	const onDragOver = (event) => {
		event.preventDefault();
	};

	const onDrop = (event) => {
		event.preventDefault();
		setIsDragging(false);
		const file = event.dataTransfer.files[0];

		setImage(file);
	};

	const onClick = () => {
		const inputBtn = document.querySelector('#imgInput');
		inputBtn.click();
	}

	const onFileChange = (event) => {
		const file = event.target.files[0];

		setImage(file);
	};

	const setImage = (file) => {
		previewFile(file);
		onImageChanged(file);
	}

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setUploadedImg(reader.result);
		};
		reader.readAsDataURL(file);
	}

	const onMouseEnter = () => {
		setIsMouseEnter(true);
	}

	const onMouseLeave = () => {
		setIsMouseEnter(false);
	}

	return (
		<div>
			<form
				className="upload-form"
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
				style={{ borderStyle: isDragging ? 'dashed' : 'solid' }}
			>
				{uploadedImg && (
					<img
						className={`uploaded-img ${isMouseEnter || isDragging ? 'uploaded-img__hover' : ''}`}
						src={uploadedImg} alt="Preview"
					/>
				)}

				{(!uploadedImg || isMouseEnter || isDragging) && <div className="support-text">
					{isDragging ?
						<span>Отпустите изображение здесь ...</span> :
						<span>Перетащите изображение или кликните здесь для загрузки</span>
					}
				</div>}

				<input
					id="imgInput"
					type="file"
					onChange={onFileChange}
					style={{ display: 'none' }}
					accept="image/*"
				/>
			</form>
		</div>
	);
}
