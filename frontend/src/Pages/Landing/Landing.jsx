import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import routes from '../../routes.js';
import { Faq } from '../../components/Faq';
import classes from './Landing.module.css';
import Checked from '../../assets/landing/images/checked.svg';
import tagImg from '../../assets/landing/images/tag.png';
import osImg from '../../assets/landing/images/os.png';
import shareImg from '../../assets/landing/images/share.png';
import codeImg from '../../assets/landing/images/code.png';
import personImg from '../../assets/landing/images/person.png';
import blankImg from '../../assets/landing/images/blank.png';

export function Landing() {
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 d-flex flex-column bg-dark text-white fw-normal">
      <main className="container pb-5">
        <section className="d-flex flex-column flex-grow h-100 py-3 py-md-4 py-lg-5 justify-content-evenly">
          <section>
            <Row>
              <p className="text-center mb-0 fs-5 lh-5">
                {t('landing.freeProject')}
              </p>
            </Row>
            <Row className="my-3">
              <h1 className="text-center fw-bold mb-0 mt-sm-5 display-1">
                {t('landing.fastIDE')}
              </h1>
            </Row>
            <Row>
              <p className="text-center mb-0 fw-bolder mb-5 mt-sm-4 fs-3 lh-3">
                {t('landing.writeInBrowser')}
              </p>
            </Row>
          </section>
          <section>
            <Row className="row-cols-1 row-cols-sm-3">
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src={tagImg}
                  alt="tag"
                />
                <p className="fs-5 mb-0 lh-5">
                  {t('landing.easyStart.first')}
                  <br />
                  {t('landing.easyStart.second')}
                </p>
              </Col>
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src={osImg}
                  alt="os"
                />
                <p className="fs-5 mb-0 lh-5">
                  {t('landing.allDevices.first')}
                  <br />
                  {t('landing.allDevices.second')}
                </p>
              </Col>
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src={shareImg}
                  alt="share"
                />
                <p className="fs-5 mb-0 lh-5">
                  {t('landing.shareCode.first')}
                  <br />
                  {t('landing.shareCode.second')}
                </p>
              </Col>
            </Row>
          </section>
          <section>
            <div className="d-grid col-md-4 col-sm-5 col-6 mx-auto">
              <Link
                to={routes.loginPagePath()}
                className="btn btn-primary py-3 fs-5 fw-bold mt-5 lh-5"
              >
                {t('landing.startCoding')}
              </Link>
            </div>
          </section>
        </section>
        <section className="mt-5">
          <Row>
            <h2 className="text-center display-4 fw-bold mb-0">
              {t('landing.noConfig')}
            </h2>
          </Row>
          <Row className="mt-5 row-cols-1 row-cols-sm-2 d-flex justify-content-between">
            <Col className="mb-5 mb-sm-0">
              <p className="fs-4 mb-0 lh-5 me-4">
                {t('landing.modern')}
                <br /> <br />
                {t('landing.fast')}
              </p>
            </Col>
            <Col>
              <ul className="mb-0 custom-list mx-2 mx-sm-0">
                <li className="mb-3 position-relative d-flex">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">{t('landing.inBrowser')}</p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">{t('landing.noZIP')}</p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">{t('landing.allComputers')}</p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">{t('landing.allOS')}</p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">{t('landing.noSettings')}</p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <section className="mt-90">
          <Row>
            <h2 className="text-center display-4 fw-bold mb-0">
              {t('landing.moreOpportunity')}
            </h2>
          </Row>
          <section className="mt-55">
            <Row className="row-cols-1 row-cols-sm-3">
              <Col className="mb-4 mb-sm-0">
                <div className="d-flex flex-column">
                  <img
                    src={codeImg}
                    alt="code"
                    className="mb-3"
                    width="39"
                    height="39"
                  />
                  <p className="mb-2">{t('landing.allLanguages.title')}</p>
                  <p className="mb-0">{t('landing.allLanguages.text')}</p>
                </div>
              </Col>
              <Col className="mb-4 mb-sm-0">
                <div className="d-flex flex-column">
                  <img
                    src={personImg}
                    className="mb-3"
                    alt="person"
                    width="39"
                    height="39"
                  />
                  <p className="mb-2">{t('landing.teamWork.title')}</p>
                  <p className="mb-0">{t('landing.teamWork.text')}</p>
                </div>
              </Col>
              <Col className="mb-4 mb-sm-0">
                <div className="d-flex flex-column">
                  <img
                    src={blankImg}
                    alt="blank"
                    className="mb-3"
                    width="39"
                    height="39"
                  />
                  <p className="mb-2">{t('landing.readyBoilerplates.title')}</p>
                  <p className="mb-0">{t('landing.readyBoilerplates.text')}</p>
                </div>
              </Col>
            </Row>
          </section>
        </section>
        <section className="mt-90">
          <Row>
            <h3 className="text-center fs-2 mb-0 lh-2">
              {t('landing.nowCoding')}
            </h3>
            <Row className="">
              <div className="d-grid col-7 col-sm-5 col-md-4 mx-auto">
                <Link
                  to={routes.loginPagePath()}
                  className="btn btn-primary py-3 fs-5 fw-bold lh-5 mt-40"
                >
                  {t('landing.startCoding')}
                </Link>
              </div>
            </Row>
          </Row>
        </section>
        <Faq />
      </main>
    </div>
  );
}
