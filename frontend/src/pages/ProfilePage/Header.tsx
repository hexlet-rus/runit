import {
    Paper,
    Title,
    Button,
    ActionIcon,
    Text,
    Group
} from '@mantine/core';
import { ReactComponent as IconLanguage } from './assets/Language.svg';

const Header = () => {
    return (
        <Paper pe='md' >
            <Group justify="space-between" h={60} wrap='nowrap'>
                <Group h={60} wrap='nowrap'>
                    <Text>Icon</Text>
                    <Title>runit</Title>
                </Group>
                <Group h={60} wrap='nowrap'>
                    <ActionIcon
                        variant="default"
                        radius='md'
                        
                    >
                        <IconLanguage  style={{ width: 20, height: 20 }} />
                    </ActionIcon>
                    <Button
                        variant="default"
                        radius='md'
                    >
                        Выйти
                    </Button>
                </Group>
            </Group>
        </Paper>
    )
}

export default Header