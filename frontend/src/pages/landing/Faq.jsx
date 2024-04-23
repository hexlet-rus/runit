import { useContext } from 'react';
import {
  Accordion,
  AccordionContext,
  Col,
  Row,
  useAccordionButton,
} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';

function CustomToggle({ children, eventKey }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  const { isDarkMode } = useTernaryDarkMode();
  const colorForEl = isDarkMode ? 'white' : 'black';

  return (
    <div
      className={
        isCurrentEventKey
          ? 'd-grid'
          : `d-grid border-bottom border-${colorForEl}`
      }
    >
      <button
        className="btn py-4 d-flex justify-content-between align-items-center text-start"
        onClick={decoratedOnClick}
        type="button"
      >
        <h3 className="m-0  me-3">{children}</h3>
        {isCurrentEventKey ? (
          <div className="ms-3">
            <svg
              fill="none"
              height="48"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 30L24 18L12 30"
                stroke={colorForEl}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
          </div>
        ) : (
          <div className="ms-3">
            <svg
              fill="none"
              height="48"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18L24 30L36 18"
                stroke={colorForEl}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}

function Faq() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="my-5 pb-3" id="faq">
        <h2 className=" pb-3 mb-4">{t('faq.faq')}</h2>
        <Accordion defaultActiveKey="0" flush>
          <div>
            <CustomToggle eventKey="0">{t('faq.q0')}</CustomToggle>
            <Accordion.Collapse eventKey="0">
              <article className="px-3 ">
                <p>{t('faq.a0')}</p>
              </article>
            </Accordion.Collapse>
          </div>
          <div>
            <CustomToggle eventKey="1">{t('faq.q2')}</CustomToggle>
            <Accordion.Collapse eventKey="1">
              <article className="px-3 ">
                <p>
                  <Trans i18nKey="faq.a2" />
                </p>
                <p>
                  <Trans i18nKey="faq.a21" />
                </p>
                <p>
                  <Trans i18nKey="faq.a23" />
                </p>
              </article>
            </Accordion.Collapse>
          </div>
          <div>
            <CustomToggle eventKey="2">{t('faq.q3')}</CustomToggle>
            <Accordion.Collapse eventKey="2">
              <article className="px-3 ">
                <p>{t('faq.a3')}</p>
              </article>
            </Accordion.Collapse>
          </div>
          <div>
            <CustomToggle eventKey="3">{t('faq.q1')}</CustomToggle>
            <Accordion.Collapse eventKey="3">
              <article className="px-3 ">
                <p>{t('faq.a11')}</p>
                <p>
                  <Trans i18nKey="faq.a110" />
                </p>

                <p>
                  <Trans i18nKey="faq.a112" />
                </p>

                <p>
                  <Trans i18nKey="faq.a114" />
                </p>

                <p>
                  <Trans i18nKey="faq.a116" />
                </p>

                <p>
                  <Trans i18nKey="faq.a12" />
                </p>

                <p>
                  <Trans i18nKey="faq.a14" />
                </p>

                <p>
                  <Trans i18nKey="faq.a16" />
                </p>

                <p>
                  <Trans i18nKey="faq.a18" />
                </p>
              </article>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </Col>
    </Row>
  );
}

export default Faq;
