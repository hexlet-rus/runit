import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Youtube, Telegram, TwitterX } from 'react-bootstrap-icons';
import classes from './index.module.css';
import { ReactComponent as Vk } from '../../assets/images/icons/vk.svg';

function Footer() {
  const { t: tF } = useTranslation('translation', {
    keyPrefix: 'footer',
  });

  return (
    <footer className="bg-dark border-top border-secondary pt-4 pb-5">
      <Container>
        <Row className="gy-2 gx-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row pt-3">
          <Col lg={5} md={5}>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  eventKey="about"
                  href="https://ru.hexlet.io/pages/about"
                  target="_blank"
                >
                  {tF('about')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="support_email"
                  href="https://t.me/hexlet_help_bot"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {tF('mailSupport')}
                </Nav.Link>
              </li>
            </Nav>
            <Nav as="ul" className="flex-column align-items-start mt-3">
              <li>
                <span className="lead fw-normal">
                  <a
                    className={`${classes.footerLink} text-decoration-none`}
                    href={tF('tel1Href')}
                  >
                    {tF('tel1')}
                  </a>
                </span>
                <span className="text-secondary">{tF('rf')}</span>
              </li>
              <li>
                <span className="lead fw-normal">
                  <a
                    className={`${classes.footerLink} text-decoration-none`}
                    href={tF('tel2Href')}
                  >
                    {tF('tel2')}
                  </a>
                </span>
                <span className="text-secondary">{tF('moscow')}</span>
              </li>
              <li>
                <span className="lead fw-normal">
                  <a
                    className={`${classes.footerLink} text-decoration-none`}
                    href={tF('tgLink')}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    {tF('help')}:
                  </a>
                </span>
                <span className="text-secondary">{tF('tg')}</span>
              </li>
            </Nav>
            <p className="mt-3 text-secondary">
              <span className="d-block">{tF('name')}</span>
              <span className="d-block">{tF('city')}</span>
              <span className="d-block">{tF('street')}</span>
              <span className="d-block">{tF('ogrn')}</span>
            </p>
          </Col>
          <Col lg={5} md={5}>
            <div className="fw-bold mt-3 mb-2 text-white">{tF('doc')}</div>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  eventKey="conditions"
                  href="https://ru.hexlet.io/pages/tos"
                  target="_blank"
                >
                  {tF('conditions')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="agreement"
                  href="https://ru.hexlet.io/pages/personal_data"
                  target="_blank"
                >
                  {tF('agreement')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as={Link}
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="licenseAgreement"
                  target="_blank"
                  to="/licenseAgreement"
                >
                  <span>{tF('licenseAgreement')}</span>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="source"
                  href="https://github.com/hexlet-rus/runit"
                  target="_blank"
                >
                  {tF('source')}
                </Nav.Link>
              </li>
            </Nav>
            <Nav as="ul" className="flex-column align-items-start">
              <div className="fw-bold mt-3 mb-3 text-white">
                {tF('subscribe')}
              </div>
              <ul className="list-unstyled h3 text-start d-flex flex-wrap">
                <li className="me-4 mb-2">
                  <a
                    aria-label="Youtube"
                    className={`${classes.footerLink}`}
                    href="https://www.youtube.com/user/HexletUniversity"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Youtube />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    aria-label="Telegram"
                    className={`${classes.footerLink}`}
                    href="https://t.me/hexlet_ru"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Telegram />
                  </a>
                </li>
                <li className="me-4 mb-2">
                  <a
                    aria-label="Vk"
                    className={`${classes.footerLink}`}
                    href="https://vk.com/hexlet"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Vk className="bi" />
                  </a>
                </li>
              </ul>
            </Nav>
            {/* Add it when english version will be available
              <Dropdown role="group" className="mt-3">
                <Dropdown.Toggle
                  className="btn-link text-body text-decoration-none p-0 x-btn-focus-visible"
                  split
                  variant="none"
                >
                  <Globe /> // from react-bootstrap-icons
                  <span className="fw-bold me-2">{tF('language')}</span>
                </Dropdown.Toggle>
  
                <Dropdown.Menu as="ul">
                  <li>
                    <Dropdown.Item as="a" className="dropdown-item" href="/#">
                      <img
                        width="22"
                        alt="Переключить язык на en"
                        className="my-auto me-2"
                        loading="lazy"
                        src="https://cdn2.hexlet.io/assets/flag-en-f0b48c6562bb27879fbd685ece0133271ea043384dd9793843c246f862ac7cc1.svg"
                      />
                      <span className="my-auto text-muted">{t('footer.en')}</span>
                    </Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item as="a" className="dropdown-item" href="/#">
                      <img
                        width="22"
                        alt="Переключить язык на ru"
                        className="my-auto me-2"
                        loading="lazy"
                        src="https://cdn2.hexlet.io/assets/flag-ru-593864ce87ae202b2c2e9393b2a6cf9384ac9cbb1c70632f4c6eeca34341483e.svg"
                      />
                      <span className="my-auto text-muted">{tF('ru')}</span>
                    </Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown> */}
          </Col>
          <Col lg={2} md={12}>
            <div className="fw-bold mt-3 mb-2 text-white">{tF('project')}</div>
            <Nav as="ul" className="flex-column align-items-start">
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0 pt-0`}
                  eventKey="hexlet"
                  href="https://ru.hexlet.io"
                  target="_blank"
                >
                  {tF('hexlet')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="codeBasics"
                  href="https://code-basics.com/ru"
                  target="_blank"
                >
                  {tF('codeBasics')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="codeBattle"
                  href="https://codebattle.hexlet.io"
                  target="_blank"
                >
                  {tF('codeBattle')}
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  as="a"
                  className={`${classes.footerNavLink} py-1 px-0`}
                  eventKey="cv"
                  href="https://cv.hexlet.io"
                  target="_blank"
                >
                  {tF('cv')}
                </Nav.Link>
              </li>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
