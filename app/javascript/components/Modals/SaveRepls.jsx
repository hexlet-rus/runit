import React, { useEffect, useRef } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSnippets } from '../../hooks';
import * as yup from 'yup';

import { actions as modalActions } from '../../slices/modalSlice.js';

function SaveRepl() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const snippetsApi = useSnippets();
  const { code, currentLanguage } = useSelector(({ editor, languages }) => ({
    code: editor.code,
    currentLanguage: languages.currentLanguage,
  }));
  const languages = new Map()
    .set('javascript', '.js')
    .set('python', '.py')
    .set('php', '.php');

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: '',
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
        const name = `${values.name}${languages.get(currentLanguage)}`;
        const encodedId = await snippetsApi.saveSnippet(code, name);
        const link = snippetsApi.genSnippetLink(encodedId);
        dispatch(
          modalActions.openModal({ type: 'gettingLink', item: { name, link } }),
        );
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
      <Modal.Header closeButton>
        <Modal.Title>Название Репла</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="name" label={t('modals.replNameLabel')}>
              <Form.Control
                name="name"
                onChange={formik.handleChange}
                placeholder={t('modals.replNameLabel')}
                ref={inputRef}
                value={formik.values.name}
                isInvalid={formik.touched.name && formik.errors.name}
              />

              <Form.Control.Feedback type="invalid">
                {formik.touched.name && formik.errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div
            className="d-flex mt-4 justify-content-end"
            style={{ columnGap: '12px' }}
          >
            <Button
              variant="danger"
              onClick={() => dispatch(modalActions.closeModal())}
              type="button"
              style={{ width: 'calc(20% - 10px)' }}
            >
              {t('modals.cancelButton')}
            </Button>
            <div className="gap" style={{ marginLeft: 'auto' }} />
            <Button
              variant="success"
              disabled={formik.isSubmitting}
              type="submit"
              style={{ width: 'calc(35% - 10px)' }}
            >
              {t('modals.saveButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SaveRepl;
