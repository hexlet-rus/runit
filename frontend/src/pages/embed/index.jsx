import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Pencil, PlayFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useRunButton, useSnippets } from '../../hooks';
import routes from '../../routes.js';
import { actions } from '../../slices/index.js';

import DefaultLoader from 'src/components/Loaders/DefaultLoader.jsx';
import Logo from '../../assets/images/RunITLogo.svg';
import CodeEditor from '../../components/Editor/index.jsx';
import Terminal from '../../components/Terminal/index.jsx';

const EmbeddedPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const { isReady } = useSelector((state) => state.editor);
  const snippetParams = {
    username: params.username,
    slug: params.slug,
  };
  const snippetApi = useSnippets();
  const { onClick, disabled } = useRunButton();

  const snippetLink = snippetApi.genViewSnippetLink(
    snippetParams.username,
    snippetParams.slug,
  );

  useEffect(() => {
    const initEditor = async () => {
      const response = await snippetApi.getSnippetDataByViewParams(
        snippetParams,
      );
      dispatch(
        actions.setActiveSnippetData({
          id: response.id,
          name: response.name,
          ownerUsername: snippetParams.username,
          slug: response.slug,
        }),
      );
      dispatch(actions.setCodeAndSavedCode(response.code));
    };

    initEditor();
  }, []);

  return (
    <>
      <Navbar
        expand="md"
        bg="dark-subtle"
        data-bs-theme="dark"
        className="flex-row flex-nowrap px-1 px-sm-2 px-md-3"
      >
        <Navbar.Brand as={Link} to={routes.landingPath()}>
          <Image src={Logo} alt={t('navbar.mainLabel')} />
        </Navbar.Brand>
        <Nav as="ul" className="flex-row flex-nowrap align-items-center">
          <Nav.Item as="li">
            <Button
              as="a"
              href={snippetLink}
              target="_blank"
              rel="noreferrer"
              variant="outline-primary"
            >
              <Pencil className="bi" />{' '}
              <span className="d-none d-sm-inline small">
                {t('snippetActions.openOnRunIT')}
              </span>
            </Button>
          </Nav.Item>
          <Nav.Item as="li">
            <Button
              variant="primary"
              className={`btn-run ms-1 ms-sm-3${disabled ? ' running' : ''}`}
              disabled={disabled}
              onClick={onClick}
            >
              <PlayFill className="bi" />
              <span className="flex-shrink-1 text-truncate">
                {t('snippetActions.run')}
              </span>
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      <div className="embed-page-wrapper">
        <div className="embed-page-panel">
          {isReady ? <CodeEditor readOnly /> : <DefaultLoader />}
        </div>

        <div className="embed-page-panel bg-body-secondary">
          <Terminal />
        </div>
      </div>
    </>
  );
};

export default EmbeddedPage;
