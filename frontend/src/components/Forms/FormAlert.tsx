import { ReactElement, ReactNode } from 'react';
import Alert from 'react-bootstrap/Alert';

const variantMap = {
  failed: 'danger',
  success: 'primary',
};

interface IFormAlert {
  state?: 'failed' | 'success' | 'initial';
  children?: ReactNode;
  onClose: () => void;
}

function FormAlert({
  state,
  children,
  onClose = () => null,
}: IFormAlert): ReactElement | null {
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

FormAlert.defaultProps = {
  state: 'failed',
  children: null,
};

export default FormAlert;
