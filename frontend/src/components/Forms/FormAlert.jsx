import Alert from 'react-bootstrap/Alert';

const variantMap = {
  failed: 'danger',
  success: 'primary',
};

function FormAlert({ state = 'failed', children, onClose = () => null }) {
  if (!children) {
    return null;
  }

  return (
    <Alert
      dismissible
      onClose={onClose}
      variant={variantMap[state] || 'failed'}
    >
      {children}
    </Alert>
  );
}

export default FormAlert;
