import { Button, Col, Container, Image, Row } from 'react-bootstrap';

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
      >
        <Row className="my-5 pt-5">
          <Col className='pt-5'>
            <div className='pt-5'>
              <p>Бесплатный проект Хекслета</p>
            </div>
            <h1 style={{fontSize: '3.4rem'}}>Мгновенный</h1>
            <div className='d-flex align-items-center pb-5 mb-5'>
              <h1 className="m-0 pe-3" style={{fontSize: '3.4rem'}}>IDE</h1>
              <p className="m-0 ps-3">Пишите код прямо в браузере</p>
            </div>
          </Col>
        </Row>
        <Row className="my-5 pt-5">
          <Col className="text-center d-grid">
            <Button className="rounded-5 px-auto" size="lg">
              Начать кодить
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center pt-4" 
          >
            <Image className="bg-primary rounded-circle" fluid src={Code} />
            <figcaption>
              Запускайте JavaScript код, не устанавливая приложения
            </figcaption>
          </Col>
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center"
          >
            <Image className="bg-primary rounded-circle" fluid src={Devices} />
            <figcaption>
              Работайте на любом устройстве, c любой операционной системой
            </figcaption>
          </Col>
          <Col
            as="figure"
            className="col-12 d-flex flex-row gap-4 align-items-center pb-5 mb-4"
          >
            <Image className="bg-primary rounded-circle" fluid src={Share} />
            <figcaption>Делитесь своим кодом c другими участниками</figcaption>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="col-12">
            <h2 className='mt-5 mb-4'>Без загрузок, конфигураций и настроек</h2>
          </Col>
          <Col className="col-12">
            <p className='mt-2 mb-3'>
              B современной веб-разработке нужно постоянно следить за последними
              новостями, a еще лучше — испытывать новинки в реальных условиях.
            </p>
          </Col>
          <Col className="col-12">
            <p className="mb-3">
              Бесплатный онлайн-редактор кода Run IT позволит это делать быстро
              и без лишней суеты c настройками.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className='my-3'>
            <figure>
              <figcaption className="mb-3">
                Редактор полностью запускается в браузере, поэтому вы можете
                начать кодить за считанные секунды
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel1} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                Больше никаких ZIP, PKG, DMG и WTF
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel2} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                Работайте c любого компьютера, имеющего доступ в интернет
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel3} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                Используйте редактор на macOS, Windows, Linux или любой другой
                OC
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel4} />
            </figure>
            <figure>
              <figcaption className="mb-3 mt-3">
                He тратьте время на настройку среды
              </figcaption>
              <Image className="rounded-5 mb-4" fluid src={ImageCarousel5} />
            </figure>
          </Col>
        </Row>
        <Row
          style={{
            backgroundImage: `url(${SmallBGElement})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundClip: 'content-box',
          }}
        >
          <Col>
            <h2 className='my-5'>Ещё больше возможностей в будущем</h2>
          </Col>
        </Row>
        <Row>
          <Col className="gap-2">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <Image className='pe-3' src={Languages} />
                <h3 className="fs-2 ps-3">Все языки</h3>
              </div>
              <p>
                Пока наша среда разработки запускает код только на JavaScript. В
                ближайшем будущем мы реализуем в редакторе поддержку других
                популярных языков программирования.
              </p>
            </div>
            <div className="d-flex flex-column gap-3 pt-3">
              <div className="d-flex align-items-center">
                <Image className='pe-3' src={TeamWork} />
                <h3 className="fs-2 ps-3">Совместная работа</h3>
              </div>
              <p>
                Пока наша среда разработки запускает код только на JavaScript. В
                ближайшем будущем мы реализуем в редакторе поддержку других
                популярных языков программирования
              </p>
            </div>
            <div className="d-flex flex-column gap-3 pt-3">
              <div className="d-flex align-items-center">
                <Image className='pe-3' src={Template} />
                <h3 className="fs-2 ps-3">Готовые шаблоны с кодом</h3>
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
          <Col className="text-center d-grid pb-3 mb-5">
            <p className="pt-3 mb-4 px-auto">
              Попробуйте написать свой код прямо сейчас!
            </p>
            <Button className="rounded-5 px-auto mb-3" size="lg">
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
