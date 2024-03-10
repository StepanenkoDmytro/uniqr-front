import { useEffect, useState } from 'preact/hooks';
import { BackToTable, Loader } from '../components/index.js';
import apiService from '../services/ApiService.js';


export default function SessionInfo(props) {
	useEffect(() => {
		fetchSessionInfo(props.sessionId);
	}, [props.sessionId]);

	const [sessionInfo, setSessionInfo] = useState(null);

	const fetchSessionInfo = async (sessionId) => {
		const sessionInfo = await apiService.getSessionInfo(sessionId);
		setSessionInfo(sessionInfo);
	}

	return (
		<>
			<BackToTable onClick={() => props.onBackToTable()} />
			{!sessionInfo
				? <Loader />
				: <>
					<h1>Session Info for session {props.sessionId} {sessionInfo.name}</h1>
					<img src={sessionInfo.image ? sessionInfo.image : window.location.origin + '/default-product.jpg'} />
					<button className="btn">Распечатать QR-коды</button>
				</>
			}
		</>
	);
}
