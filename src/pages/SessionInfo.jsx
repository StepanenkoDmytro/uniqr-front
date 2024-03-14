import { useEffect, useState } from 'preact/hooks';
import { BackToTable, Loader } from '../components/index.js';
import apiService from '../services/ApiService.js';


export default function SessionInfo(props) {

	const [sessionInfo, setSessionInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchSessionInfo(props.sessionId);
	}, [props.sessionId]);

	const QRS = new Array(1000).fill('https://www.figma.com/file/ACZR7Xgw5d1UzsUDNgl1i0/QR-pegazzo?type=design&node-id=0-1&mode=design');

	const fetchSessionInfo = async (sessionId) => {
		// setIsLoading(true);
		// try {
		// 	const sessionInfo = await apiService.getSessionInfo(sessionId);
		// } catch (e) {
		// 	console.error(e);
		// }

		// setSessionInfo(sessionInfo);
		setSessionInfo({
			name: 'Mock',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG0wRVTbz7ZLwstcnKIlcF_QorDsx3E-Uy22UgCJCicA&s',

		});
		setIsLoading(false);
	}

	const handlePrint = () => {
		QRS.forEach((qr, index) => {
			new QRCode(document.getElementById('code-' + index), {
				text: qr,
				width: 100,
				height: 100,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			})
		});

		window.print();
	}

	return (
		<section>
			<div className="d-flex justify-between">
				<BackToTable onClick={() => props.onBackToTable()} />
				<button className="btn" onClick={handlePrint}>
					🖨 <span className="ms-2">Распечатать QR-коды</span>
				</button>
			</div>

			{isLoading || !sessionInfo
				? <Loader />
				: <>
					<h1>Session Info for session {props.sessionId} {sessionInfo.name}</h1>
					<img src={sessionInfo.image ? sessionInfo.image : window.location.origin + '/default-product.jpg'} />

				</>
			}
			<section id="printableArea">
				{QRS.map((qr, index) => <div id={'code-' + index} key={index}></div>)}
			</section>
		</section>
	);
}
