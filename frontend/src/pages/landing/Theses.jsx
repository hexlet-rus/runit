import { useTranslation } from 'react-i18next';

import { Col, Image, Row } from 'react-bootstrap';

import ImageCarousel1 from './assets/DisplayWithCode1.jpeg';
import ImageCarousel2 from './assets/DisplayWithCode2.jpeg';
import ImageCarousel3 from './assets/DisplayWithCode3.jpeg';
import ImageCarousel4 from './assets/DisplayWithCode4.jpeg';
import ImageCarousel5 from './assets/DisplayWithCode5.jpeg';

const HEIGHT_LG = '220px';
const WIDTH_LG = '600px';
const HEIGHT_ADAPTIVE = '137.5rem';
const WIDTH_ADAPTIVE = '100%';

function Theses() {
  const { t: tL } = useTranslation('translation', { keyPrefix: 'landing' });

  const cards = [
    { id: 1, image: ImageCarousel1, text: tL('inBrowser') },
    { id: 2, image: ImageCarousel2, text: tL('noZIP') },
    { id: 3, image: ImageCarousel3, text: tL('allComputers') },
    { id: 4, image: ImageCarousel4, text: tL('allOS') },
    { id: 5, image: ImageCarousel5, text: tL('noSettings') },
  ];

  return (
    <Col className="mt-3">
      <Row className="d-none d-lg-inline-flex mb-5 pb-5">
        {cards.map(({ id, image, text }, index) => {
          const isEven = index % 2 === 0;
          return (
            <figure
              key={id}
              className="mb-5 d-flex flex-row gap-5 align-items-center m-0 justify-content-center"
            >
              {isEven && (
                <Col>
                  <Image
                    className="rounded-5 object-fit-cover"
                    height={HEIGHT_LG}
                    src={image}
                    width={WIDTH_LG}
                  />
                </Col>
              )}
              <Col>
                <figcaption>{text}</figcaption>
              </Col>
              {!isEven && (
                <Col>
                  <Image
                    className="rounded-5 object-fit-cover"
                    height={HEIGHT_LG}
                    src={image}
                    width={WIDTH_LG}
                  />
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
              className="rounded-5 mb-4 mx-auto object-fit-cover"
              height={HEIGHT_ADAPTIVE}
              src={image}
              width={WIDTH_ADAPTIVE}
            />
          </figure>
        ))}
      </Col>
    </Col>
  );
}

export default Theses;
