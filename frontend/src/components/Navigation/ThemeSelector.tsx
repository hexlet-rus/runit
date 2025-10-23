import { useTranslation } from 'react-i18next';
import { Button, Stack, Popover, UnstyledButton } from '@mantine/core';

import { CircleHalf, MoonFill, SunFill } from 'react-bootstrap-icons';

import { useTernaryDarkMode } from 'usehooks-ts';
import { useState } from 'react';

const themeIcons = {
  dark: MoonFill,
  light: SunFill,
  system: CircleHalf,
};

function ThemeOption({ themeName, handleSelect, active = false }) {
  const { t } = useTranslation();

  const ThemeIcon = themeIcons[themeName];
  return (
    <Button onClick={handleSelect}>
      <ThemeIcon className="bi" />
      {t(`settings.themes.${themeName}`)}
    </Button>
  );
}

function ThemeSelector() {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { t: tST } = useTranslation('translation', {
    keyPrefix: 'settings.themes',
  });
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();
  const CurrentThemeIcon = themeIcons[ternaryDarkMode];

  const handleCloseDropdown = (themeName: string) => {
    setTernaryDarkMode(themeName as typeof ternaryDarkMode);
    setPopoverOpen(false);
  };

  return (
    <Popover
      opened={popoverOpen}
      onChange={() => setPopoverOpen((o) => !o)}
      offset={0}
    >
      <Popover.Target>
        <UnstyledButton onClick={() => setPopoverOpen((o) => !o)}>
          <CurrentThemeIcon />
          <span className="visually-hidden">{tST('header')}</span>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap={5} p={5}>
          {Object.keys(themeIcons).map((themeName) => (
            <ThemeOption
              key={themeName}
              active={themeName === ternaryDarkMode}
              handleSelect={() => handleCloseDropdown(themeName)}
              themeName={themeName}
            />
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export default ThemeSelector;
