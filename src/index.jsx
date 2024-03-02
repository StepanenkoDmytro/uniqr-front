import { render } from 'preact';
import './style.css';
import { useState } from 'preact/hooks';
import GenerateSession from './pages/generate-session.jsx';
import SessionInfo from './pages/session-info.jsx';
import SessionsTable from './pages/sessions-table.jsx';

export function App() {
	const mock = [
		{id: 1, name: 'test', date: Date.now(), count: 4},
		{id: 2, name: 'second', date: Date.now(), count: 14},
		{id: 3, name: 'third', date: Date.now(), count: 343},
		{id: 4, name: 'fourth', date: Date.now(), count: 4123123},
	];
	const sessionData = mock;

	const PAGES = {
		SESSION_TABLE: 'session-table',
		SESSION_INFO: 'session-info',
		GENERATE_SESSION: 'generate-session',
	};

	const PAGE_TO_COMPONENT = {
		[PAGES.SESSION_TABLE]: <SessionsTable sessionData={sessionData} onOpenInfo={() => handleOnOpenInfo()} onGenerateNewSessionClick={() => handleOnGenerateNewSessionClick()}/>,
		[PAGES.SESSION_INFO]: <SessionInfo onBackToTable={() => handleOnBackToTable()} />,
		[PAGES.GENERATE_SESSION]: <GenerateSession onBackToTable={() => handleOnBackToTable()} />,
	};

	const [activePage, setActivePage] = useState(PAGES.SESSION_TABLE);

	const handleOnOpenInfo = (data) => {
		setActivePage(PAGES.SESSION_INFO);
	}

	const handleOnBackToTable = () => {
		setActivePage(PAGES.SESSION_TABLE);
	}

	const handleOnGenerateNewSessionClick = () => {
		setActivePage(PAGES.GENERATE_SESSION);
	}

	return (
		<section className="wrapper">
			{PAGE_TO_COMPONENT[activePage]}
		</section>
	);
}

render(<App />, document.getElementById('app'));
