import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object } from 'yup';

// eslint-disable-next-line import/no-unresolved
import { AutowidthInput } from 'react-autowidth-input';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { CloudCheck, PencilFill } from 'react-bootstrap-icons';

import { useAuth, useSnippets } from '../../hooks';
import { snippetName } from '../../utils/validationSchemas';
import { actions } from '../../slices/index.js';

import JavaScriptIcon from '../../assets/images/icons/javascript.svg';

function SnippetName({ snippet }) {
  const { isLoggedIn } = useAuth();
  const [isRenaming, setRenaming] = useState(false);
  const {
    code,
    snippetData: { id, name },
  } = snippet;
  const dispatch = useDispatch();
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
          console.log(t('errors.unknown'));
          throw error;
        } else {
          console.log(t('errors.network'));
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
      {formik.isSubmitting ? null : (
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
      )}

      {isRenaming || !isLoggedIn ? null : (
        <Button
          className="btn-icon-only"
          disabled={isRenaming}
          onClick={() => setRenaming(true)}
          size="sm"
          variant="nofill-secondary"
        >
          <PencilFill />
          <span className="visually-hidden">{t('snippetActions.rename')}</span>
        </Button>
      )}
    </Form>
  );
}

function SavingIndicator({ isAllSaved = false }) {
  const { t } = useTranslation();

  if (isAllSaved) {
    return (
      <div className="toolbar-indicator text-secondary">
        <CloudCheck className="bi" />
        <span className="visually-hidden">{t('editor.saved')}</span>
      </div>
    );
  }
  return (
    <div className="d-flex flex-row align-items-center text-secondary">
      <Spinner animation="border" className="me-1" role="status" size="sm">
        <span className="visually-hidden">{t('editor.unsaved')}</span>
      </Spinner>
      <div>{t('editor.saving')}</div>
    </div>
  );
}

function AuthWarning() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(actions.openModal({ type: 'signingIn' }));
  };

  return (
    <Button
      onClick={handleSignIn}
      size="sm"
      variant="outline-primary text-nowrap"
    >
      {t('editor.authBanner')}
    </Button>
  );
}

function FileToolbar({ snippet }) {
  const { isLoggedIn } = useAuth();
  const { isAllSaved } = snippet;

  return (
    <>
      <Image alt="JavaScript" height={32} src={JavaScriptIcon} />
      <SnippetName snippet={snippet} />
      {isLoggedIn ? (
        <SavingIndicator isAllSaved={isAllSaved} />
      ) : (
        <AuthWarning />
      )}
    </>
  );
}

export default FileToolbar;
