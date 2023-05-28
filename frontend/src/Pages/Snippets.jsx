import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../slices/modalSlice.js';
import { actions as editorActions } from '../slices/editorSlice.js';
import { fetchData } from '../slices/userSlice.js';
import classes from './Profile.module.css';
import Snippet from '../components/Snippet/Snippet.jsx';

function Snippets() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const snippets = useSelector((state) => state.snippets.snippets);

  const handleGenNewRepl = () => {
    dispatch(editorActions.resetCode());
    dispatch(modalActions.openModal({ type: 'genNewRepl' }));
  };

  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .catch((serializedError) => {
        const error = new Error(serializedError.message);
        error.name = serializedError.name;
        throw error;
      });
  }, []);

  return (
    <Col className={`rounded w-100 ${classes.replsCol}`}>
      <div
        className={`w-100 h-100 d-flex flex-column ${classes.repls}`}
        style={{ paddingTop: '50px' }}
      >
        <Row
          className="my-2 flex-md-row"
          style={{ borderBottom: '1px solid #293746', paddingBottom: '20px' }}
        >
          <div className="d-flex justify-content-between align-items-center flex-md-row w-100">
            <h1>{t('profile.replsHeader')}</h1>
            <div className={`${classes.newRepl}`}>
              <Button
                className={`${classes.newReplButton}`}
                onClick={handleGenNewRepl}
              >
                {t('profile.newReplButton')}
              </Button>
            </div>
          </div>
        </Row>
        <Row xs={1} md={2} className="g-4 my-1">
          {snippets.map(({ id, slug, name, code }) => (
            <Snippet key={id} id={id} slug={slug} name={name} code={code} />
          ))}
        </Row>
      </div>
    </Col>
  );
}

export default Snippets;
