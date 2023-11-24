import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import Faq from './Faq.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

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

function Landing() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Container className="landing-body">
        <Row className="my-5 pt-5">
          <Col className="pt-5 d-lg-none" xl={{ offset: 1 }}>
            <div className="pt-5">
              <p>{t('landing.freeProject')}</p>
            </div>
            <h1 style={{ fontSize: '3.4rem' }}>{t('landing.fastIDE.first')}</h1>
            <div className="d-flex align-items-center pb-5 mb-5">
              <h1 className="m-0 pe-3" style={{ fontSize: '3.4rem' }}>
                {t('landing.fastIDE.second')}
              </h1>
              <p className="m-0 ps-3">{t('landing.writeInBrowser')}</p>
            </div>
          </Col>
          <Col className="pt-5 d-none d-lg-flex flex-column" xl={{ offset: 1 }}>
            <div className="pt-5">
              <h4 className="m-0" style={{ fontSize: '1.5rem' }}>
                {t('landing.freeProject')}
              </h4>
            </div>
            <h1 className="m-0" style={{ fontSize: '6rem' }}>
              {t('landing.fastIDE.first')} {t('landing.fastIDE.second')}
            </h1>
            <div className="align-items-center pb-5 mb-5">
              <h2 className="m-0" style={{ fontSize: '2.5rem' }}>
                {t('landing.writeInBrowser')}
              </h2>
            </div>
          </Col>
        </Row>
        <Row className="my-5 pt-5">
          <Col className="text-center d-grid" xl={{ span: 3, offset: 1 }}>
            <Button className="button-start rounded-5 px-auto" size="lg">
              {t('landing.startCoding')}
            </Button>
          </Col>
        </Row>
        <Row className="d-lg-inline-flex mb-4 pt-4 pb-5 my-lg-5">
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center col-md-4"
          >
            <Image className="bg-primary rounded-circle" fluid src={Code} />
            <figcaption>
              {t('landing.easyStart.first')} {t('landing.easyStart.second')}
            </figcaption>
          </Col>
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center col-md-4"
          >
            <Image className="bg-primary rounded-circle" fluid src={Devices} />
            <figcaption>
              {t('landing.allDevices.first')} {t('landing.allDevices.second')}
            </figcaption>
          </Col>
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center col-md-4"
          >
            <Image className="bg-primary rounded-circle" fluid src={Share} />
            <figcaption>
              {t('landing.shareCode.first')} {t('landing.shareCode.second')}
            </figcaption>
          </Col>
        </Row>
        <Row className="mb-lg-5 pb-lg-5 gap-lg-3">
          <Col className="col-12" lg={{ span: 5, offset: 1 }}>
            <h2 className="mt-5 mb-4">{t('landing.noConfig')}</h2>
          </Col>
          <Col className="col-12 mb-xl-5 pe-lg-3" lg={{ span: 5 }}>
            <p className="mt-2 mb-3 mt-xl-5">{t('landing.modern')}</p>
            <p className="mb-3">{t('landing.fast')}</p>
          </Col>
        </Row>
        <Row>
          <Col className="my-3 d-lg-none">
            <figure>
              <figcaption className="mb-3">{t('landing.inBrowser')}</figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel1} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                {t('landing.noZIP')}
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel2} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                {t('landing.allComputers')}
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel3} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                {t('landing.allOS')}
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel4} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                {t('landing.noSettings')}
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel5} />
            </figure>
          </Col>
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
        <Row>
          <Col className="my-lg-5" lg={{ offset: 1 }}>
            <h2 className="my-5">{t('landing.moreOpportunity')}</h2>
          </Col>
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
                <h3 className="ps-3">{t('landing.readyBoilerplates.title')}</h3>
              </div>
              <p>{t('landing.readyBoilerplates.text')}</p>
            </div>
          </Col>
          <Col className="col-12 mb-lg-5 d-flex" lg={7}>
            <Image className="rounded-5" fluid src={ImageUnderCarousel} />
          </Col>
        </Row>
        <Row className="pb-3 mb-5">
          <Col className="text-center col-12">
            <p className="pt-3 mb-4 d-lg-none">{t('landing.nowCoding')}</p>
            <p className="fs-2 pt-3 mb-4 d-none d-lg-block">
              {t('landing.nowCoding')}
            </p>
          </Col>
          <Col className="mx-auto d-grid mb-lg-5" xl={{ span: 3 }}>
            <Button className="button-start rounded-5 px-auto" size="lg">
              {t('landing.startCoding')}
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
    </>
  );
}

export default Landing;
