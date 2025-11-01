import {
  Box,
  Title,
  Text,
  Badge,
  Button,
  Space,
  Card,
  Group,
} from '@mantine/core';
import '@mantine/core/styles.css';

import type { CommunityType } from 'src/types/components';

interface CommunitySectionProps {
  communities: Array<CommunityType>;
}

function CommunitySection({ communities }: CommunitySectionProps) {
  return (
    <Box bg="#FFFAFA" component="section" ml="10px" mr="10px" p="40px">
      <Title order={1} ta="center">
        Join the Community
      </Title>
      <Text c="#393939ff" size="md" ta="center">
        RunIT - растущее сообщество разработчиков. Присоединяйтесь к нашим
        каналам и оставайтесь в курсе новостей.
      </Text>
      <Space h="lg" />
      <Group grow justify="center" style={{ gap: 0 }}>
        {communities.map(({ badge, btn, link, text, title }) => (
          <Card key={title} padding="lg" radius="md" withBorder>
            <Group justify="center">
              <Badge
                bg="#eef7ff"
                color="blue"
                p="sm"
                radius="md"
                size="lg"
                style={{ textTransform: 'none', border: '1px #b7c9e1' }}
                variant="outline"
              >
                {badge}
              </Badge>
            </Group>
            <Space h="lg" />
            <Group justify="center">
              <Title order={1}>{title}</Title>
            </Group>
            <Space h="lg" />
            <Text c="#393939ff" size="sm" ta="center">
              {text}
            </Text>
            <Space h="lg" />
            <Group justify="center">
              <Button
                component="a"
                href={link}
                radius="md"
                size="md"
                style={{ fontWeight: '500' }}
                target="_blank"
                variant="default"
              >
                {btn}
              </Button>
            </Group>
          </Card>
        ))}
      </Group>
    </Box>
  );
}

export default CommunitySection;

// Data for props of CommunitySectionComponent
// const mockData = [
//  {
//    badge: '+1k каждый месяц',
//    btn: 'Перейти в канал',
//    link: 'https://t.me/HexletCareerBot',
//    text: 'Обсуждение вакансий и резюме',
//    title: 'Тг Карьера',
//  },
//  {
//    badge: 'Активные обсуждения',
//    btn: 'Присоединиться',
//    link: 'https://t.me/hexletcommunity',
//    text: 'Вопросы по коду и обмен опытом',
//    title: 'Тг Сообщество',
//  },
//  {
//    badge: 'Закрытый клуб',
//    btn: 'Узнать подробнее',
//    link: 'https://t.me/HexletClubBot',
//    text: 'Нетворкинг и коллаборации',
//    title: 'Клуб Хекслета',
//  },
// ];
