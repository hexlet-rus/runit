import { Col, Badge, Row, Button } from 'react-bootstrap';
import { Trash3 } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice.js';

function SnippetBadge() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { snippets } = useSelector((state) => state.snippets);
  const checkedSnippet = snippets.filter((snippet) => snippet.checkbox);
  const countChecked = checkedSnippet.length;
  const isChecked = checkedSnippet.length > 0;

  const handleDelete = () => {
    dispatch(modalActions.openModal({ type: 'deleteSnippet' }));
  };

  return (
    <Row className={`${isChecked ? '' : 'd-none'}`}>
      <Col className="d-flex justify-content-center">
        <Badge className="badge-snippet" bg="primary">
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
        </Badge>
      </Col>
    </Row>
  );
}

export default SnippetBadge;
