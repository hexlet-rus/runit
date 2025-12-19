import { Paper, Title, Text, SimpleGrid, Checkbox } from '@mantine/core';
import { NotificationsCardTexts } from './type/profile-texts';

interface NotificationsCardProps {
    onNewsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTelegramNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    notifications: {
        news: boolean;
        email: boolean;
        telegram: boolean;
    }
    textData:NotificationsCardTexts
}

const NotificationsCard = ({
    onNewsChange,
    onEmailNotificationsChange,
    onTelegramNotificationsChange,
    notifications,
    textData
}: NotificationsCardProps) => (
    <Paper radius='lg' shadow='sm' p='md'>
        <Title order={4} mb='sm'>
            {textData.title}
        </Title>
        <Text c='dimmed' mb='sm'>{textData.receiveNews}</Text>
        <NewsServiceCheckbox onChange={onNewsChange} checked={notifications.news} />
        <SimpleGrid cols={2} spacing="sm" mt="sm">
            <NotificationChannel
                label="Email"
                onChange={onEmailNotificationsChange}
                checked={notifications.email}
            />
            <NotificationChannel
                label="Telegram"
                onChange={onTelegramNotificationsChange}
                checked={notifications.telegram}
            />
        </SimpleGrid>
    </Paper>
);

interface NewsServiceCheckboxProps {
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewsServiceCheckbox = ({ onChange, checked }: NewsServiceCheckboxProps) => (
    <Paper radius='lg' withBorder shadow='sm' p='sm' mb='sm'>
        <Checkbox
            label='Новости сервиса'
            checked={checked}
            onChange={onChange}
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
);

interface NotificationChannelProps {
    label: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationChannel = ({ label, onChange, checked }: NotificationChannelProps) => (
    <Paper radius='xl' withBorder shadow='sm' px='sm' py={4}>
        <Checkbox
            label={label}
            checked={checked}
            onChange={onChange}
        />
    </Paper>
);

export default NotificationsCard;