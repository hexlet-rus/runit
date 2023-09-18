import { useEffect, useState } from 'react';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import routes from '../../routes.js';

import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import NotFoundPage from '../404';

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hash } = useParams();
  const [hasHash, setHashState] = useState(false);

  useEffect(() => {
    const checkHash = async () => {
      const { data } = await axios.get(`${routes.resetPassPath()}/${hash}`);
      return data.id ? setHashState(true) : setHashState(false);
    };
    checkHash();
  }, [hasHash, hash]);

  return hasHash ? (
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
  ) : (
    <NotFoundPage />
  );
}

export default ResetPasswordPage;
