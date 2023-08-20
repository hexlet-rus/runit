import {
  Row,
  Col,
  Container,
  Image,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import RunItLogo from './assets/LogoDark.svg';
import Twitter from './assets/Twitter_black.svg';
import Telegram from './assets/Telegram_black.svg';
import VK from './assets/VK_black.svg';
import YouTube from './assets/YouTube_black.svg'

function Footer() {
  return (
    <footer className="bg-primary p-5">
      <Container fluid>
        <Row>
          <Col className="col-6">
            <Image fluid src={RunItLogo} />
          </Col>
          <Col class="col-6">
            <Image fluid src={VK} />
            <Image fluid src={Telegram} />
            <Image fluid src={YouTube} />
            <Image fluid src={Twitter} />
          </Col>
          <Col className="col-6">
                <p>О проекте</p>
                <p>Преимущества</p>
                <p>Возможности</p>
                <p>FAQ</p>
          </Col>
          <Col className="col-6">
            <p>О нас</p>
            <p>Карьера в Хекслете</p>
            <p>Магазин мерча</p>
            <p>Напишите нам</p>
          </Col>
          <Col className='col-12'>
            <FloatingLabel controlId="floatingTextarea" label="Напишите нам">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '6rem' }}
              />
            </FloatingLabel>
          </Col>
          <Col className="col-6">
                <p>8 800 100 22 47</p>
                <p>бесплатно по РФ</p>
          </Col>
          <Col className="col-6">
            <p>+7 495 085 28 38</p>
            <p>бесплатно по Москве</p>
          </Col>
          <Col className="col-6">
            <p>ООО «Хекслет Рус»</p>
            <p>ОГРН 1217300010476</p>
          </Col>
          <Col className="col-6">
            <p>432071, г. Ульяновск, пр-т Нариманова, дом 1Г, оф. 23</p>
          </Col>
        </Row>  
      </Container>
    </footer>
  );
}

export default Footer;
