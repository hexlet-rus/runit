import {
    Paper,
    Title,
    Button,
    ActionIcon,
    Box,
    Group,
    Anchor
} from '@mantine/core';
import { Link } from 'react-router-dom';
import IconLanguage from './assets/Language.svg?react';

const Header = () => {
    return (
        <Group justify='center'>
            <Group justify="space-between" h={60} wrap='nowrap' align="center" px='md' maw="1100px" style={{
                flexGrow: 1  
            }}>
                <Anchor
                    component={Link}
                    to='/'
                    underline='never'
                    style={{ color: 'black' }}
                >
                    <Group h={60} wrap='nowrap' align="center">
                        <Box
                            w={30}
                            h={30}
                            style={{
                                background: 'linear-gradient(135deg, #3776FB, #4C47F4)',
                                borderRadius: '10px'
                            }}
                        />
                        <Title order={1} size='h2' pb={6}>runit</Title>
                    </Group>
                </Anchor>
                <Group h={60} wrap='nowrap'>
                    <ActionIcon
                        variant="default"
                        radius='md'
                        size={34}
                    >
                        <IconLanguage style={{ width: 20, height: 20 }} />
                    </ActionIcon>
                    <Button
                        variant="default"
                        radius='lg'
                    >
                        Выйти
                    </Button>
                </Group>
            </Group>
        </Group>
    )
}

export default Header