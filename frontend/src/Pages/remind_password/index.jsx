import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { actions } from '../../slices';
import routes from '../../routes.js';

import RemindPasswordForm from 'src/components/Forms/RemindPasswordForm.jsx';

const RemindPasswordPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="page-bg-image">
      <Container fluid="sm" className="h-100">
        <Row className="justify-content-center align-items-center m-auto py-5 h-100">
          <Col className="max-w-sm">
            <div className="d-flex flex-column gap-3 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6">{t('remindPass.pageHeader')}</h1>
              <RemindPasswordForm
                onSuccess={() => {
                  dispatch(actions.openModal({ type: 'inDevelopment' }));
                }}
              />
              <hr />
              <div className="text-center">
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

export default RemindPasswordPage;
