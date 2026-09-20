interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  if (!message) {
    return null;
  }

  return <p style={{ color: 'red' }}>Error: {message}</p>;
};

export default Notification;
