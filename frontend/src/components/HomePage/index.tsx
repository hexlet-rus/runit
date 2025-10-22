import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import { useTernaryDarkMode } from 'usehooks-ts';
import { useAuth } from '../../hooks';
import routes from '../../routes';
import { actions } from '../../slices/modalSlice';
import Faq from './Faq';
import Footer from './Footer';
import Header from './Header';
import Theses from './Theses';
import './assets/fonts/NunitoSans_10pt-Light.ttf';
import './landing.scss';

import Code from './assets/Icons=Code.svg';
import Devices from './assets/Icons=Devices.svg';
import Languages from './assets/Icons=Languages.svg';
import Share from './assets/Icons=Share.svg';
import TeamWork from './assets/Icons=TeamWork.svg';
import Template from './assets/Icons=Template.svg';
import ImageUnderCarousel from './assets/ReadyAssets.jpeg';

function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t: tL } = useTranslation('translation', { keyPrefix: 'landing' });
  const { isDarkMode } = useTernaryDarkMode();
  const rowClass = `d-lg-inline-flex mb-5 my-lg-5 ${
    isDarkMode ? 'background-light' : ''
  } align-items-center`;

  const handleCodeWithoutRegButton = () => {
    if (isLoggedIn) {
      navigate(routes.myProfilePagePath());
      return;
    }
    dispatch(actions.openModal({ type: 'newSnippet' }));
  };

  return (
    <div className="wrapper-for-bg-images">
      <div className="first-bg-image mx-auto">
        <Header />
        <Container className="landing-body">
          <Row className="my-5 pt-5 about-project" id="aboutProject">
            <Col className="pt-5 d-lg-none" lg={{ offset: 1 }}>
              <div className="pt-5">
                <p>{tL('freeProject')}</p>
              </div>
              <div className="d-flex justify-content-start flex-wrap align-items-center pb-5 mb-5 title-wrapper">
                <h1>{tL('fastIDE.first')}</h1>
                <h1>{tL('fastIDE.second')}</h1>
                <p className="m-0">{tL('writeInBrowser')}</p>
              </div>
            </Col>
            <Col
              className="pt-5 d-none d-lg-flex flex-column"
              lg={{ offset: 1 }}
            >
              <h4 className="m-0 pt-5">{tL('freeProject')}</h4>
              <h1 className="m-0">
                {tL('fastIDE.first')} {tL('fastIDE.second')}
              </h1>
              <div className="align-items-center pb-5 mb-5">
                <h2 className="m-0">{tL('writeInBrowser')}</h2>
              </div>
            </Col>
          </Row>
          <Row className="my-5" xs="auto">
            <Col className="mb-3" lg={{ offset: 1 }}>
              <Button
                as="a"
                className="btn-start rounded-5"
                size="lg"
                href={routes.signInPagePath()}
              >
                {tL('startCoding')}
              </Button>
            </Col>
            <Col>
              <Button
                className="btn-start-no-reg rounded-5"
                onClick={handleCodeWithoutRegButton}
                size="lg"
              >
                {tL('codeWithoutReg')}
              </Button>
            </Col>
          </Row>
          <Row className={rowClass}>
            <div className="d-lg-flex py-5 py-xl-4 py-lg-1 px-lg-1 justify-content-between px-5">
              <Col
                as="figure"
                className="col-12 d-flex flex-row gap-4 align-items-center col-lg-3 mb-4 mb-lg-0"
              >
                <Image className="bg-primary rounded-circle" fluid src={Code} />
                <figcaption>
                  {tL('easyStart.first')} {tL('easyStart.second')}
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
                  {tL('allDevices.first')} {tL('allDevices.second')}
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
                  {tL('shareCode.first')} {tL('shareCode.second')}
                </figcaption>
              </Col>
            </div>
          </Row>
          <Row className="mb-lg-5 pb-lg-5 gap-lg-3 mt-5" id="advantages">
            <Col className="col-12" lg={{ span: 5, offset: 1 }}>
              <h2 className="mt-5 mb-4">{tL('noConfig')}</h2>
            </Col>
            <Col className="col-12 mb-xl-5 pe-lg-3" lg={{ span: 5 }}>
              <p className="mt-2 mb-3 mt-xl-5">{tL('modern')}</p>
              <p className="mb-3">{tL('fast')}</p>
            </Col>
          </Row>

          <Theses />

          <Row>
            <div className="my-5 possibilities-background">
              <Col className="my-lg-5" id="possibilities" lg={{ offset: 1 }}>
                <h2 className="m-0">{tL('moreOpportunity')}</h2>
              </Col>
            </div>
          </Row>
          <Row className="mb-lg-5">
            <Col className="gap-2 mb-lg-5" lg={5}>
              <div className="d-flex flex-column gap-3 mb-lg-5">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={Languages} />
                  <h3 className="ps-3">{tL('allLanguages.title')}</h3>
                </div>
                <p>{tL('allLanguages.text')}</p>
              </div>
              <div className="d-flex flex-column gap-3 pt-3 mb-lg-5">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={TeamWork} />
                  <h3 className="ps-3">{tL('teamWork.title')}</h3>
                </div>
                <p>{tL('teamWork.text')}</p>
              </div>
              <div className="d-flex flex-column gap-3 pt-3">
                <div className="d-flex align-items-center">
                  <Image className="pe-3" fluid src={Template} />
                  <h3 className="ps-3">{tL('readyBoilerplates.title')}</h3>
                </div>
                <p>{tL('readyBoilerplates.text')}</p>
              </div>
            </Col>
            <Col className="col-12 mb-lg-5 d-flex" lg={7}>
              <Image className="rounded-5" fluid src={ImageUnderCarousel} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              <p className="pt-3 mb-4 d-lg-none">{tL('nowCoding')}</p>
              <p className="fs-2 pt-3 mb-4 d-none d-lg-block">
                {tL('nowCoding')}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                as={Link as any}
                className="btn-start rounded-5 mb-3"
                size="lg"
                to={routes.signInPagePath()}
              >
                {tL('startCoding')}
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
                {tL('codeWithoutReg')}
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

export default HomePage;
