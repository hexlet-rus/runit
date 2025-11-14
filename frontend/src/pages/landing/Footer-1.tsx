import { Anchor, Flex, Group, Text } from '@mantine/core';

const links = [
  { link: '#', label: 'О проекте' },
  { link: '#', label: 'Возможности' },
  { link: '#', label: 'Технологии' },
  { link: '#', label: 'Сообщество' },
];

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Flex direction="row" justify="space-between" wrap="wrap" py="xl">
        <Text size="sm" c="dimmed">© {currentYear} RunIT</Text>
        <Group >{items}</Group>
    </Flex>
  );
}

export default Footer;