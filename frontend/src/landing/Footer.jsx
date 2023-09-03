import { Row, Col, Container, Image } from 'react-bootstrap';
import RunItLogo from './assets/LogoDark.svg';
import Twitter from './assets/Twitter_black.svg';
import Telegram from './assets/Telegram_black.svg';
import VK from './assets/VK_black.svg';
import YouTube from './assets/YouTube_black.svg';

function Footer() {
  return (
    <footer className="bg-primary">
      <Container fluid>
        <Row className="pt-4">
          <Col className="col-6 mb-4">
            <Image fluid src={RunItLogo} />
          </Col>
          <Col class="col-6 d-flex gap-2 mb-4 justify-content-between">
            <Image fluid src={VK} />
            <Image fluid src={Telegram} />
            <Image fluid src={YouTube} />
            <Image fluid src={Twitter} />
          </Col>
          <Col className="col-6 mb-4">
            <p className="mb-2">О проекте</p>
            <p className="mb-2">Преимущества</p>
            <p className="mb-2">Возможности</p>
            <p className="mb-2">FAQ</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="mb-2">О нас</p>
            <p className="mb-2">Карьера в Хекслете</p>
            <p className="mb-2">Магазин мерча</p>
            <p className="mb-2">Напишите нам</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              <b>8 800 100 22 47</b>
            </p>
            <p className="m-0">бесплатно по РФ</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              <b>+7 495 085 28 38</b>
            </p>
            <p className="m-0">бесплатно по Москве</p>
          </Col>
          <Col className="col-6  mb-4">
            <p className="m-0">ООО «Хекслет Рус»</p>
            <p className="m-0">ОГРН 1217300010476</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              432071, г. Ульяновск, пр-т Нариманова, дом 1Г, оф. 23
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
