import {
  Text,
  Flex,
  Group,
  Box,
  Stack,
  ThemeIcon,
  Card,
  SimpleGrid,
  Anchor,
  Title,
} from '@mantine/core';

import { motion } from 'framer-motion';
import '@mantine/core/styles.css';

import { ReactComponent as BeakerIcon } from './assets/IconFeatureSection/Beaker.svg';
import { ReactComponent as BriefcaseIcon } from './assets/IconFeatureSection/Briefcase.svg';
import { ReactComponent as CheckIcon } from './assets/IconFeatureSection/Check.svg';
import { ReactComponent as ClipboardIcon} from './assets/IconFeatureSection/ClipboardDocumentCheck.svg';
import { ReactComponent as LinkIcon } from './assets/IconFeatureSection/Link.svg';
import { ReactComponent as UsersIcon } from './assets/IconFeatureSection/Users.svg';
import { ReactNode } from 'react';

// Типы данных
interface Feature {
  id: number;
  title: string;
  textContent: string;
  icon: ReactNode;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

/* mocData - Моковые данные для пропса
  mocData - Data for props of FeaturesSection */

const mocData: Feature[] = [
    {
      id: 1,
      title: 'Песочницы',
      textContent: 'Окружения для JS, TS, Python, SQL и др.',
      icon: <BeakerIcon />,
    },
    {
      id: 2,
      title: 'Редактор',
      textContent: 'Легкий и быстрый, сохранение в один клик.',
      icon: <ClipboardIcon />,
    },
    {
      id: 3,
      title: 'Встраивание',
      textContent: 'HTML-виджет и React-компонент для любой документации.',
      icon: <LinkIcon />,
    },
    {
      id: 4,
      title: 'Проверки',
      textContent: 'Добавляйте тесты к задачам и урокам.',
      icon: <CheckIcon />,
    },
    {
      id: 5,
      title: 'API',
      textContent: 'Запускайте код из своих приложений.',
      icon: <BriefcaseIcon />,
    },
    {
      id: 6,
      title: 'Команда',
      textContent: 'Совместная работа и общий доступ',
      icon: <UsersIcon />,
    },
  ];

const MotionCardWrapper = motion.div;

const items = (data: Feature[]) => data.map((item) => {
  return (
    <MotionCardWrapper
    whileHover={{ scale: 1.1}}
    transition={{ duration: 0.3 }}
    style={{ cursor: 'pointer' }}
    >
      <Card 
        key={item.id}
        p="md"
        radius="md"
        withBorder
      >
      <Group align="start" wrap="nowrap">
        <ThemeIcon variant="white" size="md">
          {item.icon}
        </ThemeIcon>
        <Stack align="start" gap={0}>
          <Text fw={700} size="md">
            {item.title}
          </Text>
          <Text size="xs">
            {item.textContent}
          </Text>
        </Stack>
      </Group>
    </Card>
  </MotionCardWrapper>
)});

function FeaturesSection({ features = mocData }: FeaturesSectionProps) {

    return (
    <Box component="section" py="xl">
      <Flex
        align="start"
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'center' }}
        wrap="wrap"
      >
        <Box w="100%">
          <Group gap="xs" justify="space-between" pb={50} pt={0}>
            <Title order={2} mb="xl">
              Что умеет RunIT
            </Title>
            <Anchor href="#" c="blue" size="xs">
              Документация
            </Anchor>
          </Group>

          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 'md', md: 'xl' }}
            verticalSpacing={{ base: 'md', md: 'xl' }}
          >
            {items(features)}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}

export default FeaturesSection;
