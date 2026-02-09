import { Anchor, Flex, Group, Text } from '@mantine/core';

type PropsFooter = {
  id: number | string;
  link: string;
  label: string
}
 export const links: PropsFooter[] = [
  {id: 1, link: '#', label: 'О проекте' },
  {id: 2, link: '#', label: 'Возможности' },
  {id: 3, link: '#', label: 'Технологии' },
  {id: 3, link: '#', label: 'Сообщество' },
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