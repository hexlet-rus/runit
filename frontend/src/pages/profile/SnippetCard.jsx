import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { object } from 'yup';

import {
  BoxArrowUp,
  Files,
  PencilFill,
  ThreeDotsVertical,
  Trash3,
} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import { useSnippets } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as snippetsActions } from '../../slices/snippetsSlice.js';
import { snippetName } from '../../utils/validationSchemas';
import icons from '../../utils/icons';

import SnippetCardWrapper from './SnippetCardWrapper.jsx';

function CardHeader({ data, isRenaming, handleRename, handleCancel }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t: tErr } = useTranslation('translation', { keyPrefix: 'errors' });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const { name, id, code, language } = data;

  useEffect(() => {
    const filenameInput = inputRef.current;
    if (isRenaming && filenameInput) {
      filenameInput.setSelectionRange(0, filenameInput.value.lastIndexOf('.'));
      filenameInput.focus();
    }
  }, [isRenaming, inputRef]);

  const validationSchema = object({
    name: snippetName(),
  });

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const preparedValues = validationSchema.cast(values);
      try {
        await snippetApi.renameSnippet(id, { code, name: preparedValues.name });
        dispatch(
          snippetsActions.updateSnippet({ id, name: preparedValues.name }),
        );
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
    handleCancel();
  };

  return (
    <div className="snippet-card-header">
      <Image
        alt="JavaScript"
        className="snippet-card-header-icon"
        src={icons.get(language)}
      />
      <Form className="flex-fill" onSubmit={handleSubmit}>
        {formik.isSubmitting ? null : (
          <Form.Group className="position-relative">
            <Form.Control
              ref={inputRef}
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
            <Form.Control.Feedback tooltip type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Form>
      {isRenaming ? null : (
        <Button
          className="btn-icon-only z-2"
          onClick={handleRename}
          size="sm"
          variant="nofill-body"
        >
          <PencilFill className="bi" />
          <span className="visually-hidden">{tSA('rename')}</span>
        </Button>
      )}
    </div>
  );
}

function CardCode({ data, noLink = false }) {
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const snippetApi = useSnippets();
  const { code, slug } = data;
  const snippetCreatorUsername = data.user.username;

  return (
    <div className="snippet-card-body">
      <pre>{code}</pre>
      {noLink ? null : (
        <Link
          className="stretched-link"
          to={snippetApi.genViewSnippetLink(snippetCreatorUsername, slug)}
        >
          <span className="visually-hidden">{tSA('open')}</span>
        </Link>
      )}
    </div>
  );
}

const ViewMode = CardCode;

function RenameMode({ data }) {
  return <CardCode data={data} noLink />;
}

function DeleteMode({ data, handleCancel }) {
  const { id } = data;
  const { t: tErr } = useTranslation('translation', { keyPrefix: 'errors' });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const dispatch = useDispatch();
  const snippetApi = useSnippets();

  const handleSnippetDelete = async (snippetId) => {
    try {
      await snippetApi.deleteSnippet(snippetId);
      dispatch(snippetsActions.deleteSnippet(snippetId));
    } catch (error) {
      if (!error.isAxiosError) {
        console.log(tErr('unknown'));
        throw error;
      } else {
        console.log(tErr('network'));
        throw error;
      }
    }
  };

  return (
    <div className="snippet-card-body">
      <div className="d-flex flex-column justify-content-end h-100">
        <p className="text-center">{tSA('deleteConfirmation')}</p>
        <div className="d-flex flex-row flex-nowrap align-items-center gap-3 px-2">
          <Button
            className="w-100"
            onClick={handleCancel}
            type="button"
            variant="secondary"
          >
            {tSA('cancelButton')}
          </Button>
          <Button
            className="w-100"
            onClick={() => handleSnippetDelete(id)}
            type="button"
            variant="danger"
          >
            {tSA('delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}

function CardFooter({ handleDelete, handleShare, handleDuplicate }) {
  const [isOpened, setOpened] = useState(false);
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });

  return (
    <div className="snippet-card-footer">
      <div className="toolbar z-1 w-100">
        <div
          className={`toolbar animated flex-grow-1 ${
            isOpened ? 'opened' : 'collapsed'
          }`}
        >
          <Button
            className={`btn-icon-only me-auto ${isOpened ? '' : 'd-none'}`}
            onClick={handleDelete}
            variant="nofill-danger"
          >
            <Trash3 className="bi" />
            <span className="visually-hidden">{tSA('delete')}</span>
          </Button>
          <Button
            className={`btn-icon-only ms-auto ${isOpened ? '' : 'd-none'}`}
            onClick={handleDuplicate}
            variant="nofill-body"
          >
            <div className="text-nowrap">
              <Files className="bi me-1" />
            </div>
          </Button>
        </div>
        <Button
          aria-controls="additional-actions"
          aria-expanded={isOpened}
          className="btn-icon-only align-self-center"
          onClick={() => setOpened(!isOpened)}
          size="sm"
          variant="nofill-body"
        >
          <ThreeDotsVertical className="bi" />
          <span className="visually-hidden">{tSA('additionalHeader')}</span>
        </Button>

        <Button
          className="btn-icon-only"
          onClick={handleShare}
          variant="nofill-body"
        >
          <BoxArrowUp className="bi" />
          <span className="visually-hidden">{tSA('share')}</span>
        </Button>
      </div>
    </div>
  );
}

function SnippetCard({ data }) {
  const { id, name, slug, code, language } = data;
  const ownerUsername = data.user.username;
  const dispatch = useDispatch();
  const [mode, setMode] = useState('viewing');

  const handleRename = () => setMode('renaming');

  const handleDelete = () => setMode('deleting');

  const handleView = () => setMode('viewing');

  const handleDuplicate = async () => {
    dispatch(
      modalActions.openModal({
        type: 'duplicateSnippet',
        item: {
          currSnippetName: name,
          currSnippetLng: language,
          ownerUsername,
          code,
        },
      }),
    );
  };

  const cardModes = new Map()
    .set('viewing', ViewMode)
    .set('renaming', RenameMode)
    .set('deleting', DeleteMode);

  const handleShare = () => {
    const item = {
      name,
      id,
      ownerUsername,
      slug,
    };
    dispatch(
      modalActions.openModal({
        type: 'sharingSnippet',
        item,
      }),
    );
  };

  const CardBody = cardModes.get(mode);

  return (
    <SnippetCardWrapper>
      <div className="snippet-card h-100">
        <CardHeader
          data={data}
          handleCancel={handleView}
          handleRename={handleRename}
          isRenaming={mode === 'renaming'}
        />

        <CardBody data={data} handleCancel={handleView} />

        {mode === 'viewing' ? (
          <CardFooter
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            handleShare={handleShare}
          />
        ) : null}
      </div>
    </SnippetCardWrapper>
  );
}

export default SnippetCard;
