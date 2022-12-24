import React, { useEffect, useRef } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnippets } from '../../hooks';

import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as snippetsAction } from '../../slices/snippetsSlice.js';

function RenameRepl() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const snippetsApi = useSnippets();
  const { name, id, code } = useSelector((state) => state.modal.item);
  const [previousName, extension] = name.split('.');

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: previousName,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(t('modals.validation.required'))
        .max(20, t('modals.validation.snippetNameMaxLength'))
        .matches(/^[a-zA-Z0-9_-]*$/, t('modals.validation.singleWord')),
    }),
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        const newName = `${values.name}.${extension}`;
        const data = { code, name: newName };
        await snippetsApi.renameSnippet(id, data);

        dispatch(snippetsAction.updateSnippet({ id, name: newName }));
        dispatch(modalActions.closeModal());
        actions.setSubmitting(false);
      } catch (err) {
        actions.setSubmitting(false);
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          throw err;
        } else {
          console.log(t('errors.network'));
          throw err;
        }
      }
    },
  });

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      show
    >
      <Modal.Header
        closeButton
        className="bg-dark text-white"
        closeVariant="white"
      >
        <Modal.Title>{t('modals.newSnippetName')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="name"
              label={t('modals.share.snippetNameLabel')}
              className="text-white"
            >
              <Form.Control
                className="bg-dark text-white"
                name="name"
                onChange={formik.handleChange}
                placeholder={t('modals.share.snippetNameLabel')}
                ref={inputRef}
                value={formik.values.name}
                isInvalid={formik.touched.name && formik.errors.name}
              />

              <Form.Control.Feedback type="invalid">
                {formik.touched.name && formik.errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div className="d-flex mt-4 justify-content-between">
            <Button
              variant="danger"
              onClick={() => dispatch(modalActions.closeModal())}
              type="button"
            >
              {t('modals.cancelButton')}
            </Button>
            <Button
              variant="success"
              disabled={formik.isSubmitting}
              type="submit"
            >
              {t('modals.share.saveSnippetButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameRepl;
