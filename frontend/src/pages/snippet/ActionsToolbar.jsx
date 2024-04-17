import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BoxArrowUp, Files, PlayFill, DistributeHorizontal, DistributeVertical } from 'react-bootstrap-icons';
import { actions } from '../../slices';
import { useAuth, useRunButton } from '../../hooks';

function ActionsToolbar({ snippet }) {
  const { t } = useTranslation();
  const { onClick, disabled } = useRunButton();
  const dispatch = useDispatch();
  const { snippetData, code } = snippet;
  const { name: snippetName, ownerUsername } = snippetData;
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
            code,
          },
        }),
      );
    }
  };

  const DisplayIconView = () => {
    switch (direction) {
      case 'horizontal':
        return <DistributeHorizontal />;
      case 'vertical':
        return <DistributeVertical />;
      default:
        return <DistributeHorizontal />;
    }
  }

  const handleView = () => {
    
    if (direction === 'horizontal') {
      dispatch(actions.updateDirection('vertical'));
      return;
    }
    if (direction === 'vertical') {
      dispatch(actions.updateDirection('horizontal'));
      return;
    }
  }

  return (
    <Col className="toolbar">
      <Button 
        className="btn-icon-only-full-height d-none d-md-inline-block"
        onClick={handleView}
        variant="nofill-body"
      >
      <DisplayIconView/>
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
        <span className="visually-hidden">{t('snippetActions.share')}</span>
      </Button>
      <Button
        className={`ms-3 btn-run${disabled ? ' running' : ''}`}
        disabled={disabled}
        onClick={onClick}
        variant="primary"
      >
        <PlayFill className="bi" />
        {t('snippetActions.run')}
      </Button>
    </Col>
  );
}

export default ActionsToolbar;
