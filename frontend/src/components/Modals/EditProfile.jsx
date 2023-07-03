import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'yup';
import axios from 'axios';

import routes from '../../routes';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as userActions } from '../../slices/userSlice.js';
import classes from './Modals.module.css';

import {
  login as loginSchema,
  email as emailSchema,
} from '../../utils/validationSchemas';

function EditProfile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [editFailed, setEditFailed] = useState('');
  const [errorFeedback, setErrorFeedback] = useState('');
  const { login, email, id } = useSelector((state) => state.modal.item);
  const loginInputRef = useRef(null);

  useEffect(() => {
    loginInputRef.current.select();
  }, []);

  const validationSchema = object().shape({
    login: loginSchema(),
    email: emailSchema(),
  });

  const formik = useFormik({
    initialValues: {
      login,
      email,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(routes.updateUserPath(id), {
          id,
          ...values,
        });
        dispatch(userActions.setUserInfo(response.data));
        dispatch(modalActions.closeModal());
      } catch (err) {
        if (err.response?.status === 400) {
          setErrorFeedback(t('signUp.signUpFailed'));
        }
        if (err.isAxiosError) {
          console.log(t('errors.network'));
        } else {
          console.log(t('errors.unknown'));
        }
        setEditFailed(true);
        throw err;
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
          {t('modals.editUserHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form id="editUserForm" noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="login" label="Login">
              {t('signUp.usernameLabel')}
            </Form.Label>
            <Form.Control
              name="login"
              type="login"
              ref={loginInputRef}
              autoComplete="username"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              onChange={formik.handleChange}
              value={formik.values.login}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.login && t(formik.errors.login)) || editFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.login)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="email" label="Email">
              {t('signUp.emailLabel')}
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              autoComplete="email"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              required
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.email && t(formik.errors.email)) || editFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {(formik.touched.email && t(formik.errors.email)) ||
                errorFeedback}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="d-flex bg-dark border-secondary justify-content-between"
        style={{ justifyContent: 'flex-end' }}
      >
        <Button
          variant="danger"
          className="w-25"
          onClick={() => dispatch(modalActions.closeModal())}
        >
          {t('modals.cancelButton')}
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="w-50"
          disabled={formik.isSubmitting}
          form="editUserForm"
        >
          {t('modals.sendButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfile;
