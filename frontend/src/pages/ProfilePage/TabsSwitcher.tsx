import { Tabs, Paper, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';


export type TabItem = {
    id: number,
    valueName: string;
    title: string;
    children: React.ReactNode;
}

interface TabsSwitcherProp {
    tabs: TabItem[]
}

const TabsSwitcher: React.FC<TabsSwitcherProp> = ({ tabs }) => {
    const theme = useMantineTheme();
    const isHorizontal = useMediaQuery('(max-width: 830px)');
    return (
        <Tabs
            variant='pills'
            defaultValue='snippets'
            orientation={isHorizontal ? 'horizontal' : 'vertical'}
            keepMounted={false}
            radius='md'
            color='var(--mantine-color-blue-1)'
            styles={{
                root: {
                    '--tabs-text-color': 'var(--mantine-color-indigo-8)',
                }
            }}
        >
            <Paper radius='lg' shadow='sm' p='md' m='md' h="fit-content">
                <Tabs.List >
                    {tabs.map((tab) => {
                        return (
                            <Tabs.Tab
                                key={tab.id}
                                value={tab.valueName}
                            >
                                {tab.title}
                            </Tabs.Tab>)
                    })}
                </Tabs.List>
            </Paper>
            {tabs.map((tab) => {
                return <Tabs.Panel m='md' key={tab.id} value={tab.valueName}>{tab.children}</Tabs.Panel>
            })}
        </Tabs>
    )
}

export default TabsSwitcher;


