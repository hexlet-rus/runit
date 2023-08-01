/* eslint-disable no-shadow */
import React from 'react';
import { Col, Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { useSnippets } from '../../hooks';
import classes from './Snippet.module.css';

export default function Snippet({ id, slug, name, code }) {
  const snippetApi = useSnippets();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSnippetRename = (id, name, code) => {
    dispatch(
      modalActions.openModal({
        type: 'renameRepl',
        item: { id, name, code },
      }),
    );
  };

  const handleDeleteConfirmation = (id) => {
    dispatch(
      modalActions.openModal({
        type: 'confirmDelete',
        item: { id },
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

  return (
    <Col xs lg="3" key={id}>
      <Card style={{ border: 0 }}>
        <Card.Header
          className={`d-flex justify-content-between ${classes.snippetHeader}`}
        >
          <p className="m-0 p-2">{name}</p>
          <Dropdown className={`${classes.snippetTools}`} id="snippet">
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
                onClick={() => handleSnippetRename(id, name, code)}
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
          <Card.Text>{/* TODO: add a screenshot for snippet */}</Card.Text>
          <div className="d-flex justify-content-center gap-2">
            <Button
              className={`btn-sm p-1 ${classes.button}`}
              variant="primary"
              href={snippetApi.genViewSnippetLink(userInfo.login, slug)}
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
                  link: snippetApi.genViewSnippetLink(userInfo.login, slug),
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
  );
}
