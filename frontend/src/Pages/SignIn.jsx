/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { object } from 'yup';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

import routes from '../routes.js';

import classes from './SignIn.module.css';
import { email } from '../utils/validationSchemas';

function SignIn() {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
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
        navigate(routes.defaultProfilePagePath());
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
    <Container className="h-100 bg-dark" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={6} xxl={5} className="mt-5 mb-5">
          <Card className="shadow-sm bg-dark text-white">
            <Card.Body className="p-lg-4 p-xl-5">
              <h1 className="mb-4 fw-light">{t('signIn.pageHeader')}</h1>
              <div className="pt-lg-3">
                <Form onSubmit={formik.handleSubmit} noValidate>
                  <Form.Group className={classes.formGroup}>
                    <Form.Label htmlFor="email">
                      {t('signIn.emailLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      className={`form-input bg-dark text-white ${classes.signinInput}`}
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      isInvalid={
                        (formik.touched.email && t(formik.errors.email)) ||
                        authFailed
                      }
                      ref={inputRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t(formik.errors.email)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={classes.formGroup}>
                    <Form.Label htmlFor="password">
                      {t('signIn.passwordLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      type="password"
                      className={`form-input bg-dark text-white ${classes.signinInput}`}
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
                <span className="text-muted">
                  {t('signIn.footer.signUpHeader')}
                </span>
                <a className="link-light" href={routes.signUpPagePath()}>
                  {t('signIn.footer.signUp')}
                </a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
