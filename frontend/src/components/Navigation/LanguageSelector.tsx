import { useTranslation } from 'react-i18next';
import { Button, Stack, Popover, UnstyledButton } from '@mantine/core';

import { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks';

function LanguageSelector() {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { t: tSL, i18n } = useTranslation('translation', {
    keyPrefix: 'settings.languages',
  });

  const { language, availableLanguages, setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage(language);
  }, [setLanguage, language]);

  const handleCloseDropdown = (lng: string) => {
    setLanguage(lng);
    setPopoverOpen(false);
  };

  return (
    <Popover
      opened={popoverOpen}
      onChange={() => setPopoverOpen(!popoverOpen)}
      offset={0}
    >
      <Popover.Target>
        <UnstyledButton onClick={() => setPopoverOpen((o) => !o)}>
          <span className="text-uppercase">{language}</span>
          <span className="visually-hidden">{tSL('header')}</span>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack h={80} gap={5} justify="center">
          {availableLanguages.map((lng) => (
            <Button key={lng} onClick={() => handleCloseDropdown(lng)}>
              {i18n.getFixedT(lng)('language')}
            </Button>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export default LanguageSelector;
