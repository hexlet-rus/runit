import { useState, useEffect } from 'react';
import { ReactComponent as IconLanguage } from './Language.svg'
import {
    Paper,
    Stack,
    ThemeIcon,
    Flex,
    Text,
    Button,
    FileButton,
    Avatar,
    Tooltip,
    Group,
    Title,
    Checkbox,
    SimpleGrid,
    Box
} from '@mantine/core';
import { ReactComponent as DonwloadIcon } from './donwload.svg'
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';



const dataUser = {
    name: 'Иван Петров',
    isLawStatus: true,
    dateLawStatus: '01.01.2025',
    email: 'ivan@example.com',
    isEmailVerified: false,
    isTelegramConnected: false,
    language: 'Русский'
}

const profilePageProps = {
    lawDocuments: [
        "Условия использования ",
        "Соглашение об обработке ПД",
        "Политика обработки данных",
        "Использование Cookie-файлов"
    ]
}

const ProfileForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const isWrap = useMediaQuery('(max-width: 650px)');

    const handleFileChange = (selectedFiles: File[]) => {
        try {
            if (selectedFiles[0].size > 5 * 1024 * 1024) {
                notifications.show({
                    title: 'Ошибка',
                    message: 'Файл слишком большой. Максимальный размер: 5MB',
                    color: 'red',
                    position: 'top-center',
                    autoClose: 1500
                });
                return;
            }
            setFiles(selectedFiles);
            if (selectedFiles.length > 0) {
                const url = URL.createObjectURL(selectedFiles[0]);
                setAvatarUrl(url);
                notifications.show({
                    title: 'Успешно',
                    message: 'Аватар успешно загружен',
                    color: 'teal',
                    position: 'top-center',
                    autoClose: 1500
                });
            }
        } catch (error) {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при загрузке файла',
                color: 'red',
                position: 'top-center',
                autoClose: 1500
            });
        }
    };

    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);


    return (
        <Flex gap="md" wrap={isWrap ? 'wrap' : 'nowrap'}>
            <Flex direction={isWrap ? "row" : 'column'} style={isWrap && { flexGrow: 1 }} wrap={isWrap ? 'wrap' : 'nowrap'} gap="md">
                <Paper radius='lg' shadow='sm' p='md' style={isWrap && { flexGrow: 1 }} >
                    <Flex direction='column' justify='space-between'  style={{ height: '100%' }}>
                         <Box>
                        {avatarUrl ? (
                            <FileButton
                                onChange={handleFileChange}
                                accept="image/png,image/jpeg,image/jpg"
                                multiple
                            >
                                {(props) => (
                                    <Tooltip label={dataUser.name} withArrow>
                                        <Avatar
                                            {...props}
                                            src={avatarUrl}
                                            alt="Аватар пользователя"
                                            size="xl"
                                            radius="xl"
                                            mb='xs'
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                )}
                            </FileButton>
                        ) : (
                            <FileButton
                                onChange={handleFileChange}
                                accept="image/png,image/jpeg,image/jpg"
                                multiple
                            >
                                {(props) => (
                                    <ThemeIcon
                                        component='button'
                                        {...props}
                                        size="xl"
                                        radius="md"
                                        color="var(--mantine-color-gray-4)"
                                        style={{ cursor: 'pointer' }}
                                        mb='xs'
                                    >
                                        <DonwloadIcon style={{ width: '40%', height: '40%' }} />
                                    </ThemeIcon>
                                )}
                            </FileButton>
                        )}
                        <Text fw={600} mb='xs' >{dataUser.name}</Text>
                    </Box>

                    <Button variant="default" radius="lg" style={{ width: 'fit-content' }} >
                        Редактировать
                    </Button>
                    </Flex>
                   
                </Paper>
                <Paper radius='lg' shadow='sm' p='md' style={isWrap && { flexGrow: 1 }}>
                    <Text mb="md">Правовой статус</Text>
                    <Group wrap="nowrap">
                        <Text style={{ whiteSpace: 'nowrap' }}>Принято при регистрации:</Text>
                        <Text span c={dataUser.isLawStatus ? "green" : "red"} fw={500}>
                            {dataUser.isLawStatus ? "да" : "нет"}
                        </Text>
                    </Group>
                    <Text mb="md">Дата: {dataUser.dateLawStatus} </Text>
                    <Stack gap={0} c="dimmed">
                        {profilePageProps.lawDocuments.map((doc, index) => (
                            <Text key={index} size="sm">{doc}</Text>
                        ))}
                    </Stack>
                </Paper>
            </Flex>
            <Stack>
                <Paper radius='lg' shadow='sm' p='md'>
                    <Title order={4} mb="md">
                        Контакты
                    </Title>
                    <Flex gap='md' rowGap={4} wrap="wrap">
                        <Group wrap="nowrap">
                            <Text c="dimmed" >Email:{dataUser.email}:</Text>
                            <Text span c={dataUser.isEmailVerified ? "green" : "orange"} style={{ whiteSpace: 'nowrap' }} fw={500}>
                                {dataUser.isEmailVerified ? "подтвержден" : "не подтвержден"}
                            </Text>
                        </Group>
                        <Group wrap="nowrap">
                            <Text c="dimmed">Telegram:</Text>
                            <Text span c={dataUser.isTelegramConnected ? "green" : "orange"} fw={500} style={{ whiteSpace: 'nowrap' }}>
                                {dataUser.isEmailVerified ? "подключен" : "не подключен"}
                            </Text>
                        </Group>
                    </Flex>
                </Paper>
                <Paper radius='lg' shadow='sm' p='md'>
                    <Title order={4} mb="md">
                        Подключения
                    </Title>
                    <Flex gap='md' wrap="wrap" >
                        <Paper radius='lg' withBorder shadow='sm' p='sm' style={{ flexGrow: 1 }}>
                            <Flex align='center' gap='sm' justify="space-between">
                                <Stack gap={4} >
                                    <Text >Email:</Text>
                                    <Text c="dimmed" fw={500} style={{ whiteSpace: 'nowrap' }}>
                                        Статус: {dataUser.isEmailVerified ? "подключен" : "не подключен"}
                                    </Text>
                                </Stack>
                                {!dataUser.isEmailVerified && <Button variant="filled" radius="lg">Подтвердить</Button>}
                            </Flex>
                        </Paper>
                        <Paper radius='lg' withBorder shadow='sm' p='sm' style={{ flexGrow: 1 }}>
                            <Flex align='center' gap='sm' justify="space-between">
                                <Stack gap={4} >
                                    <Text >Telegram:</Text>
                                    <Text c="dimmed" fw={500} style={{ whiteSpace: 'nowrap' }}>
                                        Статус: {dataUser.isTelegramConnected ? "подключен" : "не подключен"}
                                    </Text>
                                </Stack>
                                <Button variant="filled" radius="lg">
                                    {dataUser.isTelegramConnected ? "Отключить" : "Подключить"}
                                </Button>
                            </Flex>
                        </Paper>
                    </Flex>
                </Paper>
                <Paper radius='lg' shadow='sm' p='md'>
                    <Title order={4} mb='sm'>
                        Уведомления
                    </Title>
                    <Text c='dimmed' mb='sm' >Получать новости сервера</Text>
                    <Paper radius='lg' withBorder shadow='sm' p='sm' mb='sm'>
                        <Checkbox
                            label='Новости сервиса'
                            styles={{
                                root: {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                                body: {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row-reverse',
                                },
                                label: {
                                    flex: 1,
                                    marginRight: 'auto',
                                }
                            }}
                        />
                    </Paper>
                    <SimpleGrid cols={2} spacing="sm">
                        <Paper radius='xl' withBorder shadow='sm' px='sm' py={4}>
                            <Checkbox label='Email' />
                        </Paper>
                        <Paper radius='xl' withBorder shadow='sm' px='sm' py={4}>
                            <Checkbox label='Telegram' />
                        </Paper>
                    </SimpleGrid>
                </Paper>
                <Paper radius='lg' shadow='sm' p='md'>
                    <Title order={4} mb='sm'>
                        Язык
                    </Title>
                    <Button leftSection={<IconLanguage style={{ width: 20, height: 20 }} />} variant="default" radius='md' mb='sm'>
                        Russian
                    </Button>
                    <Text c='dimmed' size='sm'>Текущий язык:{dataUser.language}</Text>
                </Paper>
            </Stack>
        </Flex>)
}

export default ProfileForm