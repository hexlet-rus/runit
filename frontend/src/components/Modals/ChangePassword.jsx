import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { object } from 'yup';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import classes from './Modals.module.css';
import { actions as modalActions } from '../../slices/modalSlice.js';
import {
  confirmPassword as confirmPasswordSchema,
  password as passwordSchema,
} from '../../utils/validationSchemas.js';

function ChangePassword() {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [changeFailed, setChangeFailed] = useState(null);
  const [errorFeedback, setErrorFeedback] = useState('');
  const { id } = useSelector((state) => state.modal.item);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = object().shape({
    currPassword: passwordSchema(),
    password: passwordSchema(),
    confirmPassword: confirmPasswordSchema(),
  });

  const formik = useFormik({
    initialValues: {
      currPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, target) => {
      try {
        await axios.put(routes.updateUserPath(id), { id, ...values });
        /* TODO: Add a user notification about password change */
        dispatch(modalActions.closeModal());
      } catch (err) {
        if (err.response?.status === 400) {
          target.setFieldError(
            'currPassword',
            t('modals.changePassword.wrongPassword'),
          );
        } else if (err.isAxiosError) {
          console.log(t('errors.network'));
          setErrorFeedback(t('errors.network'));
        } else {
          console.log(t('errors.unknown'));
        }
        setChangeFailed(true);
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
          {t('modals.changePassword.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form id="changePasswordForm" noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="currPassword">
              {t('modals.changePassword.currentPassword')}
            </Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.currPassword}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="currPassword"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.currPassword &&
                  t(formik.errors.currPassword)) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.currPassword && t(formik.errors.currPassword)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="password">
              {t('modals.changePassword.newPassword')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="password"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.password && t(formik.errors.password)) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && t(formik.errors.password)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="confirmPassword">
              {t('modals.changePassword.confirmNewPassword')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="confirmPassword"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.confirmPassword &&
                  t(formik.errors.confirmPassword)) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {(formik.touched.confirmPassword &&
                t(formik.errors.confirmPassword)) ||
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
          form="changePasswordForm"
        >
          {t('modals.sendButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
