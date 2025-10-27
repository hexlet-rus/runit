import { Title, Box, Flex, Paper, Text, Badge, Group } from '@mantine/core';
import type { TechnologyCategory } from 'src/types/components';

export const mocData: TechnologyCategory[] = [
  {
    category: 'Языки',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Go',
      'Rust',
      'C',
      'C++',
      'PHP',
      'Ruby',
    ],
  },
  {
    category: 'Базы данных',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'MongoDB',
      'Redis',
      'ClickHouse',
    ],
  },
  {
    category: 'Инструменты',
    items: ['Git', 'grep', 'curl', 'Mermaid', 'Latex'],
  },
];

function TechnologiesSection({ technologies }: { technologies: TechnologyCategory[] }) {
  return (
    <Box component="section" p="md">
      <Title order={2} mb="xl">
        Технологии
      </Title>
      <Text size="md">
        Поддерживаем популярные языки, базы данных и инструменты.
      </Text>
      <Flex
        my="lg"
        gap="md"
        justify="space-between"
        align="stretch"
        direction="row"
        wrap="wrap"
      >
        {technologies.map(({ category, items }, index) => {
          return (
            <Paper
              key={index}
              bg="transparent"
              withBorder
              shadow="xs"
              radius="md"
              p="xl"
              miw="250"
              mih={300}
              flex={1}
            >
              <Title opacity={0.5} order={4} mb="xl">
                {category}
              </Title>
              <Group gap="sm">
                {items.map((nameTehnology, index) => {
                  return (
                    <Badge
                      key={index}
                      p="sm"
                      size="md"
                      color="#0d6efd"
                      variant="outline"
                      bg="#0D6EFD19"
                      styles={{
                        label: { textTransform: 'none' },
                      }}
                    >
                      {nameTehnology}
                    </Badge>
                  );
                })}
              </Group>
            </Paper>
          );
        })}
      </Flex>
    </Box>
  );
};

export default TechnologiesSection;
