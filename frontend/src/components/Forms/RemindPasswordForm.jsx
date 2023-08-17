import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { email } from '../../utils/validationSchemas';

import FormAlert from './FormAlert.jsx';

function RemindPasswordForm({ onSuccess = () => null }) {
  const { t } = useTranslation();
  const emailRef = useRef();

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
      const preparedValues = validationSchema.cast(values);
      try {
        console.log(preparedValues);
        onSuccess();
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
            {t('profileSettings.emailLabel')}
          </Form.Label>
          <Form.Control
            ref={emailRef}
            autoComplete="email"
            isInvalid={!!formik.touched.email && !!formik.errors.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t('profileSettings.emailLabel')}
            required
            type="email"
            value={formik.values.email}
          />
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.email)}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          data-disable-with={t('remindPass.resetButton')}
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
        >
          {t('remindPass.resetButton')}
        </Button>
      </Form>
    </>
  );
}

export default RemindPasswordForm;
