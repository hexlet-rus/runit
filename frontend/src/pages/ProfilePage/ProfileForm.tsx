import { useState, useEffect } from 'react';
import { ReactComponent as IconLanguage } from './assets/Language.svg'
import {
    Paper,
    Stack,
    Flex,
    Text,
    Button,
    Group,
    Title,
    Checkbox,
    SimpleGrid,
} from '@mantine/core';
import AvatarUpload from './AvatarUploadProps';
import LegalStatus from './LegalStatus';
import UserInfoCard from './UserInfoCard';
import ContactsCard from './ContactsCard';
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
    legalStatus: {
        lawDocuments: [
            "Условия использования",
            "Соглашение об обработке ПД",
            "Политика обработки данных",
            "Использование Cookie-файлов"
        ],
        lawStatus: "Правовой статус",
        data: "Дата",
        acceptedRegistration: "Принято при регистрации",
        yes: 'да',
        no: 'нет'
    },
    notifications: {
        title: {
            success: 'Успешно',
            error: 'Ошибка'
        },
        message: {
            tooBigFile: 'Файл слишком большой. Максимальный размер: 5MB',
            networkError: 'Произошла ошибка при загрузке файла',
            isSucessAvatar: 'Аватар успешно загружен',
        }
    },
    avatarUploadText: {
        avatarUser: 'Аватар пользователя'
    },
    userInfoCard: {
        edit: "Редактировать"
    },
    contactsCard: {
        contacts:'Контакты',
        connect:'подключен',
        disconnect:'не подключен',
        confirmed: 'подтвержден',
        notConfirmed: 'не подтвержден'
    }
}

const ProfileForm = () => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const isWrap = useMediaQuery('(max-width: 650px)');

    const handleFileChange = (selectedFile: File | null) => {
        try {
            if (selectedFile.size > 5 * 1024 * 1024) {
                notifications.show({
                    title: 'Ошибка',
                    message: 'Файл слишком большой. Максимальный размер: 5MB',
                    color: 'red',
                    position: 'top-center',
                    autoClose: 1500
                });
                return;
            }
            setAvatarFile(selectedFile);
            if (selectedFile) {
                const url = URL.createObjectURL(selectedFile);
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
                <UserInfoCard
                    userName={dataUser.name}
                    isWrap={isWrap}
                    textData={profilePageProps.userInfoCard}
                >
                    <AvatarUpload
                        avatarUrl={avatarUrl}
                        onFileChange={handleFileChange}
                        userName={dataUser.name}
                        textData={profilePageProps.avatarUploadText}
                    />
                </UserInfoCard>
                <Paper radius='lg' shadow='sm' p='md' style={isWrap && { flexGrow: 1 }}>
                    <LegalStatus
                        isLawStatus={dataUser.isLawStatus}
                        dateLawStatus={dataUser.dateLawStatus}
                        textData={profilePageProps.legalStatus}
                    />
                </Paper>
            </Flex>
            <Stack>
                <ContactsCard
                    email={dataUser.email}
                    isEmailVerified={dataUser.isEmailVerified}
                    isTelegramConnected={dataUser.isTelegramConnected}
                    textData={profilePageProps.contactsCard}
                />
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