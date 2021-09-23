const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  if (error === null) {
    return null;
  }

  return (
    <div className={error ? 'error' : 'notification'}>
      {error ? error : message}
    </div>
  );
};

export default Notification;
