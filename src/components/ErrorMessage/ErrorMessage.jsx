import error from '../../assets/img/error.gif'

const ErrorMessage = () => {
  return (
    <img
      src={error}
      alt='Fetching error'
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto'
      }}
    />
  )
}

export default ErrorMessage
