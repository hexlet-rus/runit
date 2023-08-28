import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useFormik } from 'formik';
import { object } from 'yup';
import { useAuth, useSnippets } from '../../hooks';
import { actions } from '../../slices';
import { snippetName } from '../../utils/validationSchemas';

function DuplicateSnippet({ isOpen, handleClose }) {
  const { name, code } = useSelector(({ modal }) => modal.item);
  const username = useSelector((state) => state.user.userInfo.username);
  const { isLoggedIn } = useAuth();

  const newSnippetNameRef = useRef(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { saveSnippet, getSnippetData, genViewSnippetLink } = useSnippets();

  useEffect(() => {
    if (newSnippetNameRef.current) {
      newSnippetNameRef.current.focus();
      newSnippetNameRef.current.select();
    }
  }, [newSnippetNameRef]);

  const handleLogin = () => {
    dispatch(
      actions.openModal({
        type: 'signingIn',
      }),
    );
  };

  const validationSchema = object({
    name: snippetName(),
  });

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const newID = await saveSnippet(code, values.name);
        const { slug } = await getSnippetData(newID);
        const url = new URL(genViewSnippetLink(username, slug));
        navigate(url.pathname);
        handleClose();
      } catch (error) {
        formik.resetForm();
        if (!error.isAxiosError) {
          console.log(t('errors.unknown'));
          throw error;
        } else {
          console.log(t('errors.network'));
          throw error;
        }
      }
    },
  });

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="pb-3" closeButton>
        <Modal.Title>{t('modals.duplicateSnippet.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoggedIn ? (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label>{t('modals.duplicateSnippet.name')}</Form.Label>
              <Form.Control
                ref={newSnippetNameRef}
                autoComplete="off"
                id="name"
                isInvalid={!!formik.errors.name}
                maxLength={30}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                type="text"
                value={formik.values.name}
              />
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.name)}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex flex-column">
              <Button type="submit">{t('modals.duplicateSnippet.save')}</Button>
            </div>
          </Form>
        ) : (
          <Stack gap={3}>
            <p>{t('modals.duplicateSnippet.message')}</p>
            <Button
              disabled={formik.isSubmitting}
              onClick={handleLogin}
              type="button"
            >
              {t('signIn.signInButton')}
            </Button>
          </Stack>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default DuplicateSnippet;
