/* eslint-disable react/function-component-definition */
import { useDispatch } from 'react-redux';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';
import { db } from './db.js';
import routes from '../../routes.js';

export const Repls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openTerminal = (code) => () => {
    dispatch(actions.setCodeAndSavedCode(code)); // далее роутинг на App
    navigate(routes.homePagePath());
  };

  return (
    <Container className="m-5">
      <Row className="g-4" md={2} xs={1}>
        {db.map(({ id, title, img, code }) => (
          <Col key={id} lg="3" xs>
            <Card border="primary">
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <Card.Text>{img}</Card.Text>
                <Button onClick={openTerminal(code)} variant="primary">
                  {t('profile.openReplButton')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
