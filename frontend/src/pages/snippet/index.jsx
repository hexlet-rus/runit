import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useLocation, useParams } from 'react-router';
import { useDebounce, useMediaQuery, useTernaryDarkMode } from 'usehooks-ts';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useAuth, useSnippets } from '../../hooks/index.js';
import { actions } from '../../slices/index.js';

import CodeEditor from '../../components/Editor/index.jsx';
import HTMLPreview from '../../components/HTMLPreview/HTMLPreview.jsx';
import DefaultLoader from '../../components/Loaders/DefaultLoader.jsx';
import Terminal from '../../components/Terminal/index.jsx';
import ActionsToolbar from './ActionsToolbar.jsx';
import AuthWarning from './AuthWarning.jsx';
import FileToolbar from './FileToolbar.jsx';

const AUTOSAVE_TIMEOUT = 1000;

function ResizeHandler({ direction = 'horizontal' }) {
  return (
    <PanelResizeHandle className={`panel-handler panel-handler-${direction}`} />
  );
}

function SnippetPage() {
  const { isDarkMode } = useTernaryDarkMode();
  const { isLoggedIn } = useAuth();
  const { isAllSaved, isReady, code, hasSnippetData, snippetData, direction } =
    useSelector((state) => state.editor);
  const snippetApi = useSnippets();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentLanguage } = useSelector((state) => state.languages);

  const snippetParams = useMemo(
    () => ({
      username: params.username,
      slug: params.slug,
    }),
    [params.slug, params.username],
  );

  const editorDataRef = useRef(null);
  editorDataRef.current = {
    isReady,
    hasSnippetData,
    code,
    snippetData,
    isAllSaved,
    isLoggedIn,
  };

  const saveSnippet = useCallback(
    async (editorData) => {
      await snippetApi.updateSnippet(editorData.snippetData.id, {
        code: editorData.code,
        name: editorData.snippetData.name,
      });
      dispatch(actions.setCodeAndSavedCode(editorData.code));
    },
    [dispatch, snippetApi],
  );

  const debouncedValue = useDebounce(code, AUTOSAVE_TIMEOUT);

  const isNotMobile = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (isNotMobile) {
      dispatch(actions.updateDirection('horizontal'));
    } else {
      dispatch(actions.updateDirection('vertical'));
    }
  }, [dispatch, isNotMobile, location]);

  useEffect(() => {
    const editorData = editorDataRef.current;
    if (
      editorData.isLoggedIn &&
      editorData.hasSnippetData &&
      editorData.isReady &&
      !editorData.isAllSaved
    ) {
      saveSnippet(editorData);
    }
  }, [debouncedValue, saveSnippet]);

  const hasViewSnippetParams = snippetApi.hasViewSnippetParams(snippetParams);

  useEffect(() => {
    const initEditor = async () => {
      if (hasViewSnippetParams) {
        const response =
          await snippetApi.getSnippetDataByViewParams(snippetParams);
        // #TODO: remove check once redirect to 404 is configured
        if (response.length === 0) {
          dispatch(actions.openModal({ type: 'snippetUnavailable' }));
        } else {
          dispatch(
            actions.setActiveSnippetData({
              id: response.id,
              name: response.name,
              ownerUsername: snippetParams.username,
              slug: response.slug,
              language: response.language,
            }),
          );
          dispatch(actions.changeLanguage(response.language));
          dispatch(actions.setCodeAndSavedCode(response.code));
        }
      }
    };

    initEditor();

    return () => {
      const editorData = editorDataRef.current;
      if (
        editorData.isLoggedIn &&
        editorData.hasSnippetData &&
        editorData.isReady &&
        !editorData.isAllSaved
      ) {
        saveSnippet(editorData);
      }

      dispatch(actions.resetEditor());
    };
  }, [dispatch, hasViewSnippetParams, saveSnippet, snippetApi, snippetParams]);

  if (!isReady) {
    return (
      <Container className="py-3 editor-page d-flex flex-column gap-3">
        <DefaultLoader />
      </Container>
    );
  }

  return (
    <Container
      className="py-3 editor-page d-flex flex-column gap-3 px-xl-3 bg-body-secondary"
      fluid
    >
      <Row className="justify-content-between align-items-center" xs="auto">
        <FileToolbar
          snippet={{ isAllSaved, isReady, code, hasSnippetData, snippetData }}
        />
        {!isLoggedIn && <AuthWarning />}
        <ActionsToolbar
          snippet={{ isAllSaved, isReady, code, hasSnippetData, snippetData }}
        />
      </Row>
      <PanelGroup direction={direction}>
        <Panel
          className="bg-body-secondary rounded-3 overflow-hidden"
          defaultSize={50}
          minSize={20}
        >
          <CodeEditor readOnly={!isLoggedIn} />
        </Panel>
        <ResizeHandler direction={direction} />
        <Panel
          className={`${
            isDarkMode ? 'bg-dark' : 'bg-white'
          } rounded-3 overflow-hidden`}
          collapsible
          minSize={10}
        >
          {currentLanguage === 'html' ? (
            <div className="bg-white h-100">
              <HTMLPreview code={code} />
            </div>
          ) : (
            <Terminal />
          )}
        </Panel>
      </PanelGroup>
    </Container>
  );
}

export default SnippetPage;
