
import './ProductDescription.css';
import { useEffect, useState } from 'preact/hooks';
import { ImageUploader, Input } from '../../index.js';


export default function ProductDescription(props) {

	const [isAddingField, setIsAddingField] = useState(false);
	const [additionalFields, setAdditionalFields] = useState([]);
	const [isNeedToFocus, setIsNeedToFocus] = useState(false);

	useEffect(() => {
		isNeedToFocus && focusLastAdditionalField();
	}, [isNeedToFocus])

	const handleAddNewField = () => {
		const inputEl = document.querySelector('#new_field');
		setAdditionalFields([...additionalFields, inputEl.value]);
		setIsNeedToFocus(true);
		setIsAddingField(false);
	}

	const handleDeleteField = (field) => {
		setAdditionalFields(additionalFields.filter(f => f !== field));
	}

	const handleImageChanged = (img) => {
		const data = {'image': img};
		props.onDescriptionChanged(data);
	}

	const handleAdditionalFieldInput = (data, field) => {
		const obj = {};
		obj[field] = data;
		props.onDescriptionChanged(obj);
	}

	const focusLastAdditionalField = () => {
		if (!additionalFields?.length) {
			return;
		}

		const id = additionalFields[additionalFields.length - 1];
		const inputEl = document.getElementById(id);
		if (!inputEl) {
			return;
		}

		inputEl.focus();
	}

	return (
		<div className="product-description">
			<ImageUploader onImageChanged={handleImageChanged}/>
			<section className="product-description--fields">
				<h2>Заполните информацию о продукте:</h2>
				<Input
					label={'Название'}
					placeholder={'Введите название сессии'}
					onInput={(data) => props.onDescriptionChanged({ 'name': data })} />
				{additionalFields.map((field, index) => (
					<section className="d-flex align-center w-100">
						<Input
							id={field}
							key={index}
							label={field}
							onInput={(data) => handleAdditionalFieldInput(data, field)} />
						<button className="btn btn-danger ms-2" onClick={() => handleDeleteField(field)}>Удалить</button>
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
