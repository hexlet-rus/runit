import { Row, Col, Container, Image, NavbarBrand, Nav } from 'react-bootstrap';
import './custom-colors.scss';
import './landing.scss';
import { useTranslation } from 'react-i18next';
import TwitterDarkMobile from './assets/Twitter_dark_theme_mobile.svg';
import TwitterLightMobile from './assets/Twitter_light_theme_mobile.svg';
import TelegramDarkMobile from './assets/Telegram_dark_theme_mobile.svg';
import TelegramLightMobile from './assets/Telegram_light_theme_mobile.svg';
import VKDarkMobile from './assets/VK_dark_theme_mobile.svg';
import VKLightMobile from './assets/VK_light_theme_mobile.svg';
import YouTubeDarkMobile from './assets/YouTube_dark_theme_mobile.svg';
import YouTubeLightMobile from './assets/YouTube_light_theme_mobile.svg';
import TwitterDark from './assets/Twitter_dark_theme.svg';
import TwitterLight from './assets/Twitter_light_theme.svg';
import TelegramDark from './assets/Telegram_dark_theme.svg';
import TelegramLight from './assets/Telegram_light_theme.svg';
import VKDark from './assets/VK_dark_theme.svg';
import VKLight from './assets/VK_light_theme.svg';
import YouTubeDark from './assets/YouTube_dark_theme.svg';
import YouTubeLight from './assets/YouTube_light_theme.svg';
import RunItLogoLight from './assets/LogoFooterLight.svg';
import RunItLogoDark from './assets/LogoFooterDark.svg';

function Footer() {
  const { t: tLH } = useTranslation('translation', {
    keyPrefix: 'landing.header',
  });
  const { t: tFAQ } = useTranslation('translation', { keyPrefix: 'faq' });
  const { t: tF } = useTranslation('translation', { keyPrefix: 'footer' });

  const theme = document.documentElement.getAttribute('data-bs-theme');

  const logo = theme === 'light' ? RunItLogoLight : RunItLogoDark;

  return (
    <footer className="footer">
      <Container className="mt-5 py-5 text-white">
        <Row className="pt-4 d-lg-none">
          <Col className="col-6 mb-4">
            <NavbarBrand>
              <Image className="pb-2" fluid src={logo} />
            </NavbarBrand>
          </Col>
          <Col className="col-6 d-flex gap-2 mb-4">
            <Nav
              as="ul"
              className="d-flex flex-fill justify-content-between px-3 social-networks align-content-center align-content-center"
            >
              <li>
                <NavbarBrand
                  aria-label="Vk"
                  className="px-0"
                  href="https://vk.com/hexlet"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={theme ? VKLightMobile : VKDarkMobile} />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="Telegram"
                  className="px-0"
                  href="https://t.me/hexletcommunity/12"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image
                    fluid
                    src={theme ? TelegramLightMobile : TelegramDarkMobile}
                  />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="Youtube"
                  className="px-0"
                  href="https://www.youtube.com/user/HexletUniversity"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image
                    fluid
                    src={theme ? YouTubeLightMobile : YouTubeDarkMobile}
                  />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="X"
                  className="px-0"
                  href="https://x.com/HexletHQ"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image
                    fluid
                    src={theme ? TwitterLightMobile : TwitterDarkMobile}
                  />
                </NavbarBrand>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <Nav as="ul" className="list-group flex-column">
              <li className="mb-2">
                <NavbarBrand href="#aboutProject">
                  {tLH('advantages')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand href="#possibilities">
                  {tLH('opportunities')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand href="#faq">{tFAQ('faq')}</NavbarBrand>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <Nav as="ul" className="list-group flex-column">
              <li className="mb-2">
                <NavbarBrand
                  href="https://ru.hexlet.io/pages/about"
                  target="_blank"
                >
                  {tF('about')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand
                  href="https://hexlet-ru.notion.site/c6406ed8890747e690d32b050faf42c2"
                  target="_blank"
                >
                  {tF('career')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand
                  href="https://hexlet.printdirect.ru/?partner_id=615497"
                  target="_blank"
                >
                  {tF('shop')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand href="mailto: runit@hexlet.io" target="_blank">
                  {tF('mailSupport')}
                </NavbarBrand>
              </li>
            </Nav>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              <NavbarBrand href={tF('tel1Href')}>
                <b>{tF('tel1')}</b>
              </NavbarBrand>
            </p>
            <p>{tF('rf')}</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">
              <NavbarBrand href={tF('tel2Href')}>
                <b>{tF('tel2')}</b>
              </NavbarBrand>
            </p>
            <p> {tF('moscow')}</p>
          </Col>
          <Col className="col-6  mb-4">
            <p className="m-0">{tF('name')}</p>
            <p className="m-0">{tF('ogrn')}</p>
          </Col>
          <Col className="col-6 mb-4">
            <p className="m-0">{tF('city')}</p>
            <p className="m-0">{tF('street')}</p>
          </Col>
        </Row>
        <Row className="d-flex mx-5 mb-3 align-items-center d-none d-lg-flex">
          <Col>
            <Image className="pb-3" fluid src={logo} />
          </Col>
          <Col className="d-flex gap-4 flex-nowrap">
            <Nav
              as="ul"
              className="justify-content-between w-75 social-networks flex-nowrap"
            >
              <li>
                <NavbarBrand
                  aria-label="Vk"
                  href="https://vk.com/hexlet"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={theme ? VKLight : VKDark} />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="Telegram"
                  href="https://t.me/hexletcommunity/12"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={theme ? TelegramLight : TelegramDark} />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="Youtube"
                  href="https://www.youtube.com/user/HexletUniversity"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={theme ? YouTubeLight : YouTubeDark} />
                </NavbarBrand>
              </li>
              <li>
                <NavbarBrand
                  aria-label="X"
                  href="https://x.com/HexletHQ"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Image fluid src={theme ? TwitterLight : TwitterDark} />
                </NavbarBrand>
              </li>
            </Nav>
          </Col>
        </Row>
        <Row className="d-flex mx-5 mb-5 align-items-center d-none d-lg-flex">
          <Col>
            <div className="mb-2">
              <p className="mb-0">
                <NavbarBrand href={t('footer.tel1Href')}>
                  <b>{t('footer.tel1')}</b>
                </NavbarBrand>
              </p>
              <p className="m-0">{t('footer.rf')}</p>
            </div>
            <div>
              <p className="m-0">
                <NavbarBrand href={t('footer.tel2Href')}>
                  <b>{t('footer.tel2')}</b>
                </NavbarBrand>
              </p>
              <p className="m-0">{t('footer.moscow')}</p>
            </div>
          </Col>
          <Col>
            <Nav as="ul" className="list-group flex-column">
              <li className="mb-2">
                <NavbarBrand className="p-0" href="#aboutProject">
                  {t('landing.header.about')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand className="p-0" href="#advantages">
                  {t('landing.header.advantages')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand className="p-0" href="#possibilities">
                  {t('landing.header.opportunities')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand className="p-0" href="#faq">
                  {t('landing.header.faq')}
                </NavbarBrand>
              </li>
            </Nav>
          </Col>
          <Col>
            <Nav as="ul" className="list-group flex-column">
              <li className="mb-2">
                <NavbarBrand
                  className="p-0"
                  href="https://ru.hexlet.io/pages/about"
                  target="_blank"
                >
                  {t('footer.about')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand
                  className="p-0"
                  href="https://hexlet-ru.notion.site/c6406ed8890747e690d32b050faf42c2"
                  target="_blank"
                >
                  {t('footer.career')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand
                  className="p-0"
                  href="https://hexlet.printdirect.ru/?partner_id=615497"
                  target="_blank"
                >
                  {t('footer.shop')}
                </NavbarBrand>
              </li>
              <li className="mb-2">
                <NavbarBrand
                  className="p-0"
                  href="mailto: runit@hexlet.io"
                  target="_blank"
                >
                  {t('footer.mailSupport')}
                </NavbarBrand>
              </li>
            </Nav>
          </Col>
          <Col>
            <div className="ms-auto">
              <p>{tF('name')}</p>
              <p className="m-0">{tF('city')}</p>
              <p>{tF('street')}</p>
              <p className="m-0">{tF('ogrn')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
