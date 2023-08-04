import { useTranslation } from 'react-i18next';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { CircleHalf, MoonFill, SunFill } from 'react-bootstrap-icons';

import { useTernaryDarkMode } from 'usehooks-ts';

const themeIcons = {
  dark: MoonFill,
  light: SunFill,
  system: CircleHalf,
};

function ThemeOption({ themeName, handleSelect, active = false }) {
  const { t } = useTranslation();

  const ThemeIcon = themeIcons[themeName];
  return (
    <li>
      <Dropdown.Item active={active} as={Button} onClick={handleSelect}>
        <ThemeIcon className="bi" /> {t(`settings.themes.${themeName}`)}
      </Dropdown.Item>
    </li>
  );
}

function ThemeSelector() {
  const { t } = useTranslation();

  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();

  const CurrentThemeIcon = themeIcons[ternaryDarkMode];
  return (
    <Dropdown align="end" as="li" className="nav-item">
      <Dropdown.Toggle
        as={Button}
        className="d-flex py-2 px-0 px-lg-2 align-items-center nav-link"
        variant="link"
      >
        <CurrentThemeIcon />
        <span className="visually-hidden">{t('settings.themes.header')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu as="ul">
        {Object.keys(themeIcons).map((themeName) => (
          <ThemeOption
            key={themeName}
            active={themeName === ternaryDarkMode}
            handleSelect={() => setTernaryDarkMode(themeName)}
            themeName={themeName}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSelector;
