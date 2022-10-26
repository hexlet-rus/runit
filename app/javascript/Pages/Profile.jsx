import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSnippets } from '../hooks';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import routes from '../routes.js';

import { actions as modalActions } from '../slices/modalSlice.js';

import classes from './Profile.module.css';

export function Profile() {
  const [snippets, setSnippets] = useState([]);
  const { t } = useTranslation();
  const [userdata, setUserdata] = useState([]);
  const snippetApi = useSnippets();
  const dispatch = useDispatch();

  const parseDate = (date) => {
    try {
      return new Intl.DateTimeFormat().format(new Date(date));
    } catch {
      return 'date is loading!';
    }
  };

  useEffect(() => {
    const fetchUserSnippets = async () => {
      const response = await axios.get(routes.userProfilePath());
      setUserdata(response.data.currentUser);
      setSnippets(response.data.snippets);
    };
    fetchUserSnippets();
  }, []);

  return (
    <div className="main-content">
      <div className={`${classes.upperLine}`}></div>
      <div className={`px-3 ${classes.container}`}>
        <Row className={`${classes.profileContainer}`}>
          <Col className={`col-md-3 px-2 rounded ${classes.profileColumn}`}>
            <div className={`w-100 ${classes.profile}`}>
              <div>
                <h1 className="my-2">{userdata.name}</h1>
                <div>
                  {t('profile.email')}
                  <span className="text-muted">{userdata.email}</span>
                </div>

                {/* "userdata.created_at", "userdata.id" are also available. Add if needed. */}
              </div>
              <div className={`${classes.profileButtons}`}>
                <Button className={`${classes.button}`}>
                  <div>
                    <span>{t('profile.editProfileButton')}</span>
                  </div>
                  {/* TODO: add edit tool */}
                </Button>
                <Button className={`${classes.button}`}>
                  <div>
                    <span>{t('profile.copyProfileButton')} </span>
                  </div>
                  {/* TODO: add ability to copy user profile link */}
                </Button>
              </div>
              <div className="gap" style={{ marginBottom: 'auto' }}></div>
              <div
                className="d-flex flex-md-column w-100"
                style={{ alignItems: 'center' }}
              >
                <span>{'Created'}</span>
                <span>{parseDate(userdata.created_at)}</span>
              </div>
            </div>
          </Col>
          <Col className={`rounded w-100 ${classes.replsCol}`}>
            <div className={`${classes.newRepl}`}>
              <Button
                className={`${classes.newReplButton}`}
                onClick={() =>
                  dispatch(modalActions.openModal({ type: 'savingRepl' }))
                }
              >
                {t('profile.newReplButton')}
              </Button>
            </div>
            <div className={`w-100 h-100 d-flex flex-column ${classes.repls}`}>
              <Row
                className="my-2 flex-md-row"
                style={{ borderBottom: '1px solid #293746' }}
              >
                <div className="flex-md-column w-auto">
                  <h2>{t('profile.replsHeader')}</h2>
                </div>
              </Row>
              <Row xs={1} md={2} className="g-4 my-1">
                {snippets.map(({ id, name }) => (
                  <Col xs lg="3" key={id}>
                    <Card style={{ border: 0 }}>
                      <Card.Header className={`${classes.snippetHeader}`}>
                        {name}
                      </Card.Header>
                      <Card.Body className={`${classes.snippetBody}`}>
                        <Card.Text>
                          {/* TODO: add a screenshot for snippet */}
                        </Card.Text>
                        <Dropdown
                          className={`mt-1 ${classes.snippetTools}`}
                          id="snippet"
                        >
                          <Button
                            className={`${classes.button}`}
                            variant="primary"
                            href={snippetApi.genSnippetLink(
                              snippetApi.encodeId(id),
                            )}
                          >
                            {t('profile.openReplButton')}
                          </Button>
                          <div
                            className="gap"
                            style={{ marginLeft: 'auto' }}
                          ></div>
                          <Dropdown.Toggle
                            aria-expanded="false"
                            className={`flex-grow-0 dropdown-toggle-split ${classes.dropdown}`}
                          >
                            <span className="visually-hidden">
                              Edit the snippet
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className={`${classes.dropdownMenu}`}>
                            <Dropdown.Item
                              className={`${classes.dropdownItem}`}
                            >
                              Rename
                            </Dropdown.Item>
                            <Dropdown.Item
                              className={`${classes.dropdownItem}`}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
