import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { GridFill } from 'react-bootstrap-icons';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { actions } from '../../slices/modalSlice.js';

function GuestMenu() {
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const { t: tSU } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });
  const dispatch = useDispatch();

  const handleNewSnippet = () => {
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };

  const handleSignInButton = () => {
    dispatch(actions.openModal({ type: 'signingIn' }));
  };

  const handleRegButton = () => {
    dispatch(actions.openModal({ type: 'signingUp' }));
  };

  return (
    <Dropdown align="end" as="li" title="User Menu">
      <Dropdown.Toggle
        as={Button}
        className="d-flex p-0 px-lg-2 align-items-center nav-link"
        variant="link"
      >
        <div className="snippet-logo">
          <GridFill className="bi" />
        </div>
        <span className="visually-hidden">{tPA('header')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        <li>
          <Dropdown.Item as={Button} onClick={handleNewSnippet}>
            {tSA('new')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={handleSignInButton}>
            {tSU('signIn')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={handleRegButton}>
            {tSU('signUp')}
          </Dropdown.Item>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default GuestMenu;
