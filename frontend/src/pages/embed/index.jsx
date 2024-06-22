import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { PencilSquare, PlayFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useRunButton, useSnippets } from '../../hooks';
import routes from '../../routes.js';
import { actions } from '../../slices/index.js';

import Logo from '../../assets/images/RunITLogo.svg';
import CodeEditor from '../../components/Editor/index.jsx';
import DefaultLoader from '../../components/Loaders/DefaultLoader.jsx';
import Terminal from '../../components/Terminal/index.jsx';

function EmbeddedPage() {
  const { t: tN } = useTranslation('translation', { keyPrefix: 'navbar' });
  const { t: tSA } = useTranslation('translation', {
    keyPrefix: 'snippetActions',
  });
  const params = useParams();
  const dispatch = useDispatch();
  const { isReady } = useSelector((state) => state.editor);
  // TODO: перебрать все useMemo и useCallback. Вряд ли они требуются и нужно все перекомпоновать
  const snippetParams = useMemo(
    () => ({
      username: params.username,
      slug: params.slug,
    }),
    [params.slug, params.username],
  );
  const snippetApi = useSnippets();
  const { onClick, disabled } = useRunButton();

  const snippetLink = snippetApi.genViewSnippetLink(
    snippetParams.username,
    snippetParams.slug,
  );

  useEffect(() => {
    const initEditor = async () => {
      const response =
        await snippetApi.getSnippetDataByViewParams(snippetParams);
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
  }, [dispatch, snippetApi, snippetParams]);

  return (
    <>
      <Navbar
        bg="dark-subtle"
        className="flex-row flex-nowrap px-2 px-md-3"
        data-bs-theme="dark"
      >
        <Navbar.Brand as={Link} className="me-auto" to={routes.landingPath()}>
          <Image alt={tN('mainLabel')} className="logo-height" src={Logo} />
        </Navbar.Brand>
        <Nav as="ul" className="flex-row flex-nowrap align-items-center">
          <Nav.Item as="li">
            <Button
              as="a"
              href={snippetLink}
              rel="noreferrer"
              target="_blank"
              variant="outline-secondary"
            >
              <PencilSquare className="bi" />{' '}
              <span className="d-none d-sm-inline small">
                {tSA('openOnRunIT')}
              </span>
            </Button>
          </Nav.Item>
          <Nav.Item as="li">
            <Button
              className={`btn-run ms-1 ms-sm-3${disabled ? ' running' : ''}`}
              disabled={disabled}
              onClick={onClick}
              variant="primary"
            >
              <PlayFill className="bi" />
              <span className="flex-shrink-1 text-truncate">{tSA('run')}</span>
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
}

export default EmbeddedPage;
