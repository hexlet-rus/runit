import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Container';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { XCircle } from 'react-bootstrap-icons';

import { actions as modalActions } from '../../slices/modalSlice.js';

import UpdateAccountForm from 'src/components/Forms/UpdateAccountForm.jsx';
import ChangePasswordForm from 'src/components/Forms/ChangePasswordForm.jsx';
import AvatarChangeForm from 'src/components/Forms/AvatarChangeForm.jsx';

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemoveAccount = () => {
    dispatch(modalActions.openModal({ type: 'inDevelopment' }));
  };

  return (
    <div className="page-bg-image">
      <Container fluid="lg" className="h-100">
        <Row className="justify-content-center align-items-center h-100 py-5 m-auto py-5 h-100">
          <Col className="max-w-lg">
            <div className="d-flex flex-column gap-2 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6 mb-5">
                {t('profileSettings.pageHeader')}
              </h1>
              <div className="d-flex flex-column flex-md-row gap-5">
                <div className="flex-shrink-1">
                  <AvatarChangeForm />
                </div>
                <div className="w-100">
                  <Stack className="gap-2">
                    <UpdateAccountForm />
                    <hr className="border-secondary-subtle" />
                    <ChangePasswordForm />
                  </Stack>
                </div>
              </div>
              <div className="d-flex flex-column">
                <hr className="border-secondary-subtle" />
                <Button
                  variant="nofill-secondary"
                  size="sm"
                  className="ms-auto"
                  onClick={handleRemoveAccount}
                >
                  <XCircle className="bi" /> {t('profileActions.removeAccount')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SettingsPage;
