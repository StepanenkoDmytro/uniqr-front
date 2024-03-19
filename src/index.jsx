import { render } from 'preact';
import './style.css';
import { useEffect, useState } from 'preact/hooks';
import GenerateSession from './pages/GenerateSession.jsx';
import SessionInfo from './pages/SessionInfo.jsx';
import SessionsTable from './pages/SessionsTable.jsx';
import apiService from './services/ApiService';
import CheckQR from './pages/CheckQR';

export function App() {

	const PAGES = {
		SESSION_TABLE: 'session-table',
		SESSION_INFO: 'session-info',
		GENERATE_SESSION: 'generate-session',
		CHECK_QR: 'check-qr',
	};

	const [sessionData, setSessionData] = useState([]);
	const [activePage, setActivePage] = useState(PAGES.SESSION_TABLE);
	const [selectedSession, setSelectedSession] = useState(null);

	const PAGE_TO_COMPONENT = {
		[PAGES.SESSION_TABLE]: <SessionsTable sessionData={sessionData} onOpenInfo={(sessionId) => handleOnOpenInfo(sessionId)} onGenerateNewSessionClick={() => handleOnGenerateNewSessionClick()} />,
		[PAGES.SESSION_INFO]: <SessionInfo sessionId={selectedSession} onBackToTable={() => handleOnBackToTable()} />,
		[PAGES.GENERATE_SESSION]: <GenerateSession onBackToTable={() => handleOnBackToTable()} onSessionCreated={(session) => handleOnOpenInfo(session.id)} />,
		[PAGES.CHECK_QR]: <CheckQR />,
	};

	const handleOnOpenInfo = (sessionId) => {
		setSelectedSession(sessionId);
		setActivePage(PAGES.SESSION_INFO);
	}

	const handleOnBackToTable = () => {
		setActivePage(PAGES.SESSION_TABLE);
	}

	const handleOnGenerateNewSessionClick = () => {
		setActivePage(PAGES.GENERATE_SESSION);
	}

	useEffect(() => {
		if(window.location.pathname.includes('/qr-check')) {
			setActivePage(PAGES.CHECK_QR);
		} else {
		apiService.getSessions()
			.then(data => {
				setSessionData(data);
			})
			.catch(error => {
				console.error('Error fetching sessions:', error);
			});
		}
	}, []);

	return (
		<section className="wrapper">
			{PAGE_TO_COMPONENT[activePage]}
		</section>
	);
}

render(<App />, document.getElementById('app'));
