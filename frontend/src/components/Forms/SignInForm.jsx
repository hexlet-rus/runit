import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../hooks';
import { email } from '../../utils/validationSchemas';
import routes from '../../routes';
import classes from './Form.module.css';

function SignInForm({ onSuccess = () => null }) {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();

  const validationSchema = object().shape({
    email: email(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        setAuthFailed(false);
        auth.logIn();
        actions.setSubmitting(false);
        if (onSuccess) onSuccess();
        return response.data;
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        }
        if (err.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          console.log(t('errors.network'));
          throw err;
        }
        actions.setSubmitting(false);
        return values;
      }
    },
  });

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="email">{t('signIn.emailLabel')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          className={`form-input bg-dark text-white ${classes.formControl}`}
          name="email"
          id="email"
          autoComplete="email"
          required
          isInvalid={formik.touched.email && formik.errors.email}
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.email)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="password">{t('signIn.passwordLabel')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type="password"
          className={`form-input bg-dark text-white ${classes.formControl}`}
          name="password"
          id="password"
          autoComplete="password"
          required
        />
      </Form.Group>
      {authFailed ? (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setAuthFailed(false)}
        >
          {t('signIn.signInFailed')}
        </Alert>
      ) : null}
      {/* TODO: https://github.com/hexlet-rus/runit/issues/94 */}
      {/* <div className="text-end my-3">
        <a
          className="text-decoration-none small"
          href={routes.remindPassPagePath()}
        >
          {t('signIn.remindPass')}
        </a>
      </div> */}
      <Button
        type="submit"
        variant="primary"
        className="w-100 pb-2 pt-2"
        data-disable-with="Войти"
        disabled={formik.isSubmitting}
      >
        {t('signIn.loginButton')}
      </Button>
    </Form>
  );
}

export default SignInForm;
