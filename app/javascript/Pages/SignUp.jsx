/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

import routes from '../routes.js';

import classes from './SignUp.module.css';

export const SignUp = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [regFailed, setRegFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signUpValidation = yup.object().shape({
    login: yup
      .string()
      .trim()
      .min(3, t('signUp.validation.usernameLength'))
      .max(20, t('signUp.validation.usernameLength'))
      .matches(/^[A-Za-z ]*$/, t('signUp.validation.correctUsername'))
      .typeError()
      .required(t('signUp.validation.requiredField')),
    email: yup
      .string()
      .email(t('signUp.validation.correctEmail'))
      .required(t('signUp.validation.requiredField')),
    password: yup
      .string()
      .trim()
      .min(8, t('signUp.validation.passwordLength'))
      .max(30, t('signUp.validation.passwordLength'))
      .typeError()
      .required(t('signUp.validation.requiredField')),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        t('signUp.validation.confirmPassword'),
        (password, context) => password === context.parent.password,
      ),
  });
  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpValidation,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        await axios.post(routes.usersPath(), values);
        auth.logIn();
        actions.setSubmitting(false);
        navigate(routes.profilePagePath());
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        }
        if (err.response?.status === 400) {
          setRegFailed(true);
          inputRef.current.select();
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
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="email">
                      {t('signUp.emailLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      className={`form-input bg-dark text-white ${classes.signUpInput}`}
                      name="email"
                      isInvalid={
                        (formik.touched.email && formik.errors.email) ||
                        regFailed
                      }
                      id="email"
                      autoComplete="email"
                      required
                      ref={inputRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {(formik.touched.email && formik.errors.email) ||
                        regFailed}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="login">
                      {t('signUp.usernameLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.login}
                      onBlur={formik.handleBlur}
                      className={`form-input bg-dark text-white ${classes.signUpInput}`}
                      name="login"
                      id="login"
                      autoComplete="username"
                      required
                      isInvalid={
                        (formik.touched.login && formik.errors.login) ||
                        regFailed
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.login ? formik.errors.login : regFailed}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
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
                        (formik.touched.password && formik.errors.password) ||
                        regFailed
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password
                        ? formik.errors.password
                        : regFailed}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2">
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
                        (formik.touched.confirmPassword &&
                          formik.errors.confirmPassword) ||
                        regFailed
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : t('signUp.signUpFailed')}
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
            </Card.Body>
            <Card.Footer className="border-top-0 text-center py-3">
              <div className="py-lg-2">
                <div>
                  <span className="text-muted">
                    {t('signUp.footer.signInHeader')}
                  </span>
                  <a className="link-dark" href={routes.loginPagePath()}>
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
};
