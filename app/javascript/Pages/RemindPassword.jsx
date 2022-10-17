/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Card, Col, Row, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

export function RemindPassword() {
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const emailValidation = yup.object().shape({
    email: yup.string().email(t('remindPass.validation.correctEmail')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleBlur, handleChange, handleSubmit, values } = formik;
  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={6} xxl={5} className="mt-5">
          <Card className="shadow-sm">
            <Card.Body className="p-lg-4 p-xl-5">
              <h1 className="mb-4 fw-light">{t('remindPass.pageHeader')}</h1>
              <div className="pt-lg-3">
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="email">
                      {t('remindPass.emailLabel')}
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="form-input"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 pb-2 pt-2"
                  >
                    {t('remindPass.resetButton')}
                  </Button>
                </Form>
              </div>
            </Card.Body>
            <Card.Footer className="border-top-0 text-center py-3">
              <div className="py-lg-2">
                <div>
                  <span className="text-muted">
                    {t('remindPass.footer.signUpHeader')}
                  </span>
                  <a className="link-dark" href={routes.signUpPagePath()}>
                    {t('remindPass.footer.signUp')}
                  </a>
                </div>
                <div>
                  <span className="text-muted">
                    {t('remindPass.footer.signInHeader')}
                  </span>
                  <a className="link-dark" href={routes.loginPagePath()}>
                    {t('remindPass.footer.signIn')}
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
