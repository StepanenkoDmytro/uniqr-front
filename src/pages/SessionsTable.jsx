export default function SessionsTable(props) {
	const handleRowClick = (data) => {
		props.onOpenInfo(data);
	}

	const handleGenerateClick = () => {
		props.onGenerateNewSessionClick();
	}

	return (
		<>
			<button className="btn" onClick={() => handleGenerateClick()}>+ Сгенерировать QR для продукта</button>
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
					props.sessionData.map(row => (
						<tr key={row.id} onClick={() => handleRowClick(row.id)}>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{new Date(row.date).toLocaleString()}</td>
							<td>{row.count}</td>
						</tr>)
					)
				}
				</tbody>
			</table>
		</>
	);
}
