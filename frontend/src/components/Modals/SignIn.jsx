/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useAuth } from '../../hooks';

import routes from '../../routes';

import { actions as modalActions } from '../../slices/modalSlice';
import classes from './Modals.module.css';

function SignInModal() {
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn();
        setAuthFailed(false);
        dispatch(modalActions.closeModal());
        actions.setSubmitting(false);
        return response.data;
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        }
        if (err.response?.status === 401) {
          setAuthFailed(true);
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
          {t('modals.signInHeader')}
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
              isInvalid={authFailed}
            />
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
              isInvalid={authFailed}
            />
            <Form.Control.Feedback type="invalid">
              {t('signIn.signInFailed')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-100 mt-3 pt-2 pb-2"
            data-disable-with="Войти"
          >
            {t('modals.signInButton')}
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
          onClick={() => dispatch(modalActions.closeModal())}
          style={{ width: 'calc(20% - 10px)' }}
        >
          {t('modals.cancelButton')}
        </Button>
        <div className="gap" style={{ marginLeft: 'auto' }} />
        <Button
          variant="outline-primary"
          className="bt-lg"
          onClick={() =>
            dispatch(modalActions.openModal({ type: 'signingUp' }))
          }
        >
          {t('modals.signUpButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignInModal;
