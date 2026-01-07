const Notification = ({ message, type = 'success' }) => {
  if (!message) return null
  return (
    <div className={`note ${type === 'error' ? 'error' : ''}`}>
      {message}
    </div>
  )
}

export default Notification