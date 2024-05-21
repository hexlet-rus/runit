import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { object } from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSnippets } from '../../hooks';
import useDuplicateSnippet from '../../hooks/useDuplicateSnippet';
import { snippetName } from '../../utils/validationSchemas';
import genDuplicateSnippetName from '../../utils/genDuplicateSnippetName';
import FormAlert from '../Forms/FormAlert';

const validationSchema = object().shape({
  snippetName: snippetName(),
});

const initialFormState = { state: 'initial', message: '' };

// duplicateSnippet
function DuplicateSnippetModal({ handleClose, isOpen }) {
  const { currSnippetName, currSnippetLng, code, ownerUsername } = useSelector(
    ({ modal }) => modal.item,
  );
  const navigate = useNavigate();
  const duplicateSnippet = useDuplicateSnippet();
  const { genViewSnippetLink } = useSnippets();
  const { t } = useTranslation();
  const username = useSelector((state) => state.user.userInfo.username);

  const nameRef = useRef(null);
  const [formState, setFormState] = useState({ state: 'initial', message: '' });

  const [newSnippetName, setNewSnippetName] = useState('');

  const formik = useFormik({
    initialValues: {
      snippetName: newSnippetName,
    },
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      const preparedValues = validationSchema.cast(values);
      try {
        actions.setSubmitting(true);
        const { slug } = await duplicateSnippet({
          code,
          snippetName: preparedValues.snippetName,
          language: currSnippetLng,
        });

        const url = new URL(genViewSnippetLink(username, slug));
        navigate(url.pathname);
        handleClose();
        toast.success(t('toasts.duplicateSnippet.success'));
      } catch (error) {
        console.log('err', error);
        if (!error.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.unknown',
          });
        }
        if (error.isAxiosError) {
          setFormState({
            state: 'failed',
            message: 'errors.network',
          });
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const newName =
      ownerUsername === username
        ? genDuplicateSnippetName(currSnippetName)
        : currSnippetName;

    setNewSnippetName(newName);
  }, [currSnippetName, ownerUsername, username]);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title className="display-7">
          {t('modals.duplicateSnippet.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-4">
          <FormAlert
            onClose={() => setFormState(initialFormState)}
            state={formState.state}
          >
            {t(formState.message)}
          </FormAlert>
          <Form
            className="d-flex flex-column gap-3"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <div className="d-flex flex-column gap-3">
              <Form.Group controlId="email">
                <Form.Label>
                  {t('modals.duplicateSnippet.snippetName')}
                </Form.Label>
                <Form.Control
                  ref={nameRef}
                  isInvalid={
                    !!formik.touched.snippetName && !!formik.errors.snippetName
                  }
                  name="snippetName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={t('modals.duplicateSnippet.snippetName')}
                  required
                  type="text"
                  value={formik.values.snippetName}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.snippetName)}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="d-flex flex-row gap-5 mt-3">
              {formState.state === 'failed' && <div>{formState.message}</div>}
              <Button
                className="flex-fill"
                data-disable-with={t('modals.duplicateSnippet.cancel')}
                disabled={formik.isSubmitting}
                onClick={() => handleClose()}
                variant="secondary"
              >
                {t('modals.duplicateSnippet.cancel')}
              </Button>
              <Button
                className="flex-fill"
                data-disable-with={t('modals.duplicateSnippet.save')}
                disabled={formik.isSubmitting}
                type="submit"
                variant="primary"
              >
                {t('modals.duplicateSnippet.save')}
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DuplicateSnippetModal;
