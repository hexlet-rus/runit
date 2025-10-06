import { Title, Box, Flex, Paper, Text, Badge, Group } from '@mantine/core'

function TechnologiesSection({ }) {

   const listTehnology = [
      {
         typeTehnology: 'Языки',
         listNamesTehnology: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'C', 'C++', 'PHP', 'Ruby'],
      },
      {
         typeTehnology: 'Базы данных',
         listNamesTehnology: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'ClickHouse'],
      },
      {
         typeTehnology: 'Инструменты',
         listNamesTehnology: ['Git', 'grep', 'curl', 'Mermaid', 'Latex'],
      }
   ]

   const typeTehnology = '';
   const listNamesTehnology = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'C', 'C++', 'PHP', 'Ruby']
   return (<Box component="section" p="md" >
      <Title order={2} mb="xl">Технологии</Title>
      <Text size="md">Поддерживаем популярные языки, базы данных инструментов.</Text>
      <Flex
         my="lg"
         gap="md"
         justify="space-between"
         align='stretch'
         direction="row"
         wrap="wrap"
      >

         {
            listTehnology.map(({ typeTehnology, listNamesTehnology }, index) => {
               return (<Paper key={index} bg="transparent" withBorder shadow="xs" radius="md" p="xl" miw="250" mih={300} flex={1}>
                  <Title order={3} mb="xl">{typeTehnology}</Title>
                  <Group gap="sm">
                     {listNamesTehnology.map((nameTehnology, index) => {
                        return (<Badge
                           key={index}
                           p='sm'
                           size='md'
                           color='#0d6efd'
                           variant="outline"
                           bg='#0D6EFD19'
                           styles={{
                              label: { textTransform: 'none' },
                           }}
                        >
                           {nameTehnology}
                        </Badge>)
                     })}
                  </Group>
               </Paper >)
            })
         }

      </Flex>
   </Box>)

}

export default TechnologiesSection