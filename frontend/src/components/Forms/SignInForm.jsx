import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../../hooks';
import routes from '../../routes';
import { email, required } from '../../utils/validationSchemas';

import GithubSignInButton from './GithubSignInButton.jsx';
import PasswordVisibilityButton from './PasswordVisibilityButton.jsx';
import FormAlert from './FormAlert.jsx';

function SignInForm({ onSuccess = () => null }) {
  const { t } = useTranslation();
  const emailRef = useRef();
  const auth = useAuth();

  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const validationSchema = object().shape({
    email: email(),
    password: required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      setFormState(initialFormState);
      try {
        actions.setSubmitting(true);
        await axios.post(routes.loginPath(), values);
        auth.logIn();
        actions.setSubmitting(false);
        onSuccess();
      } catch (err) {
        if (!err.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        }
        if (err.response?.status === 401) {
          setFormState({
            state: 'failed',
            message: 'errors.signInFailed',
          });
          emailRef.current.select();
        } else {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
          throw err;
        }
        actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form
        className="d-flex flex-column gap-3"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className="d-flex flex-column gap-3">
          <Form.Group controlId="email">
            <Form.Label className="visually-hidden">
              {t('profileSettings.emailLabel')}
            </Form.Label>
            <Form.Control
              ref={emailRef}
              autoComplete="email"
              isInvalid={!!formik.touched.email && !!formik.errors.email}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t('profileSettings.emailLabel')}
              required
              type="email"
              value={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.email)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="current-passowrd">
            <Form.Label className="visually-hidden">
              {t('profileSettings.passwordLabel')}
            </Form.Label>
            <div className="input-group-inline-button input-group-inline-button">
              <Form.Control
                autoComplete="password"
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('profileSettings.passwordLabel')}
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
        </div>
        <div className="d-flex flex-row gap-5">
          {formState.message === 'errors.signInFailed' ? (
            <a
              className="icon-link link-secondary d-block align-self-center"
              href={routes.remindPassPagePath()}
            >
              {t('signIn.remindPass')}
            </a>
          ) : null}
          <Button
            className="flex-fill"
            data-disable-with={t('signIn.signInButton')}
            data-testid="signin-button"
            disabled={formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {t('signIn.signInButton')}
          </Button>
        </div>
      </Form>
      <GithubSignInButton />
    </div>
  );
}

export default SignInForm;
