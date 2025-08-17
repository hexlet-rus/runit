import { Check2Square, XLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { actions as checkboxesActions } from '../../slices/checkboxesSlice';
import type { RootReducerType } from 'src/types/slices';

function SnippetCheck() {
  const { isCheckboxesOpen } = useSelector((state: RootReducerType) => state.checkboxes);
  const { t } = useTranslation();
  const { snippets } = useSelector((state: RootReducerType) => state.snippets);
  const isCreateSnippet = snippets.length > 0;
  const dispatch = useDispatch();

  const handleCloseCheckboxes = () => {
    dispatch(checkboxesActions.CloseCheckboxes());
  };

  const handleOpenCheckboxes = () => {
    dispatch(checkboxesActions.OpenCheckboxes());
  };

  return (
    <div className={`${isCreateSnippet ? '' : 'd-none'}`}>
      {isCheckboxesOpen ? (
        <Button onClick={handleCloseCheckboxes} variant="outline-primary">
          {t('snippetActions.cancelButton')} <XLg />
        </Button>
      ) : (
        <Button onClick={handleOpenCheckboxes} variant="outline-primary">
          {t('snippetActions.select')} <Check2Square />
        </Button>
      )}
    </div>
  );
}

export default SnippetCheck;
