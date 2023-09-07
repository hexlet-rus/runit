import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import routes from '../../routes.js';

import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="page-bg-image">
      <Container className="h-100" fluid="sm">
        <Row className="justify-content-center align-items-center m-auto py-3 py-sm-5 h-100">
          <Col className="max-w-sm p-0">
            <div className="d-flex flex-column gap-sm-3 gap-4 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6">{t('resetPass.pageHeader')}</h1>
              <ResetPasswordForm
                onSuccess={() => {
                  navigate(routes.myProfilePagePath());
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetPasswordPage;
