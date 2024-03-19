

export default function Error(props) {

	return (
		<div className="d-flex w-100 h-100 column align-center justify-center">
			<div>При выполнении операции возникла ошибка.</div>
			<div>Попробуйте еще раз позже.</div>
			<button className="btn" onClick={() => props.onRetry()}>Повторить попытку</button>
		</div>
	)
}
