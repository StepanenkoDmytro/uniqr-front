import { useEffect, useState } from 'preact/hooks';
import { BackToTable, Loader, Input } from '../components/index.js';
import apiService from '../services/ApiService.js';

import './SessionInfo.css';
import SessionComponent from '../components/SessionComponent/SessionComponent.jsx';

export default function SessionInfo(props) {

	const [sessionInfo, setSessionInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [QRS, setQRS] = useState([]);

	useEffect(() => {
		fetchSessionInfo(props.sessionId);
	}, [props.sessionId]);

	const fetchSessionInfo = async (sessionId) => {
		setIsLoading(true);
		try {
			const sessionInfo = await apiService.getSessionInfo(sessionId);
			setSessionInfo(sessionInfo);
			
			generatedQRs(sessionInfo.qrs);
		} catch (e) {
			console.error(e);
		}

		setIsLoading(false);
	}

	const generatedQRs = (qrs) => {
		const qrsWithLinks = qrs.array.map(element => {
			const linkQR = sessionInfo.clientDomain + '/check-qr/' + element;
		});
		setQRS(qrsWithLinks);
			
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
				<button className="session--print-qrs btn" onClick={handlePrint}>
							🖨 <span className="ms-2">Распечатать QR-коды</span>
				</button>
			</div>

			{isLoading || !sessionInfo
				? <Loader />
				: <SessionComponent sessionInfo={sessionInfo} />
			}
			<section id="printableArea">
				{QRS.map((qr, index) => <div id={'code-' + index} key={index}></div>)}
			</section>
		</section>
	);
}
