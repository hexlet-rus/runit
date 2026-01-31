import { Grid, Group, Box, Button, Input, Divider } from '@mantine/core';
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
    <Box component="section">
      <header>
        <Grid align="center" columns={24} grow gutter="sm" justify="center">
          <Grid.Col offset={1}>
            <Input placeholder="Новый сниппет" radius="md" />
          </Grid.Col>

          <Grid.Col span={9}>
            <ItemButtons />
          </Grid.Col>
        </Grid>
      </header>
      <Divider my="sm" />
    </Box>
  );
}
