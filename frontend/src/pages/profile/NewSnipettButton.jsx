import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/modalSlice';

function NewSnipettButton() {
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });

  const dispatch = useDispatch();
  const handleSnipett = () => {
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };
  return (
    <Button onClick={handleSnipett} variant="outline-primary">
      {tSA('new')}
    </Button>
  );
}

export default NewSnipettButton;
