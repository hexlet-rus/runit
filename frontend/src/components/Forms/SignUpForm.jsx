import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { object } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import routes from '../../routes';
import {
  confirmPassword,
  email,
  login,
  password,
} from '../../utils/validationSchemas';
import { useAuth } from '../../hooks';
import classes from '../../Pages/SignUp.module.css';

function SignupForm({ onSuccess = () => null }) {
  const { t } = useTranslation();
  const emailRef = useRef();
  const loginRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const validationSchema = object().shape({
    login: login(),
    email: email(),
    password: password(),
    confirmPassword: confirmPassword(),
  });
  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        await axios.post(routes.usersPath(), values);
        auth.logIn();
        actions.setSubmitting(false);
        if (onSuccess) onSuccess();
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        }
        if (
          err.response?.status === 400 &&
          Array.isArray(err.response?.data?.errs?.message)
        ) {
          err.response.data.errs.message.forEach((e) => {
            switch (e) {
              case 'loginIsUsed':
                formik.errors.login = 'errors.validation.loginIsUsed';
                loginRef.current.select();
                break;
              case 'emailIsUsed':
                formik.errors.email = 'errors.validation.emailIsUsed';
                emailRef.current.select();
                break;
              default:
                console.log(t('signUp.signUpFailed'));
                throw err;
            }
          });
        } else {
          console.log(t('errors.network'));
          throw err;
        }
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="email">{t('signUp.emailLabel')}</Form.Label>
        <Form.Control
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-input bg-dark text-white ${classes.signUpInput}`}
          name="email"
          id="email"
          autoComplete="email"
          required
          isInvalid={formik.touched.email && formik.errors.email}
          ref={emailRef}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.email)}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="login">{t('signUp.usernameLabel')}</Form.Label>
        <Form.Control
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-input bg-dark text-white ${classes.signUpInput}`}
          name="login"
          id="login"
          autoComplete="username"
          required
          isInvalid={formik.touched.login && formik.errors.login}
          ref={loginRef}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.login)}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="password">{t('signUp.passwordLabel')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type="password"
          className={`form-input bg-dark text-white ${classes.signUpInput}`}
          name="password"
          id="password"
          autoComplete="new-password"
          required
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className={classes.formGroup}>
        <Form.Label htmlFor="confirmPassword">
          {t('signUp.confirmPasswordLabel')}
        </Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          type="password"
          className={`form-input bg-dark text-white ${classes.signUpInput}`}
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          required
          isInvalid={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="w-100 mt-3 pt-2 pb-2"
        data-disable-with="Войти"
        disabled={formik.isSubmitting}
      >
        {t('signUp.registerButton')}
      </Button>
    </Form>
  );
}

export default SignupForm;
