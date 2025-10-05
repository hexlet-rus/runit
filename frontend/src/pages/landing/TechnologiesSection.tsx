import { Title, Box, Flex, Paper, Text, Badge } from '@mantine/core'

function TechnologiesSection({ }) {

   return (<Box component="section" p="md" >
      <Title order={2} mb="xl">Технологии</Title>
      <Text size="md">Поддерживаем популярные языки, базы данных инструментов.</Text>
      <Flex
         my="lg"
         gap="md"
         justify="space-between"
         align="center"
         direction="row"
         wrap="wrap"
      >
         <Paper bg="transparent" withBorder shadow="xs" radius="md" p="xl" h="100%" miw="250" mih={300} flex={1}>
            <Badge
               styles={{
                 label: { textTransform: 'none' },
               }}
            >
               Gradient badge
            </Badge>

         </Paper >
         <Paper bg="transparent" withBorder shadow="xs" radius="md" p="xl" h="100%" miw="250" mih={300} flex={1}>Button 2</Paper >
         <Paper bg="transparent" withBorder shadow="xs" radius="md" p="xl" h="100%" miw="250" mih={300} flex={1}>Button 3</Paper >
      </Flex>
   </Box>)

}

export default TechnologiesSection