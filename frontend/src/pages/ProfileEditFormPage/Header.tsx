import { ActionIcon, AppShell, Box, Button, Group } from '@mantine/core';
import { LanguageIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useAuth, useLanguage } from '../../hooks';

function Header() {
  const { t: profileEditText } = useTranslation('translation', {
    keyPrefix: 'profileEdit',
  });

  const { language, setLanguage } = useLanguage();
  const handleChangeLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const { signOut } = useAuth();

  return (
    <AppShell.Header>
      <Group align="center" gap={0} justify="space-between" p="lg">
        <Group align="center" justify="left">
          <Button
            color="indigo"
            ml="lg"
            radius="md"
            size="sm"
            variant="filled"
          />
          <Box fw={700} ml="xs" style={{ fontSize: '18px' }}>
            {profileEditText('header')}
          </Box>
        </Group>
        <Group align="center" justify="flex-end">
          <ActionIcon
            onClick={() => handleChangeLanguage()}
            size="lg"
            variant="default"
          >
            <LanguageIcon style={{ width: '50%', height: '50%' }} />
          </ActionIcon>
          <Button mr="lg" onClick={signOut} radius="lg" variant="default">
            {profileEditText('logout')}
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

export default Header;
