import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function GetLink() {
  const { name, link } = useSelector((state) => state.modal.item);
  const url = new URL(window.location);
  const fullPath = `${url.host}${link}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleHide = () => {
    dispatch(modalActions.closeModal());
    navigate(link);
    navigate(0);
  };

  return (
    <Modal animation centered onHide={handleHide} show>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <h5>
          <span style={{ color: '#136EF6' }}>{name}</span>
          {t('modals.getLinkHeader')}
        </h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label controlId="name" label={t('modals.replLinkLabel')} />
            <Form.Control
              className="text-muted"
              readOnly
              name="name"
              placeholder={t('modals.replLinkLabel')}
              value={fullPath}
            />
          </Form.Group>

          <div
            className="d-flex mt-3 justify-content-center"
            style={{ columnGap: '12px' }}
          >
            <Button
              variant="outline-primary"
              type="submit"
              style={{ width: 'calc(35% - 10px)' }}
              href={link}
            >
              {t('modals.goToReplButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default GetLink;
