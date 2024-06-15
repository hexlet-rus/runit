import axios from 'axios';
import { useFormik } from 'formik';
import { toUnicode } from 'punycode/';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { actions as userActions } from '../../slices/userSlice.js';
import routes from '../../routes';
import { email, username } from '../../utils/validationSchemas';
import FormAlert from './FormAlert.jsx';

function UpdateAccountForm() {
  const { t: tPS } = useTranslation('translation', { keyPrefix: 'profileSettings' });
  const { t } = useTranslation();
  const emailRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const validationSchema = object().shape({
    username: username(),
    email: email(),
  });

  const initialValues = {
    username: userInfo.username,
    email: toUnicode(userInfo.email),
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema,
    onSubmit: async (values, actions) => {
      setFormState(initialFormState);
      const preparedValues = validationSchema.cast(values);
      try {
        const response = await axios.put(routes.updateUserPath(userInfo.id), {
          id: userInfo.id,
          username: preparedValues.username,
          email: preparedValues.email,
        });
        dispatch(userActions.setUserInfo(response.data));
        setFormState({
          state: 'success',
          message: 'profileSettings.updateSuccessful',
        });
        actions.resetForm({ values });
      } catch (err) {
        if (!err.isAxiosError) {
          formik.resetForm();
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
        }
        if (
          err.response?.status === 400 &&
          Array.isArray(err.response?.data?.errs?.message)
        ) {
          const errResponseMessages = err.response.data.errs.message;
          errResponseMessages.forEach((e) => {
            switch (e) {
              case 'usernameIsUsed':
                actions.setFieldError(
                  'username',
                  'errors.validation.usernameIsUsed',
                );
                usernameRef.current.select();
                break;
              case 'emailIsUsed':
                actions.setFieldError('email', 'errors.validation.emailIsUsed');
                emailRef.current.select();
                break;
              default:
                setFormState({
                  state: 'failed',
                  message: 'profileSettings.updateFailed',
                });
                throw err;
            }
          });
        } else {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
          throw err;
        }
      }
    },
  });

  return (
    <Form
      className="d-flex flex-column gap-3"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <h5>{tPS('updateAccount')}</h5>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form.Group controlId="username">
        <Form.Label>{tPS('usernameLabel')}</Form.Label>
        <Form.Control
          ref={usernameRef}
          autoComplete="username"
          isInvalid={formik.touched.username && formik.errors.username}
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type="text"
          value={formik.values.username}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>{tPS('emailLabel')}</Form.Label>
        <Form.Control
          ref={emailRef}
          autoComplete="email"
          isInvalid={formik.touched.email && formik.errors.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type="email"
          value={formik.values.email}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.email)}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        className="ms-auto"
        disabled={!formik.dirty || formik.isSubmitting}
        type="submit"
        variant="primary"
      >
        {tPS('updateButton')}
      </Button>
    </Form>
  );
}

export default UpdateAccountForm;
