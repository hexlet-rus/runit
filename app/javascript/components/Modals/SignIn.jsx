/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAuth } from './../../hooks';

import axios from 'axios';
import routes from '../../routes';

import { actions as modalActions } from '../../slices/modalSlice';

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
        dispatch(modalActions.openModal({ type: 'savingRepl' }));
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
      <Modal.Header closeButton>
        <Modal.Title className="display-6">
          {t('modals.signInHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email" controlId="email" label="Email">
              {t('signUp.emailLabel')}
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              autoComplete="email"
              required
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={authFailed}
            />
          </Form.Group>
          <Form.Group className="mb-3">
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
        className="d-flex mt-3"
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
