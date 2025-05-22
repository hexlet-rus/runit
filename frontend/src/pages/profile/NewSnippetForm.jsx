import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice.js';

import SnippetCardWrapper from './SnippetCardWrapper';

function NewSnippetForm() {
  const dispatch = useDispatch();

  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });

  const handleOpen = () => {
    dispatch(modalActions.openModal({ type: 'newSnippet' }));
  };

  return (
    <SnippetCardWrapper>
      <button
        type="button"
        className="new-snippet h-100 w-100"
        onClick={handleOpen}
      >
        <div>{tSA('new')}</div>
      </button>
    </SnippetCardWrapper>
  );
}

export default NewSnippetForm;
