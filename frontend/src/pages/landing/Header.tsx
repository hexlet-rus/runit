import { useDisclosure } from '@mantine/hooks';
import { useTernaryDarkMode } from 'usehooks-ts';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Anchor,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import RunItLogoLight from './assets/LogoHeaderLightTheme.svg';
import RunItLogoDark from './assets/LogoHeaderDarkTheme.svg';

import LanguageSelector from '../../components/Navigation/LanguageSelector';
import ThemeSelector from '../../components/Navigation/ThemeSelector';

import routes from '../../routes';

interface AnchorData {
  owner: string;
  textContent: string;
}

type PropsType = {
  data: Array<AnchorData>;
};

const mockdata: AnchorData[] = [
  {
    owner: 'about',
    textContent: 'О проекте',
  },
  {
    owner: 'possibilities',
    textContent: 'Возможности',
  },
  {
    owner: 'technologies',
    textContent: 'Технологии',
  },
  {
    owner: 'community',
    textContent: 'Сообщество',
  },
  {
    owner: 'faq',
    textContent: 'FAQ',
  },
];

export function Header(_data: PropsType) {
  const { t: tLH } = useTranslation('translation', {
    keyPrefix: 'landing.header',
  });
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });

  const redir = useNavigate();

  const handleRedirToSignUp = () => {
    redir(routes.signUpPagePath());
  };

  const handleRedirToSignIn = () => {
    redir(routes.signInPagePath());
  };

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { isDarkMode } = useTernaryDarkMode();
  const logo = isDarkMode ? RunItLogoDark : RunItLogoLight;

  const ComputedAnchorElements = () => {
    return mockdata.map((el) => (
      <Anchor key={el.owner}>{el.textContent}</Anchor>
    )); // После того как будет написан роут заменить "mockdata" на данные приходящие из trpc....
  };

  return (
    <Box pb={120} pt={22}>
      <header>
        <Group justify="space-around" h="96%">
          <img src={logo} alt="hexletLogo" />
          <Group h="100%" gap={18} visibleFrom="lg">
            {ComputedAnchorElements()}
          </Group>

          <Group visibleFrom="md">
            <LanguageSelector />
            <ThemeSelector />
            <Button
              variant="default"
              radius="xl"
              onClick={() => handleRedirToSignIn()}
            >
              {tPA('signIn')}
            </Button>
            <Button radius="xl" onClick={() => handleRedirToSignUp()}>
              {tPA('signUp')}
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="lg"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={<img src={logo} alt="" width="70%" />}
        size="100%"
        padding="md"
        zIndex={65535}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          <Flex
            mih={50}
            gap="sm"
            justify="center"
            align="flex-start"
            direction="column"
            wrap="wrap"
            pl={10}
          >
            {ComputedAnchorElements()}
          </Flex>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={() => handleRedirToSignUp()}>
              <span>{tPA('signUp')}</span>
            </Button>
            <Button onClick={() => handleRedirToSignIn()}>
              <span>{tPA('signIn')}</span>
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
