import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { GripVertical } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { actions } from '../../slices/index.js';
import { useAuth, useDebounce, useSnippets } from '../../hooks/index.js';

import CodeEditor from 'src/components/Editor/index.jsx';
import Terminal from 'src/components/Terminal/index.jsx';

import DefaultLoader from 'src/components/Loaders/DefaultLoader.jsx';
import FileToolbar from './FileToolbar.jsx';
import ActionsToolbar from './ActionsToolbar.jsx';

const AUTOSAVE_TIMEOUT = 5000;

function ResizeHandler() {
  return (
    <PanelResizeHandle className="panel-handler">
      <div className="panel-handler-inner">
        <GripVertical className="panel-handler-icon" />
      </div>
    </PanelResizeHandle>
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

  useDebounce(
    () => {
      const editorData = editorDataRef.current;
      if (
        editorData.isLoggedIn &&
        editorData.hasSnippetData &&
        editorData.isReady &&
        !editorData.isAllSaved
      ) {
        saveSnippet(editorData);
      }
    },
    AUTOSAVE_TIMEOUT,
    [isAllSaved],
  );

  const hasViewSnippetParams = snippetApi.hasViewSnippetParams(snippetParams);

  // const startAutoSaveSnippet = (timeout = 1000) => {
  //   console.log('startAutoSaveSnippet');
  //   const tick = async () => {
  //     await saveSnippet(editorDataRef.current);
  //     editorDataRef.current.tickId = setTimeout(tick, timeout);
  //   };

  //   editorDataRef.current.tickId = setTimeout(tick, timeout);
  // };

  // const stopAutoSaveSnippet = () => {
  //   const tickId = editorDataRef.current.tickId;
  //   console.log('stopAutoSaveSnippet', tickId);
  //   clearTimeout(tickId);
  //   saveSnippet(editorDataRef.current);
  // };

  useEffect(() => {
    const initEditor = async () => {
      if (hasViewSnippetParams) {
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

        // if (isLoggedIn) {
        //   startAutoSaveSnippet(AUTOSAVE_TIMEOUT);
        // }
      } else {
        dispatch(actions.resetEditor());
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
    };
  }, []);

  if (!isReady) {
    return (
      <Container
        fluid="xxl"
        className="py-3 editor-page d-flex flex-column gap-3"
      >
        <DefaultLoader />;
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="py-3 editor-page d-flex flex-column gap-3 px-xl-5"
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
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={50}
          minSize={10}
          className="border rounded-3 overflow-hidden"
        >
          <CodeEditor readOnly={!isLoggedIn} />
        </Panel>
        <ResizeHandler />
        <Panel
          minSize={20}
          className="bg-body-secondary rounded-3 overflow-hidden"
          collapsible
        >
          <Terminal />
        </Panel>
      </PanelGroup>
    </Container>
  );
}

export default SnippetPage;
