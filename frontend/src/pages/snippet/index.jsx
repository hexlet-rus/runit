import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebounce, useMediaQuery } from 'usehooks-ts';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { actions } from '../../slices/index.js';
import { useAuth, useSnippets } from '../../hooks/index.js';

import CodeEditor from 'src/components/Editor/index.jsx';
import Terminal from 'src/components/Terminal/index.jsx';

import DefaultLoader from 'src/components/Loaders/DefaultLoader.jsx';
import FileToolbar from './FileToolbar.jsx';
import ActionsToolbar from './ActionsToolbar.jsx';

const AUTOSAVE_TIMEOUT = 1000;

function ResizeHandler({ direction = 'horizontal' }) {
  return (
    <PanelResizeHandle className={`panel-handler panel-handler-${direction}`} />
  );
}

function SnippetPage() {
  const { isLoggedIn } = useAuth();
  const { isAllSaved, isReady, code, hasSnippetData, snippetData } =
    useSelector((state) => state.editor);
  const snippetApi = useSnippets();
  const params = useParams();
  const dispatch = useDispatch();

  const snippetParams = {
    username: params.username,
    slug: params.slug,
  };

  const editorDataRef = useRef(null);
  editorDataRef.current = {
    isReady,
    hasSnippetData,
    code,
    snippetData,
    isAllSaved,
    isLoggedIn,
  };

  const saveSnippet = async (editorData) => {
    await snippetApi.updateSnippet(editorData.snippetData.id, {
      code: editorData.code,
      name: editorData.snippetData.name,
    });
    dispatch(actions.setCodeAndSavedCode(editorData.code));
  };

  const debouncedValue = useDebounce(code, AUTOSAVE_TIMEOUT);

  const direction = useMediaQuery('(min-width: 768px)')
    ? 'horizontal'
    : 'vertical';

  useEffect(() => {
    console.log('try');
    const editorData = editorDataRef.current;
    if (
      editorData.isLoggedIn &&
      editorData.hasSnippetData &&
      editorData.isReady &&
      !editorData.isAllSaved
    ) {
      saveSnippet(editorData);
    }
  }, [debouncedValue]);

  const hasViewSnippetParams = snippetApi.hasViewSnippetParams(snippetParams);

  useEffect(() => {
    const initEditor = async () => {
      if (hasViewSnippetParams) {
        const response = await snippetApi.getSnippetDataByViewParams(
          snippetParams,
        );
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
            }),
          );
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
  }, []);

  if (!isReady) {
    return (
      <Container
        fluid="xxl"
        className="py-3 editor-page d-flex flex-column gap-3"
      >
        <DefaultLoader />
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="py-3 editor-page d-flex flex-column gap-3 px-xl-3 bg-body-secondary"
    >
      <Row className="align-items-center">
        <Col className="toolbar gap-3">
          <FileToolbar
            snippet={{ isAllSaved, isReady, code, hasSnippetData, snippetData }}
          />
        </Col>
        <Col xs="auto" className="toolbar">
          <ActionsToolbar
            snippet={{ isAllSaved, isReady, code, hasSnippetData, snippetData }}
          />
        </Col>
      </Row>
      <PanelGroup direction={direction}>
        <Panel
          defaultSize={50}
          minSize={20}
          className="bg-body-secondary rounded-3 overflow-hidden"
        >
          <CodeEditor readOnly={!isLoggedIn} />
        </Panel>
        <ResizeHandler direction={direction} />
        <Panel
          minSize={10}
          className="bg-body rounded-3 overflow-hidden"
          collapsible
        >
          <Terminal />
        </Panel>
      </PanelGroup>
    </Container>
  );
}

export default SnippetPage;
