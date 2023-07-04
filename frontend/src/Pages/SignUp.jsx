/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { object } from 'yup';

import { useFormik } from 'formik';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

import routes from '../routes.js';

import classes from './SignUp.module.css';
import {
  confirmPassword,
  email,
  login,
  password,
} from '../utils/validationSchemas';

function SignUp() {
  const emailRef = useRef();
  const loginRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        navigate(routes.defaultProfilePagePath());
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
    <Container className="h-100 bg-dark" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={6} xxl={5} className="mt-5 mb-5">
          <Card className="shadow-sm bg-dark text-white">
            <Card.Body className="p-lg-4 p-xl-5">
              <h1 className="mb-4 fw-light">{t('signUp.pageHeader')}</h1>
              <div className="pt-lg-3">
                <Form onSubmit={formik.handleSubmit} noValidate>
                  <Form.Group className={classes.formGroup}>
                    <Form.Label htmlFor="email">
                      {t('signUp.emailLabel')}
                    </Form.Label>
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
                      {formik.touched.email && t(formik.errors.email)}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className={classes.formGroup}>
                    <Form.Label htmlFor="login">
                      {t('signUp.usernameLabel')}
                    </Form.Label>
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
                      {formik.touched.login && t(formik.errors.login)}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className={classes.formGroup}>
                    <Form.Label htmlFor="password">
                      {t('signUp.passwordLabel')}
                    </Form.Label>
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
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password && t(formik.errors.password)}
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
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword &&
                        t(formik.errors.confirmPassword)}
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
              </div>
              <a
                id="github-button"
                className="btn btn-block btn-social btn-github text-light ps-0"
                href={routes.oAuthPath()}
              >
                {t('signIn.withGithub')}
              </a>
            </Card.Body>
            <Card.Footer className="border-top-0 text-center py-3">
              <div className="py-lg-2">
                <div>
                  <span className="text-muted">
                    {t('signUp.footer.signInHeader')}
                  </span>
                  <a className="link-light" href={routes.loginPagePath()}>
                    {t('signUp.footer.signIn')}
                  </a>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
