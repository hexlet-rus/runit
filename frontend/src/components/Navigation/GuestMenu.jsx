import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { GridFill } from 'react-bootstrap-icons';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { actions } from '../../slices/modalSlice.js';

function GuestMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleNewSnippet = () => {
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };
  const handleSignInButton = () => {
    dispatch(actions.openModal({ type: 'signingIn' }));
  };

  const handleSignUpButton = () => {
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
        <span className="visually-hidden">{t('profileActions.header')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        <li>
          <Dropdown.Item as={Button} onClick={handleNewSnippet}>
            {t('snippetActions.new')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={handleSignUpButton}>
            {t('signUp.registerButton')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={handleSignInButton}>
            {t('profileActions.signIn')}
          </Dropdown.Item>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default GuestMenu;
