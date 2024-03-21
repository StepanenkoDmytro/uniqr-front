import { Loader } from '../components/index.js';


export default function SessionsTable(props) {
	const handleRowClick = (data) => {
		props.onOpenInfo(data);
	}

	const handleGenerateClick = () => {
		props.onGenerateNewSessionClick();
	}

	const renderTableData = () => {
		if (!props.sessionData?.length) {
			return (
				<tr><td colspan="4">У вас еще нет сессий. Нажмите кнопку "Сгенерировать QR"</td></tr>
			);
		}

		return (
			props.sessionData.map(row => (
				<tr key={row.id} onClick={() => handleRowClick(row.id)}>
					<td>{row.id}</td>
					<td>{row.name}</td>
					<td>{new Date(row.created).toLocaleString()}</td>
					<td>{row.amount}</td>
				</tr>)
			)
		);
	}

	return (
		<>
			<button className="btn" onClick={() => handleGenerateClick()}>
				+ Сгенерировать QR для продукта
			</button>
			<table className="table">
				<thead>
				<tr>
					<th>№</th>
					<th>Название</th>
					<th>Дата и время</th>
					<th>Количество QR кодов</th>
				</tr>
				</thead>
				<tbody>
				{
					props.isLoading
						? <tr><td colSpan="4"><Loader /></td></tr>
						: renderTableData()
				}
				</tbody>
			</table>
		</>
	);
}
