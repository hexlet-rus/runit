import React, { useEffect } from 'react';
import { Button, Form, Modal, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClipboardJS from 'clipboard';

import { useSnippets } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice.js';

function ShareRepl() {
  const snippetData = useSelector(({ modal }) => modal.item);
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const { t } = useTranslation();

  useEffect(() => {
    const clipboard = new ClipboardJS('.button-copy');

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      show
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="text-white bg-dark border-secondary"
      >
        <Modal.Title>{snippetData.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark">
        <Tabs
          defaultActiveKey="share-link"
          className="mb-3 border-secondary"
          fill
        >
          <Tab eventKey="share-link" title={t('modals.share.linkTab')}>
            <Form.Group className="mb-3">
              <Form.Label
                controlid="name"
                label={t('modals.share.snippetLinkLabel')}
              />
              <Form.Control
                className="text-white bg-dark border-secondary"
                readOnly
                name="name"
                placeholder={t('modals.share.snippetLinkLabel')}
                value={snippetData.link}
                id="link-input"
              />
            </Form.Group>
            <div className="d-flex mt-4 justify-content-end">
              <Button
                variant="primary"
                className="button-copy"
                data-clipboard-action="copy"
                data-clipboard-target="#link-input"
                style={{ width: '45%' }}
              >
                {t('modals.share.copyLinkButton')}
              </Button>
            </div>
          </Tab>
          <Tab
            className="text-white test"
            eventKey="share-embed"
            title={t('modals.share.embedTab')}
          >
            <Form.Group className="mb-3">
              <Form.Label
                controlid="name"
                label={t('modals.share.snippetEmbedLabel')}
                className="text-white"
              />
              <textarea
                className="text-white bg-dark w-100 border-secondary overflowX"
                wrap="off"
                readOnly
                name="name"
                placeholder={t('modals.share.snippetEmbedLabel')}
                value={snippetApi.genEmbedFrame(snippetData.embedLink)}
                id="embed-input"
              />
            </Form.Group>
            <div className="d-flex mt-4 justify-content-end">
              <Button
                variant="primary"
                className="button-copy"
                data-clipboard-action="copy"
                data-clipboard-target="#embed-input"
                style={{ width: '35%' }}
              >
                {t('modals.share.copyEmbedButton')}
              </Button>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ShareRepl;
