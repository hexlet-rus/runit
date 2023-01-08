import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Faq.module.css';

export function Faq() {
  const { t } = useTranslation();
  return (
    <div className="mt-5">
      <div className="row">
        <h2 className="text-center h2 fw-bold mb-0">{t('faq.faq')}</h2>
      </div>
      <Accordion className="mt-40" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t('faq.q0')}</Accordion.Header>
          <Accordion.Body>{t('faq.a0')}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>{t('faq.q1')}</Accordion.Header>
          <Accordion.Body>
            {t('faq.a11')}
            <br />
            <br />
            <strong>{t('faq.a12')}</strong>
            {t('faq.a13')}
            <br />
            <br />
            <strong>{t('faq.a14')}</strong>
            {t('faq.a15')}
            <br />
            <br />
            <strong>{t('faq.a16')}</strong>
            {t('faq.a17')}
            <br />
            <br />
            <strong>{t('faq.a18')}</strong>
            {t('faq.a19')}
            <br />
            <br />
            <strong>{t('faq.a110')}</strong>
            {t('faq.a111')}
            <br />
            <br />
            <strong>{t('faq.a112')}</strong>
            {t('faq.a113')}
            <br />
            <br />
            <strong>{t('faq.a114')}</strong>
            {t('faq.a115')}
            <br />
            <br />
            <strong>{t('faq.a116')}</strong>
            {t('faq.a117')}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>{t('faq.q2')}</Accordion.Header>
          <Accordion.Body>
            {t('faq.a2')}
            <br />
            <br />
            <strong>{t('faq.a21')}</strong>
            {t('faq.a22')}
            <br />
            <br />
            <strong>{t('faq.a23')}</strong>
            {t('faq.a24')}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>{t('faq.q3')}</Accordion.Header>
          <Accordion.Body>
            {t('faq.a3')}
            <br />
            {t('faq.a31')}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
