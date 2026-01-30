import { Grid, Group, Box, Button, Input } from '@mantine/core';
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
  return <Group gap="md">{ButtonItem}</Group>;
}

export function Editor() {
  return (
    <Box component="section">
      <header>
        <div>
          <Grid gutter="sm" justify="space-between">
            <Grid.Col span={7}>
              <Input placeholder="Новый сниппет" radius="md" />
            </Grid.Col>

            <Grid.Col span={5}>
              <ItemButtons />
            </Grid.Col>
          </Grid>
        </div>
      </header>
    </Box>
  );
}
