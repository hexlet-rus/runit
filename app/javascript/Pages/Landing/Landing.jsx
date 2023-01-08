import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Faq } from '../../components/Faq';
import classes from './Landing.module.css';
import Checked from '/app/assets/landing/images/checked.svg';

export function Landing() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-dark text-white fw-normal">
      <main className="container pb-5">
        <section className="d-flex flex-column flex-grow h-100 py-3 py-md-4 py-lg-5 justify-content-evenly">
          <section>
            <Row>
              <p className="text-center mb-0 fs-5 lh-5">
                Бесплатный проект Хекслета
              </p>
            </Row>
            <Row className="my-3">
              <h1 className="text-center fw-bold mb-0 mt-sm-5 display-1">
                Мгновенный IDE
              </h1>
            </Row>
            <Row>
              <p className="text-center mb-0 fw-bolder mb-5 mt-sm-4 fs-3 lh-3">
                Пишите код прямо в браузере!
              </p>
            </Row>
          </section>
          <section>
            <Row className="row-cols-1 row-cols-sm-3">
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src="/landing/images/tag.png"
                  alt="tag"
                />
                <p className="fs-5 mb-0 lh-5">
                  Запускайте JavaScript код,
                  <br />не устанавливая приложение
                </p>
              </Col>
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src="/landing/images/os.png"
                  alt="tag"
                />
                <p className="fs-5 mb-0 lh-5">
                  Работайте на любом устройстве,
                  <br />с любой операционной системой
                </p>
              </Col>
              <Col className="d-flex flex-sm-column align-items-center align-items-sm-start mb-3 mb-sm-0">
                <img
                  className="mb-sm-3 mb-1 me-3 me-sm-0"
                  src="/landing/images/share.png"
                  alt="tag"
                />
                <p className="fs-5 mb-0 lh-5">
                  Делитесь своим кодом с другими
                  <br /> участниками
                </p>
              </Col>
            </Row>
          </section>
          <section>
            <div className="d-grid col-md-4 col-sm-5 col-6 mx-auto">
              <a
                href="/editor"
                className="btn btn-primary py-3 fs-5 fw-bold mt-5 lh-5"
              >
                Начать кодить
              </a>
            </div>
          </section>
        </section>
        <section className="mt-5">
          <Row>
            <h2 className="text-center display-4 fw-bold mb-0">
              Без загрузок, конфигураций и настроек
            </h2>
          </Row>
          <Row className="mt-5 row-cols-1 row-cols-sm-2 d-flex justify-content-between">
            <Col className="mb-5 mb-sm-0">
              <p className="fs-4 mb-0 lh-5">
                В современной веб-разработке нужно постоянно следить за последними
                последними новостями, а еще лучше — испытывать новинки в
                реальных
                <br /> <br /> Бесплатный онлайн-редактор кода Run IT позволит это
                делать быстро и без лишней суеты с настройками.
              </p>
            </Col>
            <Col>
              <ul className="mb-0 custom-list mx-2 mx-sm-0">
                <li className="mb-3 position-relative d-flex">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">
                    Редактор полностью запускается в браузере, поэтому вы можете
                    начать кодить за считанные секунды
                  </p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">Больше никаких ZIP, PKG, DMG и WTF</p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">
                    Работайте с любого компьютера, имеющего доступ в интернет
                  </p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">
                    Используйте редактор на macOS, Windows, Linux или любой другой
                    ОС
                  </p>
                </li>
                <li className="mb-3 position-relative">
                  <img className={`${classes.img}`} src={Checked} alt="" />
                  <p className="fs-5 lh-5">Не тратьте время на настройку среды</p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <section className="mt-90">
          <Row>
            <h2 className="text-center display-4 fw-bold mb-0">Еще больше возможностей в будущем</h2>
          </Row>
          <Row className="row-cols-1 row-cols-sm-3 mt-55">
            <Col className="mb-4 mb-sm-0">
              <div className="d-flex flex-column">
                <img
                  src="/landing/images/code.png"
                  alt="code"
                  className="mb-3"
                  width="39"
                  height="39"
                />
                <p className="mb-2">Все языки</p>
                <p className="mb-0">Пока наша среда разработки запускает код только на JavaScript. В ближайшем будущем мы реализуем в редакторе поддержку других популярных языков программирования</p>
              </div>
            </Col>
            <Col className="mb-4 mb-sm-0">
              <div className="d-flex flex-column">
                <img
                  src=""
                  src="/landing/images/person.png"
                  className="mb-3"
                  alt="person"
                  width="39"
                  height="39"
                />
                <p className="mb-2">Совместная работа</p>
                <p className="mb-0">Вы сможете делиться ссылкой на фрагменты своего кода с другими участниками. Или работать вместе прямо в Run IT!</p>
              </div>
            </Col>
            <Col className="mb-4 mb-sm-0">
              <div className="d-flex flex-column">
                <img
                  src="/landing/images/blank.png"
                  alt="blank"
                  className="mb-3"
                  width="39"
                  height="39"
                />
                <p className="mb-2">Готовые шаблоны с кодом</p>
                <p className="mb-0">Больше не будет необходимости каждый раз писать код с нуля. Мы сделаем шаблоны, чтобы вы могли проверить свои идеи на практике еще быстрее</p>
              </div>
            </Col>
          </Row>
        </section>
        <section className="mt-90">
          <Row>
            <h3 className="text-center fs-2 mb-0 lh-2">Попробуйте написать свой код прямо сейчас!</h3>
            <Row className="mt-40">
              <div className="d-grid col-7 col-sm-5 col-md-4 mx-auto">
                <a
                  href="/editor"
                  className="btn btn-primary py-3 fs-5 fw-bold lh-5"
                >
                  Начать кодить
                </a>
              </div>
            </Row>
          </Row>
        </section>
        <Faq />
      </main>
    </div>
  );
}
