import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import routes from '../../routes';
import { email } from '../../utils/validationSchemas';

import FormAlert from './FormAlert.jsx';

function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { t: tPS } = useTranslation('translation', { keyPrefix: 'profileSettings' });
  const { t: tFP } = useTranslation('translation', { keyPrefix: 'forgotPass' });
  const emailRef = useRef();
  const location = window.location.origin;

  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const validationSchema = object().shape({
    email: email(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setFormState(initialFormState);
      const preparedValues = {
        ...validationSchema.cast(values),
        frontendUrl: location,
      };
      try {
        await axios.post(routes.resetPassPath(), preparedValues);
        setFormState({
          state: 'success',
          message: 'forgotPass.successAlert',
        });
      } catch (err) {
        if (!err.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
          throw err;
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

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form
        className="d-flex flex-column gap-4"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Form.Group controlId="email">
          <Form.Label className="visually-hidden">
            {tPS('emailLabel')}
          </Form.Label>
          <Form.Control
            ref={emailRef}
            autoComplete="email"
            isInvalid={!!formik.touched.email && !!formik.errors.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={tPS('emailLabel')}
            required
            type="email"
            value={formik.values.email}
          />
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.email)}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          data-disable-with={tFP('resetButton')}
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
        >
          {tFP('resetButton')}
        </Button>
      </Form>
    </>
  );
}

export default ForgotPasswordForm;
