import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { actions } from '../../slices/modalSlice.js';
import routes from '../../routes.js';

import Avatar from '../Avatar/index.jsx';

function UserMenu() {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userInfo.username);

  const handleInDevelopment = () => {
    dispatch(actions.openModal({ type: 'inDevelopment' }));
  };
  const handleNewSnippet = () => {
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };

  return (
    <Dropdown align="end" as="li">
      <Dropdown.Toggle
        as={Button}
        className="d-flex p-0 px-lg-2 align-items-center nav-link"
        variant="link"
      >
        <div className="logo-height">
          <Avatar username={username} />
        </div>
        <span className="visually-hidden">{t('profileActions.header')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        <Dropdown.Header as="li">{username}</Dropdown.Header>
        <li>
          <Dropdown.Item as={Button} onClick={handleNewSnippet}>
            {t('snippetActions.new')}
          </Dropdown.Item>
        </li>
        <li>
          <Dropdown.Item as={Button} onClick={handleInDevelopment}>
            {t('profileActions.share')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Link} to={routes.settingsPagePath()}>
            {t('profileActions.settings')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={signOut}>
            {t('profileActions.logout')}
          </Dropdown.Item>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default UserMenu;
