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
  Accordion,
  Paper,
  CopyButton,
} from '@mantine/core';
import '@mantine/core/styles.css';
import PlayIcon from '../../assets/images/icons/snippetIcons/Play.svg?react';
import SaveIcon from '../../assets/images/icons/snippetIcons/DocumentPlus.svg?react';
import LinkIcon from '../../assets/images/icons/snippetIcons/Link.svg?react';

interface MockData {
  script: string;
  iframe: string;
}

const mockData: MockData = {
  script: `<script src="https://sandbox.example.com/widget.js"></script>`,
  iframe: `<iframe src="https://ваш-сайт.ru/sandbox/123" width="100%" height="400"></iframe>`,
};

function ItemButtons() {
  const items = [
    { id: 1, icon: null, label: 'Мои сниппеты', variant: 'default' },
    { id: 2, icon: PlayIcon, label: 'Запустить', variant: 'filled' },
    { id: 3, icon: SaveIcon, label: 'Сохранить', variant: 'default' },
  ];

  const ButtonItem = items.map((item) => {
    return (
      <Button
        key={item.id}
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
      <Accordion radius="md" variant="contained">
        <Accordion.Item value="code">
          <Accordion.Control
            color="dark"
            icon={<LinkIcon style={{ height: 20 }} />}
            variant="default"
          >
            <Group justify="space-between" style={{ flex: 1 }}>
              <Text>Код для вставки</Text>
              <Text c="gray" size="xs">
                показать
              </Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Group align="stretch" grow style={{ width: '100%' }}>
              {/* JS виджет */}
              <Paper mih="150px" p="md" radius="md" withBorder>
                <Text c="gray" fw={500} mb="xs" size="xs">
                  JS-виджет
                </Text>
                <Text
                  bg="gray.0"
                  component="pre"
                  p="xs"
                  size="xs"
                  style={{
                    borderRadius: 4,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowX: 'hidden',
                  }}
                >
                  {mockData.script}
                </Text>
                <CopyButton value={mockData.script}>
                  {({ copied, copy }) => (
                    <Button onClick={copy} size="xs" variant="subtle">
                      {copied ? 'Скопировано' : 'Копировать'}
                    </Button>
                  )}
                </CopyButton>
              </Paper>

              {/* Iframe — код вставки */}
              <Paper mih="150px" p="md" radius="md" withBorder>
                <Text c="gray" fw={500} mb="xs" size="xs">
                  Iframe
                </Text>
                <Code
                  block
                  style={{
                    padding: '12px',
                    fontSize: 13,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowX: 'hidden',
                  }}
                >
                  {mockData.iframe}
                </Code>
                <CopyButton value={mockData.iframe}>
                  {({ copied, copy }) => (
                    <Button onClick={copy} size="xs" variant="subtle">
                      {copied ? 'Скопировано' : 'Копировать'}
                    </Button>
                  )}
                </CopyButton>
              </Paper>
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
