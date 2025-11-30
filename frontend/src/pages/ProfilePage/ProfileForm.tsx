import { useState, useEffect } from 'react';
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
    Group
} from '@mantine/core';
import { ReactComponent as DonwloadIcon } from './donwload.svg'
import { notifications } from '@mantine/notifications';

const dataUser = {
    name: 'Иван Петров',
    isLawStatus: true,
    dateLawStatus: '01.01.2025'
}

const profilePageProps = {
    lawDocuments: [
        "Условия использования",
        "Соглашение об обработке ПД",
        "Политика обработки данных",
        "Использование Cookie-файлов"
    ]
}

const ProfileForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileChange = (selectedFiles: File[]) => {
        try {
            if (selectedFiles[0].size > 5 * 1024 * 1024) {
                notifications.show({
                    title: 'Ошибка',
                    message: 'Файл слишком большой. Максимальный размер: 5MB',
                    color: 'red',
                    // icon: <IconX size={18} />,
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
                    // icon: <IconCheck size={18} />,
                });
            }
        } catch (error) {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при загрузке файла',
                color: 'red',
                // icon: <IconX size={18} />,
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
        <Flex>
            <Stack >
                <Paper radius='lg' shadow='sm' p='md'>
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
                    <Button variant="default" radius="lg" onClick={() => console.log(files)}>
                        Редактировать
                    </Button>
                </Paper>
                <Paper radius='lg' shadow='sm' p='md' >
                    <Text mb="md">Правовой статус</Text>
                    <Group >
                        <Text>Принято при регистрации:</Text>
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
            </Stack>
        </Flex>)
}

export default ProfileForm