import { useEffect, useState } from 'preact/hooks';
import { BackToTable, Loader } from '../components/index.js';
import apiService from '../services/ApiService.js';

import './SessionInfo.css';
import SessionComponent from '../components/SessionComponent/SessionComponent.jsx';

export default function SessionInfo(props) {

	const [sessionInfo, setSessionInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [qrList, setQrList] = useState([]);

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
		setQrList(qrsWithLinks);
	}

	const handlePrint = async () => {
		setIsLoading(true);

		const generateQRCodeAsync = async (qr, index) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					new QRCode(document.getElementById('code-' + index), {
						text: qr,
						width: 50,
						height: 50,
						colorDark: "#000000",
						colorLight: "#ffffff",
						correctLevel: QRCode.CorrectLevel.H
					});
					resolve();
				}, 0);
			});
		};

		// Define the batch size for generating QR codes
		const batchSize = 5;

		// Generate QR codes in batches asynchronously
		for (let i = 0; i < qrList.length; i += batchSize) {
			const batchPromises = [];

			for (let j = i; j < Math.min(i + batchSize, qrList.length); j++) {
				batchPromises.push(generateQRCodeAsync(qrList[j], j));
			}

			await Promise.all(batchPromises);
		}

		setIsLoading(false);
		window.print();
	}

	const renderLoading = () => {
		return (
		<div className="h-100 d-flex align-center">
			<Loader />
		</div>
		);
	}

	const renderInfo = () => {
		return (
			<section>
				<div className="d-flex justify-between">
					<BackToTable onClick={() => props.onBackToTable()} />
					<button className="session--print-qrs btn" onClick={handlePrint}>
						🖨 <span className="ms-2">Распечатать QR-коды</span>
					</button>
				</div>

				<SessionComponent sessionInfo={sessionInfo} />

			</section>
		);
	}

	return (
		<>
			{ isLoading || !sessionInfo ? renderLoading() : renderInfo() }
			<section id="printableArea">
				{qrList.map((qr, index) => <div id={'code-' + index} key={index}></div>)}
			</section>
		</>
	);
}
