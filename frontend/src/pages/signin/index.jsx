import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import SignInForm from '../../components/Forms/SignInForm.jsx';
import routes from '../../routes.js';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="page-bg-image">
      <Container fluid="sm" className="h-100">
        <Row className="justify-content-center align-items-center m-auto py-3 py-sm-5 h-100">
          <Col className="max-w-sm p-0">
            <div className="d-flex flex-column gap-sm-3 gap-4 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6">{t('signIn.pageHeader')}</h1>
              <SignInForm
                onSuccess={() => {
                  navigate(routes.myProfilePagePath());
                }}
              />
              <hr />
              <div className="small">
                <span className="text-muted">
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
};

export default SignUp;
