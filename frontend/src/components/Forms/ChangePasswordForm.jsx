import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import routes from '../../routes';
import { password, required } from '../../utils/validationSchemas';
import PasswordVisibilityButton from './PasswordVisibilityButton.jsx';
import FormAlert from './FormAlert.jsx';

function ChangePasswordForm() {
  const { t: tPS } = useTranslation('translation', {
    keyPrefix: 'profileSettings',
  });
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);
  const [isCurrentPasswordVisible, setCurrentPasswordVisibility] =
    useState(false);
  const [isNewPasswordVisible, setNewPasswordVisibility] = useState(false);

  const handleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisibility(!isCurrentPasswordVisible);
  };

  const handleNewPasswordVisibility = () => {
    setNewPasswordVisibility(!isNewPasswordVisible);
  };

  const validationSchema = object().shape({
    currentPassword: required(),
    newPassword: password(),
  });

  const initialValues = {
    currentPassword: '',
    newPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, target) => {
      setFormState(initialFormState);
      try {
        await axios.put(routes.updateUserPath(userInfo.id), {
          id: userInfo.id,
          currPassword: values.currentPassword,
          password: values.newPassword,
        });
        /* TODO: Add a user notification about password change */
        setFormState({
          state: 'success',
          message: 'profileSettings.updateSuccessful',
        });
        formik.resetForm();
      } catch (err) {
        if (!err.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        }
        if (err.response?.status === 400) {
          target.setFieldError(
            'currentPassword',
            'errors.validation.wrongPassword',
          );
        } else {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
        }
        throw err;
      }
    },
  });

  return (
    <Form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
      <h5>{tPS('changePassword')}</h5>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form.Group controlId="current-passowrd">
        <Form.Label>{tPS('currentPassword')}</Form.Label>
        <div className="input-group-inline-button">
          <Form.Control
            ref={inputRef}
            autoComplete="current-password"
            isInvalid={
              !!formik.touched.currentPassword &&
              !!formik.errors.currentPassword
            }
            name="currentPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            type={isCurrentPasswordVisible ? 'text' : 'password'}
            value={formik.values.currentPassword}
          />
          <PasswordVisibilityButton
            enabled={isCurrentPasswordVisible}
            onClick={handleCurrentPasswordVisibility}
          />
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.currentPassword)}
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Form.Group controlId="new-passowrd">
        <Form.Label>{tPS('newPassword')}</Form.Label>
        <div className="input-group-inline-button">
          <Form.Control
            autoComplete="new-password"
            isInvalid={
              !!formik.touched.newPassword && !!formik.errors.newPassword
            }
            name="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            type={isNewPasswordVisible ? 'text' : 'password'}
            value={formik.values.newPassword}
          />
          <PasswordVisibilityButton
            enabled={isNewPasswordVisible}
            onClick={handleNewPasswordVisibility}
          />
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.newPassword)}
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <Button
        className="ms-auto"
        disabled={!formik.dirty || formik.isSubmitting}
        type="submit"
        variant="primary"
      >
        {tPS('changeButton')}
      </Button>
    </Form>
  );
}

export default ChangePasswordForm;
