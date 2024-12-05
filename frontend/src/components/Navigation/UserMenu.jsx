import { useEffect, useState } from 'react';
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
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userInfo.username);

  const handleNewSnippet = () => {
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };

  // The following code checks if the Github profile picture exists
  const imageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const [githubImageExists, setGithubExists] = useState(false);

  useEffect(() => {
    const url = `https://github.com/${username}.png`;
    imageExists(url).then((exists) => setGithubExists(exists));
  }, [username]);

  // This function takes the first letter of the username and converts it to uppercase
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase();
  };

  return (
    <Dropdown align="end" as="li" title="User Menu">
      <Dropdown.Toggle
        as={Button}
        className="d-flex p-0 px-lg-2 align-items-center nav-link"
        variant="link"
      >
        <div className="logo-height">
          {githubImageExists ? (
            <img
              alt="Github Profile"
              src={`https://github.com/${username}.png`}
              style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
              }}
            />
          ) : (
            <Avatar username={capitalizeFirstLetter(username)} />
          )}
        </div>
        <span className="visually-hidden">{tPA('header')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        <Dropdown.Header as="li">{username}</Dropdown.Header>
        <li>
          <Dropdown.Item as={Button} onClick={handleNewSnippet}>
            {tSA('new')}
          </Dropdown.Item>
        </li>
        {/* TODO: uncomment and implement share profile, when public profiles will be implemented */}
        {/* <li>
          <Dropdown.Item as={Button} onClick={handleInDevelopment}>
            {tPA('share')}
          </Dropdown.Item>
        </li> */}
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Link} to={routes.settingsPagePath()}>
            {tPA('settings')}
          </Dropdown.Item>
        </li>
        <Dropdown.Divider />
        <li>
          <Dropdown.Item as={Button} onClick={signOut}>
            {tPA('logout')}
          </Dropdown.Item>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default UserMenu;
