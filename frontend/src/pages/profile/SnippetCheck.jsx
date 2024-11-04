import { Check2Square, XLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { actions as checkboxesActions } from '../../slices/checkboxesSlice.js';

function SnippetCheck() {
  const { isCheckboxesOpen } = useSelector((state) => state.snippets);
  const { t } = useTranslation();
  const { snippets } = useSelector((state) => state.snippets);
  const isCreateSnippet = snippets.length > 0;
  const dispatch = useDispatch();

  const handleCloseCheckboxes = () => {
    dispatch(snippetsActions.CloseCheckboxes());
  };

  const handleOpenCheckboxes = () => {
    dispatch(snippetsActions.OpenCheckboxes());
  };

  return (
    <div className={`${isCreateSnippet ? '' : 'd-none'}`}>
      {isCheckboxesOpen ? (
        <Button variant="outline-primary" onClick={handleCloseCheckboxes}>
          {t('snippetActions.cancelButton')} <XLg />
        </Button>
      ) : (
        <Button variant="outline-primary" onClick={handleOpenCheckboxes}>
          {t('snippetActions.select')} <Check2Square />
        </Button>
      )}
    </div>
  );
}

export default SnippetCheck;
