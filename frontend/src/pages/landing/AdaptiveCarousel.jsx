import { useTranslation } from 'react-i18next';

import { Col, Image, Row, Carousel } from 'react-bootstrap';

import ImageCarousel1 from './assets/DisplayWithCode1.jpeg';
import ImageCarousel2 from './assets/DisplayWithCode2.jpeg';
import ImageCarousel3 from './assets/DisplayWithCode3.jpeg';
import ImageCarousel4 from './assets/DisplayWithCode4.jpeg';
import ImageCarousel5 from './assets/DisplayWithCode5.jpeg';

function AdaptiveCarousel() {
  const { t: tL } = useTranslation('translation', { keyPrefix: 'landing' });

  const cards = [
    { image: ImageCarousel1, text: tL('inBrowser') },
    { image: ImageCarousel2, text: tL('noZIP') },
    { image: ImageCarousel3, text: tL('allComputers') },
    { image: ImageCarousel4, text: tL('allOS') },
    { image: ImageCarousel5, text: tL('noSettings') },
  ];

  return (
    <Row className="mt-3">
      <Col
        className="d-none d-lg-inline-flex mb-5 pb-5"
        lg={{ offset: 1, span: 10 }}
      >
        <Carousel className="mb-5" indicators={false}>
          {cards.map(({ image, text }) => (
            <Carousel.Item key={text}>
              <figure className="d-flex flex-row gap-5 align-items-center m-0 justify-content-center">
                <Col>
                  <Image className="card-carousel rounded-5" src={image} />
                </Col>
                <Col>
                  <figcaption>{text}</figcaption>
                </Col>
              </figure>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>

      <Col className="my-3 d-lg-none">
        {cards.map(({ image, text }) => (
          <figure key={text}>
            <figcaption className="mb-3 mx-auto">{text}</figcaption>
            <Image
              className="card-adaptive rounded-5 mb-4 mx-auto"
              fluid
              src={image}
            />
          </figure>
        ))}
      </Col>
    </Row>
  );
}

export default AdaptiveCarousel;
