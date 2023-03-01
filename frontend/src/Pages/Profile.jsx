import React, { useEffect } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSnippets } from '../hooks';
import { actions as modalActions } from '../slices/modalSlice.js';
import { actions as editorActions } from '../slices/editorSlice.js';
import { fetchData } from '../slices/userSlice.js';
import classes from './Profile.module.css';

export function Profile() {
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const snippets = useSelector((state) => state.snippets.snippets);

  const parseDate = (date) => {
    try {
      return new Intl.DateTimeFormat().format(new Date(date));
    } catch {
      return t('profile.successfulLoading');
    }
  };

  const handleDeleteConfirmation = (id) => {
    dispatch(
      modalActions.openModal({
        type: 'confirmDelete',
        item: { id },
      }),
    );
  };

  const handleSnippetRename = (id, name, code) => {
    dispatch(
      modalActions.openModal({
        type: 'renameRepl',
        item: { id, name, code },
      }),
    );
  };

  const handleEditProfile = () => {
    dispatch(
      modalActions.openModal({
        type: 'editProfile',
        item: userInfo,
      }),
    );
  };

  const handleChangePassword = () => {
    dispatch(
      modalActions.openModal({
        type: 'changePassword',
        item: { id: userInfo.id },
      }),
    );
  };

  const handleSnippetShare = (item) => {
    dispatch(
      modalActions.openModal({
        type: 'sharingRepl',
        item,
      }),
    );
  };

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
    <div className="main-content">
      <div className={`${classes.upperLine}`} />
      <div className={`h-100 w-100 px-3 bg-dark ${classes.container}`}>
        <Row className={`${classes.profileContainer}`}>
          <Col className={`col-md-3 px-2 rounded ${classes.profileColumn}`}>
            <div className={`w-100 ${classes.profile}`}>
              <div>
                <h1 className="my-2">{userInfo.login}</h1>
                <div>
                  {`${t('profile.email')} `}
                  <span className="text-muted">{userInfo.email}</span>
                </div>
                {/* "userdata.created_at", "userdata.id" are also available. Add if needed. */}
              </div>
              <div className={`${classes.profileButtons}`}>
                <Button
                  className={`${classes.button}`}
                  onClick={handleEditProfile}
                >
                  <div>
                    <span>{t('profile.editProfileButton')}</span>
                  </div>
                </Button>
                <Button
                  className={`${classes.button}`}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <div>
                    <span>{t('profile.copyProfileButton')} </span>
                  </div>
                </Button>
              </div>
              <Button
                className={`${classes.button}`}
                onClick={handleChangePassword}
              >
                <div>
                  <span>{t('modals.changePassword.header')}</span>
                </div>
              </Button>
              <div className="gap" style={{ marginBottom: 'auto' }} />
              <div
                className="d-flex flex-md-column w-100"
                style={{ alignItems: 'center' }}
              >
                <span>{t('profile.createdAt')}</span>
                <span>{parseDate(userInfo.created_at)}</span>
              </div>
            </div>
          </Col>
          <Col className={`rounded w-100 ${classes.replsCol}`}>
            <div
              className={`w-100 h-100 d-flex flex-column ${classes.repls}`}
              style={{ paddingTop: '30px' }}
            >
              <Row
                className="my-2 flex-md-row"
                style={{ borderBottom: '1px solid #293746' }}
              >
                <div className="d-flex justify-content-between align-items-center flex-md-row w-100">
                  <h2>{t('profile.replsHeader')}</h2>
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
                  <Col xs lg="3" key={id}>
                    <Card style={{ border: 0 }}>
                      <Card.Header
                        className={`d-flex justify-content-between ${classes.snippetHeader}`}
                      >
                        <p className="m-0 p-2">{name}</p>
                        <Dropdown
                          className={`${classes.snippetTools}`}
                          id="snippet"
                        >
                          <DropdownToggle
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className={`flex-grow-0 btn btn-primary ${classes.dropdown}`}
                          >
                            <ThreeDots color="white" size="16" />
                            <span className="visually-hidden">
                              {t('profile.editSnippet')}
                            </span>
                          </DropdownToggle>
                          <Dropdown.Menu className={`${classes.dropdownMenu}`}>
                            <Dropdown.Item
                              className={`${classes.dropdownItem}`}
                              onClick={() =>
                                handleSnippetRename(id, name, code)
                              }
                            >
                              {t('profile.renameReplButton')}
                            </Dropdown.Item>
                            <Dropdown.Item
                              className={`${classes.dropdownItem}`}
                              onClick={() => handleDeleteConfirmation(id)}
                            >
                              {t('profile.deleteReplButton')}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Card.Header>
                      <Card.Body className={`${classes.snippetBody}`}>
                        <Card.Text>
                          {/* TODO: add a screenshot for snippet */}
                        </Card.Text>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            className={`btn-sm p-1 ${classes.button}`}
                            variant="primary"
                            href={snippetApi.genViewSnippetLink(
                              userInfo.login,
                              slug,
                            )}
                          >
                            {t('profile.openReplButton')}
                          </Button>
                          <Button
                            className={`btn-sm p-1 ${classes.button}`}
                            variant="primary"
                            onClick={() =>
                              handleSnippetShare({
                                name,
                                id,
                                link: snippetApi.genViewSnippetLink(
                                  userInfo.login,
                                  slug,
                                ),
                                embedLink: snippetApi.genEmbedSnippetLink(
                                  userInfo.login,
                                  slug,
                                ),
                              })
                            }
                          >
                            {t('profile.shareReplButton')}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
