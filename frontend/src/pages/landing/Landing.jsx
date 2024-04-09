import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import { useAuth } from '../../hooks';
import routes from '../../routes.js';
import { actions } from '../../slices/modalSlice';
import Faq from './Faq.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './landing.scss';
import './assets/fonts/NunitoSans_10pt-Light.ttf';

import Code from './assets/Icons=Code.svg';
import Devices from './assets/Icons=Devices.svg';
import Share from './assets/Icons=Share.svg';
import ImageCarousel1 from './assets/DisplayWithCode1.jpeg';
import ImageCarousel2 from './assets/DisplayWithCode2.jpeg';
import ImageCarousel3 from './assets/DisplayWithCode3.jpeg';
import ImageCarousel4 from './assets/DisplayWithCode4.jpeg';
import ImageCarousel5 from './assets/DisplayWithCode5.jpeg';
import Languages from './assets/Icons=Languages.svg';
import TeamWork from './assets/Icons=TeamWork.svg';
import Template from './assets/Icons=Template.svg';
import ImageUnderCarousel from './assets/ReadyAssets.jpeg';

function NewLanding() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const advantagesRef = useRef();

  const handleCodeWithoutRegButton = () => {
    if (isLoggedIn) {
      navigate(routes.myProfilePagePath());
      return;
    }
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };

  const horizontalScroll = () => {
    const el = advantagesRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;

        /*    if (
          !(el.scrollLeft === 0 && e.deltaY < 0) &&
          !(
            el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
            e.deltaY > 0
          )
        ) */

        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  };

  useEffect(horizontalScroll, []);

  return (
    <div className="wrapper-for-bg-images">
      <div className="first-bg-image mx-auto">
        <Header />
        <Container className="landing-body">
          <Row className="my-5 pt-5 about-project" id="aboutProject">
            <Col className="pt-5 d-lg-none" lg={{ offset: 1 }}>
              <div className="pt-5">
                <p>{t('landing.freeProject')}</p>
              </div>
              <h1>{t('landing.fastIDE.first')}</h1>
              <div className="d-flex align-items-center pb-5 mb-5">
                <h1 className="m-0 pe-3">{t('landing.fastIDE.second')}</h1>
                <p className="m-0 ps-3">{t('landing.writeInBrowser')}</p>
              </div>
            </Col>
            <Col
              className="pt-5 d-none d-lg-flex flex-column"
              lg={{ offset: 1 }}
            >
              <h4 className="m-0 pt-5">{t('landing.freeProject')}</h4>
              <h1 className="m-0">
                {t('landing.fastIDE.first')} {t('landing.fastIDE.second')}
              </h1>
              <div className="align-items-center pb-5 mb-5">
                <h2 className="m-0">{t('landing.writeInBrowser')}</h2>
              </div>
            </Col>
          </Row>
          <Row className="my-5" xs="auto">
            <Col className="mb-3" lg={{ offset: 1 }}>
              <Button
                as={Link}
                className="btn-start rounded-5"
                size="lg"
                to={routes.signInPagePath()}
              >
                {t('landing.startCoding')}
              </Button>
            </Col>
            <Col>
              <Button
                className="btn-start-no-reg rounded-5"
                onClick={handleCodeWithoutRegButton}
                size="lg"
              >
                {t('landing.codeWithoutReg')}
              </Button>
            </Col>
          </Row>
          <Row className="d-lg-inline-flex mb-5 my-lg-5 background-dark">
            <div className="d-lg-flex py-5 justify-content-between px-5">
              <Col
                as="figure"
                className="col-12 d-flex flex-row gap-4 align-items-center col-lg-3 mb-4 mb-lg-0"
              >
                <Image className="bg-primary rounded-circle" fluid src={Code} />
                <figcaption>
                  {t('landing.easyStart.first')} {t('landing.easyStart.second')}
                </figcaption>
              </Col>
              <Col
                as="figure"
                className="col-12 d-flex flex-row gap-4 align-items-center col-lg-3  mb-4 mb-lg-0"
              >
                <Image
                  className="bg-primary rounded-circle"
                  fluid
                  src={Devices}
                />
                <figcaption>
                  {t('landing.allDevices.first')}{' '}
                  {t('landing.allDevices.second')}
                </figcaption>
              </Col>
              <Col
                as="figure"
                className="col-12 d-flex flex-row gap-4 align-items-center col-lg-3 mb-lg-0"
              >
                <Image
                  className="bg-primary rounded-circle"
                  fluid
                  src={Share}
                />
                <figcaption>
                  {t('landing.shareCode.first')} {t('landing.shareCode.second')}
                </figcaption>
              </Col>
            </div>
          </Row>
          <Row className="mb-lg-5 pb-lg-5 gap-lg-3 mt-5" id="advantages">
            <Col className="col-12" lg={{ span: 5, offset: 1 }}>
              <h2 className="mt-5 mb-4">{t('landing.noConfig')}</h2>
            </Col>
            <Col className="col-12 mb-xl-5 pe-lg-3" lg={{ span: 5 }}>
              <p className="mt-2 mb-3 mt-xl-5">{t('landing.modern')}</p>
              <p className="mb-3">{t('landing.fast')}</p>
            </Col>
          </Row>
          <Row
            ref={advantagesRef}
            className="d-none d-lg-inline-flex my-5 overflow-auto flex-nowrap advantages-horizontal-scroll"
          >
            <Col clssaName="col-12" lg={{ offset: 1, span: 11 }}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center me-5">
                <Col>
                  <Image
                    className="rounded-5"
                    fluid
                    src={ImageCarousel1}
                    style={{
                      width: '38rem',
                      height: '25rem',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col>
                  <figcaption>{t('landing.inBrowser')}</figcaption>
                </Col>
              </figure>
            </Col>
            <Col clssaName="col-12" lg={{ offset: 1, span: 11 }}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center mx-5">
                <Col>
                  <Image
                    className="rounded-5"
                    fluid
                    src={ImageCarousel2}
                    style={{
                      width: '38rem',
                      height: '25rem',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col>
                  <figcaption>{t('landing.noZIP')}</figcaption>
                </Col>
              </figure>
            </Col>
            <Col clssaName="col-12" lg={{ offset: 1, span: 11 }}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center mx-5">
                <Col>
                  <Image
                    className="rounded-5"
                    fluid
                    src={ImageCarousel3}
                    style={{
                      width: '38rem',
                      height: '25rem',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col>
                  <figcaption>{t('landing.allComputers')}</figcaption>
                </Col>
              </figure>
            </Col>
            <Col clssaName="col-12" lg={{ offset: 1, span: 11 }}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center mx-5">
                <Col>
                  <Image
                    className="rounded-5"
                    fluid
                    src={ImageCarousel4}
                    style={{
                      width: '38rem',
                      height: '25rem',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col>
                  <figcaption>{t('landing.allOS')}</figcaption>
                </Col>
              </figure>
            </Col>
            <Col clssaName="col-12" lg={{ offset: 1, span: 11 }}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                <Col>
                  <Image
                    className="rounded-5"
                    fluid
                    src={ImageCarousel5}
                    style={{
                      width: '38rem',
                      height: '25rem',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col>
                  <figcaption>{t('landing.noSettings')}</figcaption>
                </Col>
              </figure>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="my-3 d-lg-none">
              <figure>
                <figcaption className="mb-3 mx-auto">
                  {t('landing.inBrowser')}
                </figcaption>
                <Image
                  className="rounded-5 mb-4 mx-auto"
                  fluid
                  src={ImageCarousel1}
                  style={{
                    height: '13.75rem',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </figure>
              <figure>
                <figcaption className="mb-3 mt-3 mx-auto">
                  {t('landing.noZIP')}
                </figcaption>
                <Image
                  className="rounded-5 mb-4 mx-auto"
                  fluid
                  src={ImageCarousel2}
                  style={{
                    height: '13.75rem',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </figure>
              <figure>
                <figcaption className="mb-3 mt-3 mx-auto">
                  {t('landing.allComputers')}
                </figcaption>
                <Image
                  className="rounded-5 mb-4 mx-auto"
                  fluid
                  src={ImageCarousel3}
                  style={{
                    height: '13.75rem',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </figure>
              <figure>
                <figcaption className="mb-3 mt-3 mx-auto">
                  {t('landing.allOS')}
                </figcaption>
                <Image
                  className="rounded-5 mb-4 mx-auto"
                  fluid
                  src={ImageCarousel4}
                  style={{
                    height: '13.75rem',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </figure>
              <figure>
                <figcaption className="mb-3 mt-3">
                  {t('landing.noSettings')}
                </figcaption>
                <Image
                  className="rounded-5 mb-4"
                  fluid
                  src={ImageCarousel5}
                  style={{
                    height: '13.75rem',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </figure>
            </Col>
          </Row>
          {/*
            <Col
              className="d-none d-lg-inline-flex mb-5 pb-5"
              lg={{ offset: 1, span: 10 }}
            >
              <Carousel
                className="mb-5"
                indicators={false}
                style={{ maxHeight: '350px' }}
              >
                <Carousel.Item>
                  <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                    <Col>
                      <Image
                        className="rounded-5"
                        fluid
                        src={ImageCarousel1}
                        style={{
                          width: '600px',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col>
                      <figcaption>{t('landing.inBrowser')}</figcaption>
                    </Col>
                  </figure>
                </Carousel.Item>
                <Carousel.Item>
                  <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                    <Col>
                      <Image
                        className="rounded-5"
                        fluid
                        src={ImageCarousel2}
                        style={{
                          width: '600px',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col>
                      <figcaption>{t('landing.noZIP')}</figcaption>
                    </Col>
                  </figure>
                </Carousel.Item>
                <Carousel.Item>
                  <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                    <Col>
                      <Image
                        className="rounded-5"
                        fluid
                        src={ImageCarousel3}
                        style={{
                          width: '600px',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col>
                      <figcaption>{t('landing.allComputers')}</figcaption>
                    </Col>
                  </figure>
                </Carousel.Item>
                <Carousel.Item>
                  <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                    <Col>
                      <Image
                        className="rounded-5"
                        fluid
                        src={ImageCarousel4}
                        style={{
                          width: '600px',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col>
                      <figcaption>{t('landing.allOS')}</figcaption>
                    </Col>
                  </figure>
                </Carousel.Item>
                <Carousel.Item>
                  <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                    <Col>
                      <Image
                        className="rounded-5"
                        fluid
                        src={ImageCarousel5}
                        style={{
                          width: '600px',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col>
                      <figcaption>{t('landing.noSettings')}</figcaption>
                    </Col>
                  </figure>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
*/}
          <Row>
            <div className="my-5 possibilities-background">
              <Col className="my-lg-5" id="possibilities" lg={{ offset: 1 }}>
                <h2 className="m-0">{t('landing.moreOpportunity')}</h2>
              </Col>
            </div>
          </Row>
          <Row className="mb-lg-5">
            <Col className="gap-2 mb-lg-5" lg={5}>
              <div className="d-flex flex-column gap-3 mb-lg-5">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={Languages} />
                  <h3 className="ps-3">{t('landing.allLanguages.title')}</h3>
                </div>
                <p>{t('landing.allLanguages.text')}</p>
              </div>
              <div className="d-flex flex-column gap-3 pt-3 mb-lg-5">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={TeamWork} />
                  <h3 className="ps-3">{t('landing.teamWork.title')}</h3>
                </div>
                <p>{t('landing.teamWork.text')}</p>
              </div>
              <div className="d-flex flex-column gap-3 pt-3">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={Template} />
                  <h3 className="ps-3">
                    {t('landing.readyBoilerplates.title')}
                  </h3>
                </div>
                <p>{t('landing.readyBoilerplates.text')}</p>
              </div>
            </Col>
            <Col className="col-12 mb-lg-5 d-flex" lg={7}>
              <Image className="rounded-5" fluid src={ImageUnderCarousel} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              <p className="pt-3 mb-4 d-lg-none">{t('landing.nowCoding')}</p>
              <p className="fs-2 pt-3 mb-4 d-none d-lg-block">
                {t('landing.nowCoding')}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                as={Link}
                className="btn-start rounded-5 mb-3"
                size="lg"
                to={routes.signInPagePath()}
              >
                {t('landing.startCoding')}
              </Button>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-start-no-reg rounded-5"
                onClick={handleCodeWithoutRegButton}
                size="lg"
              >
                {t('landing.codeWithoutReg')}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={{ offset: 1, span: 10 }}>
              <Faq />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default NewLanding;
