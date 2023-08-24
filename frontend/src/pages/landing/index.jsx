import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import routes from '../../routes.js';

import { Faq } from '../about/Faq.jsx';
import classes from './index.module.css';
import Checked from '../../assets/landing/images/checked.svg';
import tagImg from '../../assets/landing/images/tag.png';
import osImg from '../../assets/landing/images/os.png';
import shareImg from '../../assets/landing/images/share.png';
import codeImg from '../../assets/landing/images/code.png';
import personImg from '../../assets/landing/images/person.png';
import blankImg from '../../assets/landing/images/blank.png';

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="bg-dark text-white fw-normal w-100">
      <main className="container pb-5">
        <section className="d-flex flex-column flex-grow h-100 py-3 py-md-4 py-lg-5 justify-content-evenly">
          <Row>
            <p className={`text-center mb-0 ${classes.fs5} ${classes.lh5}`}>
              {t('landing.freeProject')}
            </p>
          </Row>
          <Row className="my-3">
            <h1
              className={`${classes.colorPrimary} text-center fw-bold mb-0 mt-sm-5 display-1`}
            >
              {t('landing.fastIDE')}
            </h1>
          </Row>
          <Row>
            <p
              className={`text-center mb-0 mb-5 mt-sm-4 ${classes.fw500} ${classes.fs3} ${classes.lh3}`}
            >
              {t('landing.writeInBrowser')}
            </p>
          </Row>
          <Row className="row-cols-1 row-cols-sm-3">
            <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
              <img
                alt="tag"
                className="mb-sm-3 mb-1 me-3 me-sm-0"
                src={tagImg}
              />
              <p className={`${classes.fs5} mb-0 ${classes.lh5}`}>
                {t('landing.easyStart.first')}
                <br />
                {t('landing.easyStart.second')}
              </p>
            </Col>
            <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
              <img alt="os" className="mb-sm-3 mb-1 me-3 me-sm-0" src={osImg} />
              <p className={`${classes.fs5} mb-0 ${classes.lh5}`}>
                {t('landing.allDevices.first')}
                <br />
                {t('landing.allDevices.second')}
              </p>
            </Col>
            <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
              <img
                alt="share"
                className="mb-sm-3 mb-1 me-3 me-sm-0"
                src={shareImg}
              />
              <p className={`${classes.fs5} mb-0 ${classes.lh5}`}>
                {t('landing.shareCode.first')}
                <br />
                {t('landing.shareCode.second')}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button
              as={Link}
              className={`btn ${classes.btnPrimary} ${classes.btnAttention} py-3 ${classes.fs5} fw-bold ${classes.mt65} ${classes.lh5}"`}
              size="lg"
              to={routes.signInPagePath()}
            >
              {t('landing.startCoding')}
            </Button>
          </Row>
        </section>
        <section className={`${classes.mt45}`}>
          <h2 className="text-center display-4 fw-bold mb-0">
            {t('landing.noConfig')}
          </h2>
          <Row className="mt-5 row-cols-1 row-cols-sm-2 d-flex justify-content-between">
            <Col className="mb-5 mb-sm-0">
              <p className={`${classes.fs4} mb-0 ${classes.lh4} me-4`}>
                {t('landing.modern')}
                <br /> <br />
                {t('landing.fast')}
              </p>
            </Col>
            <Col>
              <ul className={`mb-0 ${classes.customList} mx-2 mx-sm-0`}>
                <li className="mb-3 d-flex">
                  <img alt="" className={`${classes.listIcon}`} src={Checked} />
                  <p className={`${classes.fs5} ${classes.lh5}`}>
                    {t('landing.inBrowser')}
                  </p>
                </li>
                <li className="mb-3 d-flex">
                  <img alt="" className={`${classes.listIcon}`} src={Checked} />
                  <p className={`${classes.fs5} ${classes.lh5}`}>
                    {t('landing.noZIP')}
                  </p>
                </li>
                <li className="mb-3 d-flex">
                  <img alt="" className={`${classes.listIcon}`} src={Checked} />
                  <p className={`${classes.fs5} ${classes.lh5}`}>
                    {t('landing.allComputers')}
                  </p>
                </li>
                <li className="mb-3 d-flex">
                  <img alt="" className={`${classes.listIcon}`} src={Checked} />
                  <p className={`${classes.fs5} ${classes.lh5}`}>
                    {t('landing.allOS')}
                  </p>
                </li>
                <li className="mb-3 d-flex">
                  <img alt="" className={`${classes.listIcon}`} src={Checked} />
                  <p className={`${classes.fs5} ${classes.lh5}`}>
                    {t('landing.noSettings')}
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <section className={`${classes.mt65}`}>
          <h2 className="text-center display-4 fw-bold mb-0">
            {t('landing.moreOpportunity')}
          </h2>
          <Row className={`${classes.mt55} row-cols-1 row-cols-sm-3`}>
            <Col className="d-flex flex-column mb-4 mb-sm-0">
              <div className="d-flex flex-sm-column align-items-center align-items-sm-start">
                <img
                  alt="code"
                  className="mb-3 me-3 me-sm-0"
                  height="39"
                  src={codeImg}
                  width="39"
                />
                <h5 className={`${classes.lh4} ${classes.fs4} mb-2`}>
                  {t('landing.allLanguages.title')}
                </h5>
              </div>
              <p className={`${classes.lh6} mb-0`}>
                {t('landing.allLanguages.text')}
              </p>
            </Col>
            <Col className="d-flex flex-column mb-4 mb-sm-0">
              <div className="d-flex flex-sm-column align-items-center align-items-sm-start">
                <img
                  alt="person"
                  className="mb-3 me-3 me-sm-0"
                  height="39"
                  src={personImg}
                  width="39"
                />
                <h5 className={`${classes.lh4} ${classes.fs4} mb-2`}>
                  {t('landing.teamWork.title')}
                </h5>
              </div>
              <p className={`${classes.lh6} mb-0`}>
                {t('landing.teamWork.text')}
              </p>
            </Col>
            <Col className="d-flex flex-column mb-4 mb-sm-0">
              <div className="d-flex flex-sm-column align-items-center align-items-sm-start">
                <img
                  alt="blank"
                  className="mb-3 me-3 me-sm-0"
                  height="39"
                  src={blankImg}
                  width="39"
                />
                <h5 className={`${classes.lh4} ${classes.fs4} mb-2`}>
                  {t('landing.readyBoilerplates.title')}
                </h5>
              </div>
              <p className={`${classes.lh6} mb-0`}>
                {t('landing.readyBoilerplates.text')}
              </p>
            </Col>
          </Row>
        </section>
        <section className={`${classes.mt45}`}>
          <h3 className={`text-center ${classes.fs2} mb-0 ${classes.lh2}`}>
            {t('landing.nowCoding')}
          </h3>
          <Row className="justify-content-center">
            <Button
              as={Link}
              className={`btn ${classes.btnPrimary} ${classes.btnAttention} py-3 ${classes.fs5} fw-bold ${classes.mt40} ${classes.lh5}"`}
              size="lg"
              to={routes.signInPagePath()}
            >
              {t('landing.startCoding')}
            </Button>
          </Row>
        </section>
        <section className={`${classes.mt90}`}>
          <Faq />
        </section>
      </main>
    </div>
  );
}

export default Landing;
