import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';

import routes from '../../routes.js';

const ADMIN_LINK = new URL(routes.adminPanelPath(), window.location.origin);

if (process.env.NODE_ENV !== 'production') {
  ADMIN_LINK.port = '5001';
}
function AdminPanelButton() {
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });
  return (
    <Nav.Item as="li">
      <Button as="a" href={ADMIN_LINK.toString()} variant="primary">
        {tPA('adminPanel')}
      </Button>
    </Nav.Item>
  );
}

export default AdminPanelButton;
