import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import type { TypeInitialFormState } from 'src/types/components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { actions as userActions } from '../../slices/userSlice';
import { actions as modalActions } from '../../slices/modalSlice';
import { useAuth } from '../../hooks';
import routes from '../../routes';
import { email, required } from '../../utils/validationSchemas';

import GithubSignInButton from './GithubSignInButton';
import PasswordVisibilityButton from './PasswordVisibilityButton';
import FormAlert from './FormAlert';
import { useTRPC } from '../../utils/trpc';
import { TRPCClientError } from '@trpc/client';

function SignInForm() {
  const dispatch = useDispatch();
  const trpc = useTRPC();
  const redir = useNavigate();

  const { t: tPS } = useTranslation('translation', {
    keyPrefix: 'profileSettings',
  });
  const { t: tSI } = useTranslation('translation', { keyPrefix: 'signIn' });
  const { t } = useTranslation();
  const emailRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();

  const loginUserOptions = trpc.users.isUserExist.mutationOptions({
    onSuccess(data) {
      dispatch(modalActions.closeModal());
      dispatch(userActions.setUserStatus('signedIn'));
      dispatch(userActions.setUserInfo(data.user));
      redir(routes.myProfilePagePath());
    },
    onError(e) {
      console.log(e);
    },
  });
  const loginUserMutation = useMutation(loginUserOptions);

  const initialFormState: TypeInitialFormState = {
    state: 'initial',
    message: '',
  };
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
      const preparedValues = validationSchema.cast(values);
      try {
        actions.setSubmitting(true);
        await loginUserMutation.mutateAsync({
          email: preparedValues.email,
          password: preparedValues.password,
        });
        auth.signIn();
      } catch (err) {
        if (!(err instanceof TRPCClientError)) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        }
        if (err.data.httpStatus === '401') {
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
              {tPS('emailLabel')}
            </Form.Label>
            <Form.Control
              ref={emailRef}
              autoComplete="email"
              isInvalid={!!formik.touched.email && !!formik.errors.email}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={tPS('emailLabel')}
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
              {tPS('passwordLabel')}
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
                placeholder={tPS('passwordLabel')}
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
          <Link
            className="icon-link link-secondary d-block align-self-center"
            to={routes.forgotPassPagePath()}
          >
            {tSI('remindPass')}
          </Link>
          <Button
            className="flex-fill w-50"
            data-disable-with={tSI('signInButton')}
            data-testid="signin-button"
            disabled={formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {tSI('signInButton')}
          </Button>
        </div>
      </Form>
      <GithubSignInButton />
    </div>
  );
}

export default SignInForm;
