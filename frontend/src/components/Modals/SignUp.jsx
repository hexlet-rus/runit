import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object } from 'yup';

import axios from 'axios';

import { useAuth } from '../../hooks';
import routes from '../../routes';

import { actions as modalActions } from '../../slices/modalSlice.js';
import classes from './Modals.module.css';
import {
  confirmPassword,
  email,
  login,
  password,
} from '../../utils/validationSchemas';

function SignUpModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [regFailed, setRegFailed] = useState(false);
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: object().shape({
      login: login(),
      email: email(),
      password: password(),
      confirmPassword: confirmPassword(),
    }),
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(routes.usersPath(), values);
        auth.logIn();
        dispatch(modalActions.closeModal());
        actions.setSubmitting(false);
        return response.data;
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        }
        if (err.response?.status === 400) {
          setRegFailed(true);
        } else {
          console.log(t('errors.network'));
          throw err;
        }
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      animation
      centered
      show
      onHide={() => dispatch(modalActions.closeModal())}
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="text-white bg-dark border-secondary"
      >
        <Modal.Title className="display-6">
          {t('modals.signUpHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="email" controlId="email" label="Email">
              {t('signUp.emailLabel')}
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              autoComplete="email"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={
                (formik.touched.email && t(formik.errors.email)) || regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {(formik.touched.email && t(formik.errors.email)) || regFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="login">{t('signUp.usernameLabel')}</Form.Label>
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
                (formik.touched.login && t(formik.errors.login)) || regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.login ? t(formik.errors.login) : regFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label
              htmlFor="password"
              controlId="password"
              label="Password"
            >
              {t('signUp.passwordLabel')}
            </Form.Label>
            <Form.Control
              name="password"
              type="password"
              autoComplete="new-password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={
                (formik.touched.password && t(formik.errors.password)) ||
                regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password ? t(formik.errors.password) : regFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label
              htmlFor="confirmPassword"
              controlId="confirmPassword"
              label="Confirm password"
            >
              {t('signUp.confirmPasswordLabel')}
            </Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isInvalid={
                (formik.touched.confirmPassword &&
                  t(formik.errors.confirmPassword)) ||
                regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword
                ? t(formik.errors.confirmPassword)
                : regFailed}
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
      </Modal.Body>
      <Modal.Footer
        className="d-flex bg-dark border-secondary"
        style={{ justifyContent: 'flex-end' }}
      >
        <Button
          variant="danger"
          className="bt-lg"
          style={{ width: 'calc(20% - 10px)' }}
          onClick={() => dispatch(modalActions.closeModal())}
        >
          {t('modals.cancelButton')}
        </Button>
        <div className="gap" style={{ marginLeft: 'auto' }} />
        <Button
          variant="outline-primary"
          className="bt-lg"
          style={{ width: 'calc(35% - 10px)' }}
          onClick={() =>
            dispatch(modalActions.openModal({ type: 'signingIn' }))
          }
        >
          {t('modals.signInButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
