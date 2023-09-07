import axios from 'axios';

import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../../hooks';
import routes from '../../routes';
import { password } from '../../utils/validationSchemas';

import FormAlert from './FormAlert.jsx';
import PasswordVisibilityButton from './PasswordVisibilityButton';

function ResetPasswordForm({ onSuccess = () => null }) {
  const { t } = useTranslation();
  const { hash } = useParams();
  const passwordRef = useRef();
  const auth = useAuth();

  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const validationSchema = object().shape({
    password: password(),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setFormState(initialFormState);
      const preparedValues = { ...validationSchema.cast(values), hash };
      try {
        const { data } = await axios.post(
          `${routes.resetPassPath()}/${hash}`,
          preparedValues,
        );
        await axios.post(routes.signInPath(), {
          email: data.email,
          password: values.password,
        });
        auth.signIn();
        onSuccess();
      } catch (err) {
        if (!err.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        } else {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
          throw err;
        }
      }
    },
  });

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  return (
    <>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form
        className="d-flex flex-column gap-4"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Form.Group controlId="password">
          <Form.Label className="visually-hidden">
            {t('profileSettings.newPassword')}
          </Form.Label>
          <div className="input-group-inline-button input-group-inline-button">
            <Form.Control
              ref={passwordRef}
              autoComplete="password"
              isInvalid={!!formik.touched.password && !!formik.errors.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t('profileSettings.newPassword')}
              required
              type={isPasswordVisible ? 'text' : 'password'}
              value={formik.values.password}
            />
            <PasswordVisibilityButton
              enabled={isPasswordVisible}
              onClick={handlePasswordVisibility}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.password)}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Button
          data-disable-with={t('profileSettings.changePassword')}
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
        >
          {t('profileSettings.changePassword')}
        </Button>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
