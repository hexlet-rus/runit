import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import routes from '../../routes.js';

import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';

function ForgotPasswordPage() {
  const { t } = useTranslation();

  return (
    <div className="page-bg-image">
      <Container className="h-100" fluid="sm">
        <Row className="justify-content-center align-items-center m-auto py-3 py-sm-5 h-100">
          <Col className="max-w-sm p-0">
            <div className="d-flex flex-column gap-sm-3 gap-4 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6">{t('forgotPass.pageHeader')}</h1>
              <ForgotPasswordForm />
              <hr />
              <div className="small">
                <span className="text-body-secondary">
                  {t('signIn.footer.signUpHeader')}
                </span>{' '}
                <Link to={routes.signUpPagePath()}>
                  {t('signIn.footer.signUpAction')}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;
