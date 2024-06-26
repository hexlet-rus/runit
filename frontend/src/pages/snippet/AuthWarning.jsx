import { useTranslation } from 'react-i18next';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

function AuthWarning() {
  const { t: tE } = useTranslation('translation', { keyPrefix: 'editor' });

  return (
    <Col className="toolbar">
      <Alert className="d-flex my-1" variant="primary">
        {tE('authAlert')}
      </Alert>
    </Col>
  );
}

export default AuthWarning;
