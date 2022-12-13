import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import classes from './Modals.module.css';
import { actions as modalActions } from '../../slices/modalSlice.js';

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

  const formik = useFormik({
    initialValues: {
      currPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object().shape({
      currPassword: yup
        .string()
        .trim()
        .min(8, t('signUp.validation.passwordLength'))
        .max(30, t('signUp.validation.passwordLength'))
        .typeError()
        .required(t('signUp.validation.requiredField')),
      newPassword: yup
        .string()
        .trim()
        .min(8, t('signUp.validation.passwordLength'))
        .max(30, t('signUp.validation.passwordLength'))
        .typeError()
        .required(t('signUp.validation.requiredField')),
      confirmNewPassword: yup
        .string()
        .test(
          'confirmNewPassword',
          t('signUp.validation.confirmPassword'),
          (password, context) => password === context.parent.newPassword,
        ),
    }),
    onSubmit: async (values) => {
      try {
        // await axios.put(routes.changePasswordPath(id), values);
        // вероятно, надо как-то уведомить пользователя о смене пароля
        dispatch(modalActions.closeModal());
      } catch (err) {
        if (err.response?.status === 400) {
          setErrorFeedback(t('modals.changePassword.wrongPassword'));
        }
        if (err.isAxiosError) {
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
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="currPassword"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.currPassword && formik.errors.currPassword) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.currPassword && formik.errors.currPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="newPassword">
              {t('modals.changePassword.newPassword')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="newPassword"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.newPassword && formik.errors.newPassword) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.newPassword && formik.errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={classes.formGroup}>
            <Form.Label htmlFor="confirmNewPassword">
              {t('modals.changePassword.confirmNewPassword')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              onBlur={formik.handleBlur}
              type="password"
              className={`form-input bg-dark text-white ${classes.signInput}`}
              name="confirmNewPassword"
              autoComplete="new-password"
              required
              isInvalid={
                (formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword) ||
                changeFailed
              }
            />
            <Form.Control.Feedback type="invalid">
              {(formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword) ||
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
