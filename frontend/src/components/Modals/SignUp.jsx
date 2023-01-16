import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';

import { useAuth } from '../../hooks';
import routes from '../../routes';

import { actions as modalActions } from '../../slices/modalSlice.js';
import classes from './Modals.module.css';

function SignUpModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [regFailed, setRegFailed] = useState(false);
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      name: yup
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
    }),
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
        if (err.response?.status === 409) {
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
                (formik.touched.email && formik.errors.email) || regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {(formik.touched.email && formik.errors.email) || regFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="name" controlId="name" label="Name">
              {t('signUp.usernameLabel')}
            </Form.Label>
            <Form.Control
              name="name"
              type="name"
              autoComplete="username"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={
                (formik.touched.name && formik.errors.name) || regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name ? formik.errors.name : regFailed}
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
                (formik.touched.password && formik.errors.password) || regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password ? formik.errors.password : regFailed}
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
                  formik.errors.confirmPassword) ||
                regFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword
                ? formik.errors.confirmPassword
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
