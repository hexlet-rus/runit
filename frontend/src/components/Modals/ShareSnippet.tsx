import type { RootReducerType } from 'src/types/slices';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClipboardJS from 'clipboard';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Clipboard } from 'react-bootstrap-icons';

import { useSnippets } from '../../hooks';

function ShareSnippet({ isOpen, handleClose }) {
  const { name, slug, ownerUsername } = useSelector(
    ({ modal }: RootReducerType) => modal.item,
  );
  const snippetApi = useSnippets();
  const { t: tMS } = useTranslation('translation', {
    keyPrefix: 'modals.share',
  });

  useEffect(() => {
    const clipboard = new ClipboardJS('.button-copy');

    return () => {
      clipboard.destroy();
    };
  }, []);

  const snippetLink = snippetApi.genViewSnippetLink(ownerUsername, slug);
  const embedCode = snippetApi.genEmbedFrame(
    snippetApi.genEmbedSnippetLink(ownerUsername, slug),
  );

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="pb-3" closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="link-input">
          <Form.Label>{tMS('snippetLinkLabel')}</Form.Label>
          <div className="input-group-inline-button">
            <Form.Control
              className="text-secondary"
              // onClick={(e) => e.target.select()}
              readOnly
              type="url"
              value={snippetLink}
            />
            <Button
              className="button-copy"
              data-clipboard-action="copy"
              data-clipboard-target="#link-input"
              variant="nofill-body"
            >
              <Clipboard className="bi" />
              <span className="visually-hidden">{tMS('copyLinkButton')}</span>
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="mt-5" controlId="embed-input">
          <Form.Label>{tMS('snippetEmbedLabel')}</Form.Label>
          <div className="input-group-inline-button">
            <Form.Control
              as="textarea"
              className="w-100 embed-code text-secondary overflow-x-hidden"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              readOnly
              rows={embedCode.match(/^/gm).length}
              value={embedCode}
              wrap="off"
            />
            <Button
              className="button-copy"
              data-clipboard-action="copy"
              data-clipboard-target="#embed-input"
              variant="nofill-body"
            >
              <Clipboard className="bi" />
              <span className="visually-hidden">{tMS('copyEmbedButton')}</span>
            </Button>
          </div>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
}

export default ShareSnippet;
