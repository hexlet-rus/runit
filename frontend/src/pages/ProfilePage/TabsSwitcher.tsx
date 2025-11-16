import { Tabs, Paper } from '@mantine/core';



function TabsSwitcher() {
    return (
        <Tabs

            variant='pills'
            defaultValue='snippets'
            orientation='vertical'
            keepMounted={false}
            radius='md'
            color='var(--mantine-color-blue-1)'
          
          
        >
            <Paper radius='lg' shadow='sm' p='md' m='md'>
                <Tabs.List >
                    <Tabs.Tab 
                   
                    styles={{
                    tab: {
                        // Стили для неактивного состояния
                        color: 'var(--mantine-color-gray-6)',
                        
                        // Стили для активного состояния
                        '&[data-active=true]': {
                            color: 'green',
                            backgroundColor: 'var(--mantine-color-blue-1)',
                            borderColor: 'green'
                        },
                        
                        // Ховер для активного состояния
                        '&[data-active]:hover': {
                            backgroundColor: 'var(--mantine-color-blue-9)',
                            color:'green'
                        }
                    }
                }}
                     value="snippets"
              
                     >Сниппеты</Tabs.Tab>
                    <Tabs.Tab value="profile">
                        Профиль
                    </Tabs.Tab>
                </Tabs.List>
            </Paper>
            <Tabs.Panel value='snippets'>Сниппgеты</Tabs.Panel>
            <Tabs.Panel value="profile">Профgиль</Tabs.Panel>
        </Tabs>
    )
}

export default TabsSwitcher;


