/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

export function SignIn() {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        setAuthFailed(false);
        actions.setSubmitting(false);
        navigate(routes.homePagePath());
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

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={6} xxl={5} className="mt-5">
          <Card className="shadow-sm">
            <Card.Body className="p-lg-4 p-xl-5">
              <h1 className="mb-4 fw-light">{t('signIn.pageHeader')}</h1>
              <div className="pt-lg-3">
                <Form onSubmit={formik.handleSubmit} noValidate>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="email">
                      {t('signIn.emailLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      className="form-input"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="password">
                      {t('signIn.passwordLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      type="password"
                      className="form-input"
                      name="password"
                      id="password"
                      autoComplete="password"
                      required
                      isInvalid={authFailed}
                    />

                    <Form.Control.Feedback type="invalid">
                      Неверный пароль или электронная почта
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-end my-3">
                    <a
                      className="text-decoration-none small"
                      href={routes.remindPassPagePath()}
                    >
                      {t('signIn.remindPass')}
                    </a>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 pb-2 pt-2"
                    data-disable-with="Войти"
                  >
                    {t('signIn.loginButton')}
                  </Button>
                </Form>
              </div>
            </Card.Body>
            <Card.Footer className="border-top-0 text-center py-3">
              <div className="py-lg-2">
                <span className="text-muted">
                  {t('signIn.footer.signUpHeader')}
                </span>
                <a className="link-dark" href={routes.signUpPagePath()}>
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
