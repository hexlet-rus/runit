import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { XCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { actions as modalActions } from '../../slices/modalSlice';

import AvatarChangeForm from '../../components/Forms/AvatarChangeForm';
import ChangePasswordForm from '../../components/Forms/ChangePasswordForm';
import UpdateAccountForm from '../../components/Forms/UpdateAccountForm';
import ApperearanceForm from '../../components/Forms/AppearanceForm';

function SettingsPage() {
  const { t: tPS } = useTranslation('translation', {
    keyPrefix: 'profileSettings',
  });
  const dispatch = useDispatch();

  const handleRemoveAccount = () => {
    dispatch(modalActions.openModal({ type: 'removeAccount' }));
  };

  return (
    <div className="page-bg-image">
      <Container className="h-100" fluid="lg">
        <Row className="justify-content-center align-items-center h-100 py-5 m-auto py-5 h-100">
          <Col className="max-w-lg">
            <div className="d-flex flex-column gap-2 bg-body rounded-4 p-4 p-sm-5">
              <h1 className="display-6 mb-5">{tPS('pageHeader')}</h1>
              <div className="d-flex flex-column flex-md-row gap-5">
                <div className="flex-shrink-1">
                  <AvatarChangeForm />
                </div>
                <div className="w-100">
                  <Stack className="gap-2">
                    <UpdateAccountForm />
                    <hr className="border-secondary-subtle" />
                    <ChangePasswordForm />
                    <hr className="border-secondary-subtle" />
                    <ApperearanceForm />
                  </Stack>
                </div>
              </div>
              <div className="d-flex flex-column">
                <hr className="border-secondary-subtle" />
                <Button
                  className="ms-auto"
                  onClick={handleRemoveAccount}
                  size="sm"
                  variant="nofill-secondary"
                >
                  <XCircle className="bi" /> {tPS('removeAccount')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SettingsPage;
