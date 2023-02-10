import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

const NotFoundPage = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		if (window.history.state && window.history.state.idx > 0) {
			navigate(-1)
		} else {
			navigate('/', { replace: true })
		}
	}

	return (
		<div>
			<ErrorMessage />
			<p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
				Page doesn't exist
			</p>
			<button
				onClick={handleClick}
				style={{
					display: 'block',
					margin: '0 auto',
					border: 'none',
					cursor: 'pointer',
					backgroundColor: 'transparent',
					fontWeight: 'bold',
					fontSize: '24px',
					marginTop: '30px'
				}}
			>
				Back to previous page
			</button>
		</div>
	)
}

export default NotFoundPage
