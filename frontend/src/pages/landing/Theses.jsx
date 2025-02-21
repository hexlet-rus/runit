import { useTranslation } from 'react-i18next';

import { Col, Image, Row } from 'react-bootstrap';

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
    <Col className="mt-3">
      <Row className="d-none d-lg-inline-flex mb-5 pb-5">
        {cards.map(({ image, text }, index) => {
          const checker = index % 2 === 0;
          return (
            <figure
              key={text}
              className="mb-5 d-flex flex-row gap-5 align-items-center m-0 justify-content-center"
            >
              {checker && (
                <Col>
                  <Image className="rounded-5 x-card-theses" width="600px" fluid src={image} />
                </Col>
              )}
              <Col>
                <figcaption>{text}</figcaption>
              </Col>
              {!checker && (
                <Col>
                  <Image className="rounded-5 x-card-theses" width="600px" fluid src={image} />
                </Col>
              )}
            </figure>
          );
        })}
      </Row>

      <Col className="my-3 d-lg-none">
        {cards.map(({ image, text }) => (
          <figure key={text}>
            <figcaption className="mb-3 mx-auto">{text}</figcaption>
            <Image
              className="rounded-5 mb-4 mx-auto x-card-theses"
              width="100%"
              fluid
              src={image}
            />
          </figure>
        ))}
      </Col>
    </Col>
  );
}

export default AdaptiveCarousel;
