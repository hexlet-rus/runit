import { Col, Badge, Row, Button } from 'react-bootstrap';
import { Trash3, XLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as checkboxesActions } from '../../slices/checkboxesSlice.js';

function SnippetBadge() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { checkedSnippets } = useSelector((state) => state.checkboxes);
  const checkedSnippet = checkedSnippets.filter((snippet) => snippet.isChecked);
  const countChecked = checkedSnippet.length;
  const isChecked = checkedSnippet.length > 0;

  const handleDelete = () => {
    dispatch(modalActions.openModal({ type: 'deleteSnippet' }));
  };

  const handleCloseCheckboxes = () => {
    dispatch(checkboxesActions.CloseCheckboxes());
  };

  return (
    <Row className={`sticky-bottom ${isChecked ? '' : 'd-none'}`}>
      <Col className="d-flex justify-content-center">
        <Badge className="badge-snippet toolbar" bg="primary">
          {t('snippetActions.key', { count: countChecked })}
          <Button
            className="btn-icon-only me-auto"
            variant="nofill-light"
            onClick={handleDelete}
          >
            <Trash3 className="bi" />
            <span className="visually-hidden">
              {t('snippetActions.delete')}
            </span>
          </Button>
          <Button
            className="btn-icon-only me-auto"
            variant="nofill-light"
            onClick={handleCloseCheckboxes}
          >
            <XLg className="bi" />
            <span className="visually-hidden">
              {t('snippetActions.cancelButton')}
            </span>
          </Button>
        </Badge>
      </Col>
    </Row>
  );
}

export default SnippetBadge;
