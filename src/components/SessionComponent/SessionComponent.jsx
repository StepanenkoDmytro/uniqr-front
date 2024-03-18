import { useEffect, useState } from 'preact/hooks';
import { Input } from '../index.js';

export default function SessionComponent(props) {
    const [description, setDescription] = useState([]);

    const parseDescription = (desc) => {
		const pairs = desc.split(";")
							.map(entry => entry.trim().split(": "))
							.filter(pair => pair.length === 2);

		setDescription(pairs);
	}

    useEffect(() => {
        parseDescription(props.sessionInfo.desc);
    }, [props]);

    return (
        <section class="session-info">
					<div class="session-info--img">
						<img src={props.sessionInfo.imageURL ? props.sessionInfo.imageURL : window.location.origin + '/default-product.jpg'} />
					</div>
					<div class="session-info--inner">
						<h2>Информация о продукте:</h2>
						<Input
							label={'Название'}
							placeholder={'Название сессии'}
							value={props.sessionInfo.name}
							type="text"
							id="session-name"
							readonly={true} />
						{description.map(([key, value], index) => (
							<section className="d-flex align-center w-100">
								<Input
									label={key}
									value={value}
									key={index}
									readonly={true} />
							</section>
						))}
					</div>
					
				</section>
    );
}