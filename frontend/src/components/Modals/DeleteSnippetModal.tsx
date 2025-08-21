import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { CheckedSnippetsType, RootReducerType } from 'src/types/slices';
import { useSnippets } from '../../hooks';
import { actions as snippetsActions } from '../../slices/snippetsSlice';
import { actions as checkboxesActions } from '../../slices/checkboxesSlice';

function DeleteSnippetModal({ handleClose, isOpen }) {
  const { checkedSnippets } = useSelector((state: RootReducerType) => state.checkboxes);

  const countChecked = checkedSnippets.filter(
    (snippet) => snippet.isChecked,
  ).length;
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const { t } = useTranslation();

  const handleSnippetDelete = async (currSnippets: CheckedSnippetsType[]) => {
    const checkedIds = currSnippets
      .filter((snippet) => snippet.isChecked)
      .map((snippet) => snippet.id);
    handleClose();
    try {
      await snippetApi.deleteSnippet(checkedIds);
      dispatch(snippetsActions.deleteSnippet(checkedIds));
      dispatch(checkboxesActions.CloseCheckboxes());
    } catch (error) {
      if (!error.isAxiosError) {
        console.log(t('errors.unknown'));
        throw error;
      } else {
        console.log(t('errors.network'));
        throw error;
      }
    }
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>
          {t('modals.deleteSnippet.title.key', { count: countChecked })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.deleteSnippet.body.key', { count: countChecked })}
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-row gap-5 mt-3">
            <Button
              className="flex-fill"
              onClick={handleClose}
              variant="secondary"
            >
              {t('modals.deleteSnippet.button.cancelButton')}
            </Button>
            <Button
              className="flex-fill"
              onClick={() => handleSnippetDelete(checkedSnippets)}
              variant="primary"
            >
              {t('modals.deleteSnippet.button.okButton')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteSnippetModal;
