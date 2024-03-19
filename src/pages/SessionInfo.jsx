import { useEffect, useState } from 'preact/hooks';
import { BackToTable, Loader } from '../components/index.js';
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
			generatedQRs(sessionInfo);
		} catch (e) {
			console.error(e);
		}

		setIsLoading(false);
	}

	const generatedQRs = (session) => {
		const qrsWithLinks = session.qrs.map(element => session.clientDomain + '/qr-check/?qr_param=' + element);
		setQRS(qrsWithLinks);
	}

	const handlePrint = async () => {
		setIsLoading(true);

		const generateQRCodeAsync = async (qr, index) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					new QRCode(document.getElementById('code-' + index), {
						text: qr,
						width: 100,
						height: 100,
						colorDark: "#000000",
						colorLight: "#ffffff",
						correctLevel: QRCode.CorrectLevel.H
					});
					resolve();
				}, 0); 
			});
		};

		// Define the batch size for generating QR codes
		const batchSize = 10;

		// Generate QR codes in batches asynchronously
		for (let i = 0; i < QRS.length; i += batchSize) {
			const batchPromises = [];

			for (let j = i; j < Math.min(i + batchSize, QRS.length); j++) {
				batchPromises.push(generateQRCodeAsync(QRS[j], j));
			}

			await Promise.all(batchPromises);
		}

		window.print();
		setIsLoading(false);
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
