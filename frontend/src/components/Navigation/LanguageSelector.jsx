import { useTranslation } from 'react-i18next';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { useLanguage } from '../../hooks';

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const { language, availableLanguages, setLanguage } = useLanguage();

  return (
    <Dropdown align="end" as="li" className="nav-item">
      <Dropdown.Toggle
        as={Button}
        className="d-flex py-2 px-0 px-lg-2 align-items-center nav-link"
        variant="link"
      >
        <span className="text-uppercase">{language}</span>
        <span className="visually-hidden">
          {t('settings.languages.header')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        {availableLanguages.map((lng) => (
          <li key={lng}>
            <Dropdown.Item
              active={lng === language}
              as={Button}
              onClick={() => setLanguage(lng)}
            >
              {i18n.getFixedT(lng)('language')}
            </Dropdown.Item>
          </li>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
