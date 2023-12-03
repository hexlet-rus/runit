import {
  Row,
  Col,
  Container,
  Image,
  Form,
  FloatingLabel,
  Nav,
} from 'react-bootstrap';
import './landing.scss';
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
    <footer className="footer">
      <Container className="mt-5">
        <Row className="pt-4 d-lg-none">
          <Col className="col-6 mb-4">
            <Nav.Link>
              <Image className="pb-2" fluid src={RunItLogo} />
            </Nav.Link>
          </Col>
          <Col className="col-6 d-flex gap-2 mb-4">
            <Nav
              as="ul"
              className="d-flex justify-content-between px-3"
              style={{ width: '100%' }}
            >
              <li>
                <Nav.Link
                  aria-label="Vk"
                  className="px-0"
                  href="https://vk.com/hexlet"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={VK} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="Telegram"
                  className="px-0"
                  href="https://t.me/hexletcommunity/12"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={Telegram} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="Youtube"
                  className="px-0"
                  href="https://www.youtube.com/user/HexletUniversity"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={YouTube} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="X"
                  className="px-0"
                  href="https://x.com/HexletHQ"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={Twitter} />
                </Nav.Link>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <Nav as="ul">
              <li className="mb-2">
                <Nav.Link href="#aboutProject">
                  {t('landing.header.advantages')}
                </Nav.Link>
              </li>
              <li className="mb-2 link-light">
                <Nav.Link href="#advantages">Преимущества</Nav.Link>
              </li>
              <li className="mb-2">
                <Nav.Link href="#possibilities">
                  {t('landing.header.opportunities')}
                </Nav.Link>
              </li>
              <li className="mb-2">
                <Nav.Link href="#faq">{t('faq.faq')}</Nav.Link>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <Nav as="ul">
              <li className="mb-2">
                <Nav.Link
                  href="https://ru.hexlet.io/pages/about"
                  target="_blank"
                >
                  {t('footer.about')}
                </Nav.Link>
              </li>
              <li className="mb-2">
                <Nav.Link
                  href="https://hexlet-ru.notion.site/c6406ed8890747e690d32b050faf42c2"
                  target="_blank"
                >
                  {t('footer.career')}
                </Nav.Link>
              </li>
              <li className="mb-2">
                <Nav.Link
                  href="https://hexlet.printdirect.ru/?partner_id=615497"
                  target="_blank"
                >
                  {t('footer.shop')}
                </Nav.Link>
              </li>
              <li className="mb-2">
                <Nav.Link href="mailto: runit@hexlet.io" target="_blank">
                  {t('footer.mailSupport')}
                </Nav.Link>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <span>
              <a href={t('footer.tel1Href')}>
                <b>{t('footer.tel1')}</b>
              </a>
              {t('footer.rf')}
            </span>
          </Col>
          <Col className="col-6 mb-4">
            <span className="m-0">
              <a href={t('footer.tel2Href')}>
                <b>{t('footer.tel2')}</b>
              </a>
              {t('footer.moscow')}
            </span>
          </Col>
          <Col className="col-6  mb-4">
            <p className="m-0">
              <span className="m-0">{t('footer.name')}</span>
              <span className="m-0">{t('footer.ogrn')}</span>
            </p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              <span className="m-0">{t('footer.city')}</span>
              <span className="m-0">{t('footer.street')}</span>
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
                <span>
                  <a href={t('footer.tel1Href')}>
                    <b>{t('footer.tel1')}</b>
                  </a>
                  {t('footer.rf')}
                </span>
              </Col>
              <Col>
                <span className="m-0">
                  <a href={t('footer.tel2Href')}>
                    <b>{t('footer.tel2')}</b>
                  </a>
                  {t('footer.moscow')}
                </span>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex gap-4">
            <Nav as="ul">
              <li>
                <Nav.Link
                  aria-label="Vk"
                  href="https://vk.com/hexlet"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={VKLg} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="Telegram"
                  href="https://t.me/hexletcommunity/12"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={TelegramLg} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="Youtube"
                  href="https://www.youtube.com/user/HexletUniversity"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={YouTubeLg} />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  aria-label="X"
                  href="https://x.com/HexletHQ"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={TwitterLg} />
                </Nav.Link>
              </li>
            </Nav>
          </Col>
        </Row>
        <Row className="d-flex mx-5 mb-5 align-items-center d-none d-lg-flex">
          <Col>
            <Row>
              <Col>
                <Nav as="ul">
                  <li className="mb-2">
                    <Nav.Link className="p-0" href="#aboutProject">
                      {t('landing.header.advantages')}
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link className="p-0" href="#advantages">
                      Преимущества
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link className="p-0 pe-5" href="#possibilities">
                      {t('landing.header.opportunities')}
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link className="p-0" href="#faq">
                      {t('faq.faq')}
                    </Nav.Link>
                  </li>
                </Nav>
              </Col>
              <Col>
                <Nav as="ul">
                  <li className="mb-2">
                    <Nav.Link
                      className="p-0"
                      href="https://ru.hexlet.io/pages/about"
                      target="_blank"
                    >
                      {t('footer.about')}
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link
                      className="p-0"
                      href="https://hexlet-ru.notion.site/c6406ed8890747e690d32b050faf42c2"
                      target="_blank"
                    >
                      {t('footer.career')}
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link
                      className="p-0"
                      href="https://hexlet.printdirect.ru/?partner_id=615497"
                      target="_blank"
                    >
                      {t('footer.shop')}
                    </Nav.Link>
                  </li>
                  <li className="mb-2">
                    <Nav.Link
                      className="p-0"
                      href="mailto: runit@hexlet.io"
                      target="_blank"
                    >
                      {t('footer.mailSupport')}
                    </Nav.Link>
                  </li>
                </Nav>
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
              <p>{t('footer.name')}</p>
              <p className="m-0">{t('footer.city')}</p>
              <p>{t('footer.street')}</p>
              <p className="m-0">{t('footer.ogrn')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
