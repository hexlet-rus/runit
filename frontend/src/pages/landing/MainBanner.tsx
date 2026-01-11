import { Text, Divider, Grid, Group, Box, Badge, Stack, Code, Card, Button, SimpleGrid, ThemeIcon, Title } from '@mantine/core';

import '@mantine/core/styles.css';
import { motion } from 'framer-motion';
import  PencilIcon  from './assets/IconMainBanner/Pencil.svg?react';
import PlayIcon from './assets/IconMainBanner/Play.svg?react';

// Типы данных
interface HeroBannerContent {
  id: number;
  title: string;
  textContent: string;
}

interface HeroBanner {
  id: number;
  subHeader: string;
  header: string;
  subtitle: string;
  content: HeroBannerContent[];
  CTA: string;
}

interface HeroBannerProps {
  data: HeroBanner;
}

// mockData - Моковые данные для пропса 
// mockData - Data for props of HeroBanner 

export const mockData: HeroBanner = {
  id: 1,
  subHeader: 'Быстрый старт',
  header: 'Мгновенный IDE в браузере',
  subtitle:
    'Пишите и запускайте код без установки конфигурации. Делитесь сниппетами, подключайте песочницы и встраваивайте в документацию.',
  content: [
    {
      id: 1,
      title: 'Запуск за секунды',
      textContent: 'Откройте и пишите - все готово',
    },
    {
      id: 2,
      title: 'Виджеты',
      textContent: 'Встраивайте интерактивные примеры',
    },
    {
      id: 3,
      title: 'Шаринг',
      textContent: 'Делитесь ссылкой или встраивайте статьи',
    },
  ],
  CTA: '',
};

const items = (data: HeroBannerContent[]) =>
  data.map((item) => {
    return (
      <Card key={item.id} p="md" radius="md" withBorder>
        <Group align="start" wrap="nowrap">
          <Stack align="start" gap={0}>
            <Text fw={700} size="md">
              {item.title}
            </Text>
            <Text size="xs">{item.textContent}</Text>
          </Stack>
        </Group>
      </Card>
    );
  });

function HeroBanner({ data = mockData }: HeroBannerProps) {
  const codeExample = `function greet(name) {
  console.log('Hello, ' + name);
}

greet('RunIT');`;

  const MotionWrapper = motion.div;

  return (
    <Box component="section"
    /* mb="xl" mt="xl" mx={{ base: 'sm', md: 'sm' }} strategy="grid" */
    >
      <MotionWrapper
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          duration: 1.8,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <Grid align="center" justify="center" mb="xl" mt="xl">
          <Grid.Col mb="xl" mt="xl" span={{ base: 12, md: 12, lg: 6 }}>
            <Text c="dimmed" fw={400} size="xs" tt="uppercase">
              {data.subHeader}
            </Text>
            <Title order={1} fw={900} fz="h1">
              {data.header}
            </Title>
            <Text size="md">{data.subtitle}</Text>
            <Button mb="xl" mt="xl" radius="lg">
              Начать кодить
            </Button>
            <SimpleGrid cols={3} spacing="xs">
              {items(data.content)}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ sx: 12, sm: 8, md: 6, lg: 6 }}>
            <Box>
              <Card bg="#1a1b1e" pl={0} pr={0} pt="xs" radius="md">
                <Group gap="xs" justify="space-between" pl="xs" pr="xs">
                  <Group gap="xs" justify="space-between">
                    <ThemeIcon color="red" radius="xl" size={10} />
                    <ThemeIcon color="yellow" radius="xl" size={10} />
                    <ThemeIcon color="green" radius="xl" size={10} />
                    <Text c="gray" size="xs">
                      JavaScript - demo.js
                    </Text>
                  </Group>
                  <Grid>
                    <Badge
                      color="dark"
                      mr="xs"
                      radius="sm"
                      size="md"
                      styles={{
                        label: { textTransform: 'none' },
                      }}
                      variant="filled"
                    >
                      snippet
                    </Badge>
                  </Grid>
                </Group>
                <Divider color="gray" my="sm" />
                <Code block c="white" color="#1a1b1e" h={120}>
                  {codeExample}
                </Code>
                <Group gap="xs" mt="sm" pl="xs" pr="xs">
                  <Button
                    color="blue"
                    leftSection={<PlayIcon style={{ height: 15 }} />}
                  >
                    Запустить
                  </Button>
                  <Button
                    color="gray"
                    leftSection={<PencilIcon style={{ height: 15 }} />}
                    variant="outline"
                  >
                    Редактировать
                  </Button>
                </Group>
              </Card>
            </Box>
          </Grid.Col>
        </Grid>
      </MotionWrapper>
    </Box>
  );
}

export default HeroBanner;
