
import './ProductDescription.css';
import { useEffect, useState } from 'preact/hooks';
import { ImageUploader, Input } from '../../index.js';


export default function ProductDescription(props) {

	const [isAddingField, setIsAddingField] = useState(false);
	const [additionalFields, setAdditionalFields] = useState([]);
	const [isNeedToFocus, setIsNeedToFocus] = useState(false);
	const [name, setName] = useState('');
	const [image, setImage] = useState(null);

	useEffect(() => {
		isNeedToFocus && focusLastAdditionalField();
	}, [isNeedToFocus]);

	useEffect(() => {
		updateFormData();
	}, [props.form])

	const updateFormData = () => {
		const {name, image, qrAmount, ...fields} = props.form;
		name && setName(name);
		image && setImage(image);
		fields && setAdditionalFields(Array.from(Object.keys(fields)).map(key => ({key, value: fields[key]})));
	}

	const handleAddNewField = () => {
		const inputEl = document.querySelector('#new_field');
		handleAdditionalFieldInput('', inputEl.value);
		setIsNeedToFocus(true);
		setIsAddingField(false);
	}

	const handleImageChanged = (img) => {
		const data = {'image': img};
		props.onDescriptionChanged(data);
	}

	const handleAdditionalFieldInput = (data, fieldLabel) => {
		const obj = {};
		obj[fieldLabel] = data;
		props.onDescriptionChanged(obj);
	}

	const focusLastAdditionalField = () => {
		if (!additionalFields?.length) {
			return;
		}

		const id = additionalFields[additionalFields.length - 1].key;
		const inputEl = document.getElementById(id);
		if (!inputEl) {
			return;
		}

		inputEl.focus();
	}

	return (
		<div className="product-description">
			<ImageUploader image={image} onImageChanged={handleImageChanged}/>
			<section className="product-description--fields">
				<h2>Заполните информацию о продукте:</h2>
				<Input
					label={'Название'}
					value={name}
					placeholder={'Введите название сессии'}
					onInput={(data) => props.onDescriptionChanged({ 'name': data })} />
				{additionalFields.map((field, index) => (
					<section className="d-flex align-center w-100">
						<Input
							id={field.key}
							key={index}
							label={field.key}
							value={field.value}
							onInput={(data) => handleAdditionalFieldInput(data, field.key)} />
						<button className="btn btn-danger ms-2" onClick={() => props.onRemoveField(field.key)}>Удалить</button>
					</section>
				))}
				{!isAddingField && <button className="btn w-100" onClick={() => setIsAddingField(true)}>+ Добавить поле</button>}
				{isAddingField && <div className="product-description--new-field">
					<Input id={'new_field'} label={'Название нового поля'} placeholder={'Введите название нового поля'} />
					<button className="btn ms-2" onClick={handleAddNewField}>Добавить</button>
					<button className="btn btn-danger ms-2" onClick={() => setIsAddingField(false)}>Отмена</button>
				</div>}
			</section>
		</div>
	);
}
