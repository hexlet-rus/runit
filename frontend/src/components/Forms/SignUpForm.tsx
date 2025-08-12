import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../../hooks';
import routes from '../../routes';
import { email, password, username } from '../../utils/validationSchemas';

import GithubSignInButton from './GithubSignInButton';
import PasswordVisibilityButton from './PasswordVisibilityButton';
import FormAlert from './FormAlert';
import { TypeInitialFormState } from 'src/types/components';

function SignupForm({ onSuccess = () => null }) {
  const { t: tPS } = useTranslation('translation', {
    keyPrefix: 'profileSettings',
  });
  const { t: tSU } = useTranslation('translation', { keyPrefix: 'signUp' });
  const { t } = useTranslation();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();

  const initialFormState: TypeInitialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const validationSchema = object().shape({
    username: username(),
    email: email(),
    password: password(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      setFormState(initialFormState);
      const preparedValues = validationSchema.cast(values);
      try {
        actions.setSubmitting(true);
        await axios.post(routes.usersPath(), {
          username: preparedValues.username,
          email: preparedValues.email,
          password: values.password,
        });
        auth.signIn();
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
        if (
          err.response?.status === 400 &&
          Array.isArray(err.response?.data?.errs?.message)
        ) {
          err.response.data.errs.message.forEach((e) => {
            switch (e) {
              case 'usernameIsUsed':
                actions.setFieldError(
                  'username',
                  'errors.validation.usernameIsUsed',
                );
                usernameRef.current.select();
                break;
              case 'emailIsUsed':
                actions.setFieldError('email', 'errors.validation.emailIsUsed');
                emailRef.current.select();
                break;
              default:
                setFormState({
                  state: 'failed',
                  message: 'errors.network',
                });
                throw err;
            }
          });
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

  return (
    <div className="d-flex flex-column gap-4">
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form
        className="d-flex flex-column gap-1 gap-sm-3"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className="d-flex flex-column">
          <Form.Group className="form-group" controlId="username">
            <Form.Label>{tPS('usernameLabel')}</Form.Label>
            <Form.Control
              ref={usernameRef}
              autoComplete="username"
              isInvalid={!!formik.touched.username && !!formik.errors.username}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              type="text"
              value={formik.values.username}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.username)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="email">
            <Form.Label>{tPS('emailLabel')}</Form.Label>
            <Form.Control
              ref={emailRef}
              autoComplete="email"
              isInvalid={!!formik.touched.email && !!formik.errors.email}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              type="email"
              value={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.email)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="password">
            <Form.Label>{tPS('passwordLabel')}</Form.Label>
            <div className="input-group-inline-button">
              <Form.Control
                autoComplete="new-password"
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
        <Button
          className="mb-2"
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
        >
          {tSU('registerButton')}
        </Button>
      </Form>
      <GithubSignInButton />
    </div>
  );
}

export default SignupForm;
