import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Faq } from '../pages/about/Faq.jsx';

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
import BGElement from './assets/BGElement.svg';
import SmallBGElement from './assets/SmallBGElement.svg';

function Landing() {
  return (
    <>
      <Header />
      <Container
        style={{
          backgroundImage: `url(${BGElement})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          
        }}
        fluid
        className="fs-5 p-5 gap-5 m-0"
      >
        <Row className="mb-5">
          <Col>
            <span>Бесплатный проект Хекслета</span>
            <h1>Мгновенный IDE</h1>
            <span className="fs-2">Пишите код прямо в браузере</span>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="text-center">
            <Button className="rounded-5 px-5" size="lg">
              <span>Начать кодить</span>
            </Button>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="col-12 p-3">
            <Image fluid src={Code} />
            <span className="px-5">
              Запускайте JavaScript код, не устанавливая приложения
            </span>
          </Col>
          <Col className="col-12 px-3">
            <Image fluid src={Devices} />
            <span className="px-5">
              Работайте на любом устройстве, c любой операционной системой
            </span>
          </Col>
          <Col className="col-12 p-3">
            <Image fluid src={Share} />
            <span className="px-5">
              Делитесь своим кодом c другими участниками
            </span>
          </Col>
        </Row>
      </Container>
      <Container fluid className='m-0'>
        <Row>
          <Col>
            <h2>Без загрузок, конфигураций и настроек</h2>
          </Col>
          <Col>
            <p>
              B современной веб-разработке нужно постоянно следить за последними
              новостями, a еще лучше — испытывать новинки в реальных условиях.
            </p>
          </Col>
          <Col>
            <p className="mb-5">
              Бесплатный онлайн-редактор кода Run IT позволит это делать быстро
              и без лишней суеты c настройками.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Редактор полностью запускается в браузере, поэтому вы можете
              начать кодить за считанные секунды
              <Image
                className="rounded-5 pt-3 pb-5"
                fluid
                src={ImageCarousel1}
              />
            </p>

            <p>
              Больше никаких ZIP, PKG, DMG и WTF
              <Image
                className="rounded-5 pt-3 pb-5"
                fluid
                src={ImageCarousel2}
              />
            </p>
            <p>
              Работайте c любого компьютера, имеющего доступ в интернет
              <Image
                className="rounded-5 pt-3 pb-5"
                fluid
                src={ImageCarousel3}
              />
            </p>
            <p>
              Используйте редактор на macOS, Windows, Linux или любой другой OC
              <Image
                className="rounded-5 pt-3 pb-5"
                fluid
                src={ImageCarousel4}
              />
            </p>
            <p>
              He тратьте время на настройку среды
              <Image
                className="rounded-5 pt-3 pb-5"
                fluid
                src={ImageCarousel5}
              />
            </p>
          </Col>
        </Row>
        <Row className='py-5' style={{
          backgroundImage: `url(${SmallBGElement})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundClip: 'border-box'
        }}>
          <Col>
            <h2>Ещё больше возможностей в будущем</h2>
          </Col>
        </Row>
        <Row>
          <Col className="gap-2">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center">
                <Image src={Languages} />
                <h3 className="fs-2 ps-5">Все языки</h3>
              </div>
              <p>
                Пока наша среда разработки запускает код только на JavaScript. В
                ближайшем будущем мы реализуем в редакторе поддержку других
                популярных языков программирования.
              </p>
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center">
                <Image src={TeamWork} />
                <h3 className="fs-2 ps-5">Совместная работа</h3>
              </div>
              <p>
                Пока наша среда разработки запускает код только на JavaScript. В
                ближайшем будущем мы реализуем в редакторе поддержку других
                популярных языков программирования
              </p>
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center">
                <Image src={Template} />
                <h3 className="fs-2 ps-5">Готовые шаблоны с кодом</h3>
              </div>
              <p>
                Больше не будет необходимости каждый раз писать код с нуля. Мы
                сделаем шаблоны, чтобы вы могли проверить свои идеи на практике
                еще быстрее.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>Попробуйте написать свой код прямо сейчас!</p>
            <Button className="rounded-5 px-5" size="lg">
              <span>Начать кодить</span>
            </Button>
          </Col>
        </Row>
        <Faq />
      </Container>
      <Footer />
    </>
  );
}

export default Landing;
