import { useTranslation } from 'react-i18next';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

function AuthWarning() {
  const { t } = useTranslation();
  return (
    <Col className="toolbar">
      <Alert className="d-flex my-1" variant="primary">
        {t('editor.authAlert')}
      </Alert>
    </Col>
  );
}

export default AuthWarning;
