import { Row, Col, Container, Image, Form, FloatingLabel } from 'react-bootstrap';
import { Twitter, Telegram, Youtube } from 'react-bootstrap-icons';
import RunItLogo from './assets/LogoDark.svg';

function Footer() {
  return (
    <Container fluid style={{ background: "#136EF6" }}>
      <Row className="flex-row flex-wrap align-items-center gap-5" >
        <Col class>
          <Image src={RunItLogo} />
        </Col>
        <Col >
        <Row>
            <Col>
            <p>8 800 100 22 47</p>
            <p>бесплатно по РФ</p>
          </Col>
          <Col>
            <p>+7 495 085 28 38</p>
            <p>бесплатно по Москве</p>
          </Col>
        </Row>
        </Col>
        <Col>
          <Telegram />
          <Twitter />
          <Youtube />
        </Col>
      </Row>
      <Row className="flex-row flex-wrap align-items-center gap-5">
        <Col>
        <Row>
            <Col>
            <p>О проекте</p>
            <p>Преимущества</p>
            <p>Возможности</p>
            <p>FAQ</p>
          </Col>
          <Col>
            <p>О нас</p>
            <p>Карьера в Хекслете</p>
            <p>Магазин мерча</p>
            <p>Напишите нам</p>
          </Col>
        </Row>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingTextarea" label="Напишите нам">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '6rem' }}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <p>ООО «Хекслет Рус»</p>
          <p>432071, г. Ульяновск, пр-т Нариманова, дом 1Г, оф. 23</p>
          <p>ОГРН 1217300010476</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
