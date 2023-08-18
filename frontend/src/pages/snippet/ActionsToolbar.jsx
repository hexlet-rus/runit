import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { BoxArrowUp, PlayFill, Share } from 'react-bootstrap-icons';

import { actions } from '../../slices/index.js';
import { useRunButton } from '../../hooks';

function ActionsToolbar({ snippet }) {
  const { t } = useTranslation();
  const { onClick, disabled } = useRunButton();
  const dispatch = useDispatch();
  const { snippetData } = snippet;

  const handleShare = () => {
    dispatch(
      actions.openModal({
        type: 'sharingSnippet',
        item: snippetData,
      }),
    );
  };

  const handleInDevelopment = () => {
    dispatch(actions.openModal({ type: 'inDevelopment' }));
  };

  return (
    <>
      <Button
        className="btn-icon-only-full-height"
        onClick={handleInDevelopment}
        variant="nofill-body"
      >
        <Share />{' '}
        <span className="visually-hidden">{t('snippetActions.duplicate')}</span>
      </Button>
      <Button
        className="btn-icon-only-full-height"
        onClick={handleShare}
        variant="nofill-body"
      >
        <BoxArrowUp />{' '}
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
    </>
  );
}

export default ActionsToolbar;
