import {
  Row,
  Col,
  Container,
  Image,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RunItLogo from './assets/LogoDark.svg';
import Twitter from './assets/Twitter_black.svg';
import Telegram from './assets/Telegram_black.svg';
import VK from './assets/VK_black.svg';
import YouTube from './assets/YouTube_black.svg';
import TwitterLg from './assets/Twitter_black 1.svg';
import TelegramLg from './assets/Telegram_black 1.svg';
import VKLg from './assets/VK_black 1.svg';
import YouTubeLg from './assets/YouTube_black 1.svg';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <Container>
        <Row className="pt-4 d-lg-none">
          <Col className="col-6 mb-4">
            <Image className="pb-2" fluid src={RunItLogo} />
          </Col>
          <Col className="col-6 d-flex gap-2 mb-4 justify-content-between">
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
        <Row className="d-flex mx-5 mb-3 align-items-center d-none d-lg-flex">
          <Col>
            <Image className="pb-3" fluid src={RunItLogo} />
          </Col>
          <Col>
            <Row>
              <Col>
                <p className="m-0">
                  <b>{t('footer.tel1')}</b>
                </p>
                <p className="m-0">{t('footer.rf')}</p>
              </Col>
              <Col>
                <p className="m-0">
                  <b>{t('footer.tel2')}</b>
                </p>
                <p className="m-0">{t('footer.moscow')}</p>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex gap-4">
            <Image fluid src={VKLg} />
            <Image fluid src={TelegramLg} />
            <Image fluid src={YouTubeLg} />
            <Image fluid src={TwitterLg} />
          </Col>
        </Row>
        <Row className="d-flex mx-5 mb-5 align-items-center d-none d-lg-flex">
          <Col>
            <Row>
              <Col>
                <p className="mb-2">{t('landing.header.about')}</p>
                <p className="mb-2">{t('landing.header.advantages')}</p>
                <p className="mb-2">{t('landing.header.opportunities')}</p>
                <p className="mb-0">{t('faq.faq')}</p>
              </Col>
              <Col>
                <p className="mb-2">{t('footer.about')}</p>
                <p className="mb-2">{t('footer.career')}</p>
                <p className="mb-2">{t('footer.shop')}</p>
                <p className="mb-0">{t('footer.mailSupport')}</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label={t('footer.mailSupport')}
              >
                <Form.Control
                  as="textarea"
                  placeholder={t('footer.mailSupport')}
                  style={{ height: '8rem' }}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <div className="ms-auto">
              <p className="m-0">{t('footer.name')}</p>
              <p className="m-0">
                {t('footer.city')} {t('footer.street')}
              </p>
              <p className="m-0">{t('footer.ogrn')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
