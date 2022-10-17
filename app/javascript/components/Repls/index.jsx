/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../slices';
import { db } from './db.js';
import routes from '../../routes.js';

export const Repls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openTerminal = (code) => () => {
    dispatch(actions.updateCode(code)); // далее роутинг на App
    navigate(routes.homePagePath());
  };

  return (
    <Container className="m-5">
      <Row xs={1} md={2} className="g-4">
        {db.map(({ id, title, img, code }) => (
          <Col xs lg="3">
            <Card border="primary" key={id}>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <Card.Text>{img}</Card.Text>
                <Button variant="primary" onClick={openTerminal(code)}>
                  Open repl
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
