import {
  Grid,
  Group,
  Button,
  Input,
  Divider,
  ThemeIcon,
  Card,
  Code,
  Text,
  Stack,
} from '@mantine/core';
import '@mantine/core/styles.css';
import PlayIcon from '../../assets/images/icons/snippetIcons/Play.svg?react';
import SaveIcon from '../../assets/images/icons/snippetIcons/DocumentPlus.svg?react';

function ItemButtons() {
  const items = [
    { icon: null, label: 'Мои сниппеты', variant: 'default' },
    { icon: PlayIcon, label: 'Запустить', variant: 'filled' },
    { icon: SaveIcon, label: 'Сохранить', variant: 'default' },
  ];

  const ButtonItem = items.map((item) => {
    return (
      <Button
        color="dark"
        leftSection={
          item.icon ? <item.icon style={{ height: 20 }} /> : undefined
        }
        radius="md"
        variant={item.variant}
      >
        {item.label}
      </Button>
    );
  });
  return (
    <Group gap="xs" justify="flex-start">
      {ButtonItem}
    </Group>
  );
}

export function Editor() {
  return (
    <Stack justify="center">
      <header>
        <Grid align="center" columns={24} grow gutter="sm" justify="center">
          <Grid.Col offset={1}>
            <Input placeholder="Новый сниппет" radius="md" />
          </Grid.Col>

          <Grid.Col span={9}>
            <ItemButtons />
          </Grid.Col>
        </Grid>
        <Divider my="sm" />
      </header>

      <Group grow>
        <Card radius="md" withBorder>
          <Group gap="xs" justify="space-between" pl="xs" pr="xs">
            <Group gap="xs" justify="space-between" p={5}>
              <ThemeIcon color="gray" radius="xl" size={10} />
              <ThemeIcon color="gray" radius="xl" size={10} />
              <ThemeIcon color="gray" radius="xl" size={10} />
            </Group>
          </Group>

          <Code
            bg="transparent"
            block
            c="gray"
            style={{
              border: '1px solid var(--mantine-color-gray-3)',
              borderRadius: 'var(--mantine-radius-md)',
              minHeight: 400,
              maxHeight: 600,
              overflow: 'auto',
              resize: 'vertical',
              cursor: 'ns-resize',
            }}
          >
            заглушка
          </Code>
        </Card>

        <Card pl={0} pr={0} radius="md" withBorder>
          <Stack gap={0} justify="center">
            <Text c="gray" pl={5} size="sm" variant="white">
              Консоль
            </Text>

            <Code block c="white" color="#1a1b1e" h={400}>
              заглушка
            </Code>
          </Stack>
        </Card>
      </Group>
    </Stack>
  );
}
