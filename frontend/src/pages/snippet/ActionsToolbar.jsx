import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BoxArrowUp, Files, PlayFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { actions } from '../../slices';
import DisplayIconView from '../../components/ActionsToolbar/index.jsx';
import { useAuth, useRunButton, useSaveButton } from '../../hooks';
import 'react-toastify/dist/ReactToastify.css';

function ActionsToolbar({ snippet }) {
  const { t: tTSC } = useTranslation('translation', { keyPrefix: 'toasts.saveCode' });
  const { t: tSA } = useTranslation('translation', { keyPrefix: 'snippetActions' });
  const { onClick, disabled } = useRunButton();
  const { saveCode } = useSaveButton();
  const dispatch = useDispatch();
  const { snippetData, code, isAllSaved } = snippet;
  const { name: snippetName, ownerUsername } = snippetData;
  const { language } = snippetData;
  const { isLoggedIn } = useAuth();
  const { direction } = useSelector((state) => state.editor);
  const handleShare = () => {
    dispatch(
      actions.openModal({
        type: 'sharingSnippet',
        item: snippetData,
      }),
    );
  };

  const handleDuplicate = () => {
    if (isLoggedIn) {
      dispatch(
        actions.openModal({
          type: 'duplicateSnippet',
          item: {
            currSnippetName: snippetName,
            currSnippetLng: language,
            ownerUsername,
            code,
          },
        }),
      );
    } else {
      dispatch(
        actions.openModal({
          type: 'attemptDuplicateSnippet',
          item: {
            currSnippetName: snippetName,
            currSnippetLng: language,
            code,
          },
        }),
      );
    }
  };

  const handleSaveCode = () => {
    if (isAllSaved) {
      saveCode();
      toast.success(tTSC('success'));
      return;
    }
    toast.error(tTSC('error'));
  };

  const handleView = () => {
    if (direction === 'horizontal') {
      dispatch(actions.updateDirection('vertical'));
      return;
    }
    if (direction === 'vertical') {
      dispatch(actions.updateDirection('horizontal'));
    }
  };

  return (
    <Col className="toolbar">
      <Button
        className="btn-icon-only-full-height d-none d-md-inline-block"
        onClick={handleView}
        variant="nofill-body"
      >
        <DisplayIconView />
      </Button>
      <Button
        className="btn-icon-only-full-height"
        onClick={handleDuplicate}
        variant="nofill-body"
      >
        <Files />
      </Button>
      <Button
        className="btn-icon-only-full-height"
        onClick={handleShare}
        variant="nofill-body"
      >
        <BoxArrowUp />
        <span className="visually-hidden">{tSA('share')}</span>
      </Button>
      <Button
        className={`ms-3 btn-run${disabled ? ' running' : ''}`}
        disabled={disabled}
        onClick={onClick}
        variant="primary"
      >
        <PlayFill className="bi" />
        {tSA('run')}
      </Button>
      <Button
        className={`ms-3 btn-run${disabled ? ' running' : ''}`}
        disabled={!isAllSaved}
        onClick={handleSaveCode}
        variant="primary"
      >
        {tSA('save')}
      </Button>
    </Col>
  );
}

export default ActionsToolbar;
