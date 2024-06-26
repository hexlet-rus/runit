import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object } from 'yup';

// eslint-disable-next-line import/no-unresolved
import AutowidthInput from 'react-autowidth-input';
import { CloudArrowUp, CloudCheck, PencilFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

import { useAuth, useSnippets } from '../../hooks';
import { actions } from '../../slices/index.js';
import { snippetName } from '../../utils/validationSchemas';
import icons from '../../utils/icons';

function SnippetName({ snippet }) {
  const { isLoggedIn } = useAuth();
  const [isRenaming, setRenaming] = useState(false);
  const {
    code,
    snippetData: { id, name, language },
  } = snippet;
  const dispatch = useDispatch();
  const { t: tErr } = useTranslation('translation', { keyPrefix: 'errors' });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const inputRef = useRef(null);

  useEffect(() => {
    const filenameInput = inputRef.current;
    if (isRenaming && filenameInput) {
      filenameInput.setSelectionRange(0, filenameInput.value.lastIndexOf('.'));
      filenameInput.focus();
    }
  }, [isRenaming]);

  const validationSchema = object({
    name: snippetName(),
  });

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const preparedValues = validationSchema.cast(values);
      try {
        await snippetApi.renameSnippet(id, { code, name: preparedValues.name });
        dispatch(actions.updateActiveSnippetName(preparedValues.name));
        formik.resetForm({ values: preparedValues });
      } catch (error) {
        formik.resetForm();
        if (!error.isAxiosError) {
          console.log(tErr('unknown'));
          throw error;
        } else {
          console.log(tErr('network'));
          throw error;
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formik.isValid && formik.dirty) {
      formik.handleSubmit();
    } else {
      formik.resetForm();
    }
    setRenaming(false);
  };

  return (
    <Form
      className="d-flex flex-row align-items-center"
      onSubmit={handleSubmit}
    >
      <Image
        alt="JavaScript"
        className="me-1"
        height={32}
        src={icons.get(language)}
      />
      {formik.isSubmitting ? null : (
        <Form.Group className="form-floating">
          <Form.Control
            ref={inputRef}
            as={AutowidthInput}
            autoComplete="off"
            className="transition-padding"
            id="name"
            isInvalid={!!formik.errors.name}
            maxLength={30}
            name="name"
            onBlur={handleSubmit}
            onChange={formik.handleChange}
            plaintext={!isRenaming}
            readOnly={!isRenaming}
            value={formik.values.name}
          />
          <Form.Control.Feedback
            className={formik.errors.name && 'd-block min-w-150'}
            tooltip
            type="invalid"
          >
            {t(formik.errors.name)}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      {isRenaming || !isLoggedIn ? null : (
        <Button
          className="btn-icon-only"
          disabled={isRenaming}
          onClick={() => setRenaming(true)}
          size="sm"
          variant="nofill-body"
        >
          <PencilFill />
          <span className="visually-hidden">{tSA('rename')}</span>
        </Button>
      )}
    </Form>
  );
}

function SavingIndicator({ isAllSaved = false }) {
  const { t: tE } = useTranslation('translation', { keyPrefix: 'editor' });

  if (isAllSaved) {
    return (
      <div className="d-flex flex-row align-items-center text-body-secondary">
        <div className="toolbar-indicator">
          <CloudCheck className="bi" />
        </div>
        <div className="small">{tE('saved')}</div>
      </div>
    );
  }
  return (
    <div className="d-flex flex-row align-items-center text-body-secondary glow">
      <div className="toolbar-indicator">
        <CloudArrowUp className="bi" />
        <span className="visually-hidden">{tE('unsaved')}</span>
      </div>
      <div className="small">{tE('saving')}</div>
    </div>
  );
}

function FileToolbar({ snippet }) {
  const { isLoggedIn } = useAuth();
  const { isAllSaved } = snippet;

  return (
    <Col className="toolbar">
      <SnippetName snippet={snippet} />
      {isLoggedIn && <SavingIndicator isAllSaved={isAllSaved} />}
    </Col>
  );
}

export default FileToolbar;
