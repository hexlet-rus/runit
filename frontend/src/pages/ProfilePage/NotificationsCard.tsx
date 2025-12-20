import { Paper, Title, Text, SimpleGrid, Checkbox, LoadingOverlay } from '@mantine/core';
import { NotificationsCardTexts } from './type/profile-texts';
import { NotificationField } from './ProfileForm';
interface NotificationsCardProps {
    onNewsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTelegramNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    notifications: {
        news: boolean;
        email: boolean;
        telegram: boolean;
    }
    textData: NotificationsCardTexts;
    loading: boolean;
    pendingNotification: NotificationField[]
}

const NotificationsCard = ({
    onNewsChange,
    onEmailNotificationsChange,
    onTelegramNotificationsChange,
    notifications,
    textData,
    pendingNotification,
    loading = false,
}: NotificationsCardProps) => (
    <Paper radius='lg' shadow='sm' p='md'>
        <Title order={4} mb='sm'>
            {textData.title}
        </Title>
        <Text c='dimmed' mb='sm'>{textData.receiveNews}</Text>
        <NewsServiceCheckbox
            onChange={onNewsChange}
            checked={notifications.news}
            disabled={pendingNotification.includes('news')}
            isLoading={loading}
        />
        <SimpleGrid cols={2} spacing="sm" mt="sm">
            <NotificationChannel
                label="Email"
                onChange={onEmailNotificationsChange}
                checked={notifications.email}
                disabled={pendingNotification.includes('email')}
                isLoading={loading}
            />
            <NotificationChannel
                label="Telegram"
                onChange={onTelegramNotificationsChange}
                checked={notifications.telegram}
                disabled={pendingNotification.includes('telegram')}
                isLoading={loading}
            />
        </SimpleGrid>
    </Paper>
);

interface NewsServiceCheckboxProps {
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    isLoading:boolean;
}

const NewsServiceCheckbox = ({ onChange, checked, disabled, isLoading }: NewsServiceCheckboxProps) => (
    <Paper radius='lg' withBorder shadow='sm' p='sm' mb='sm' style={{ position: 'relative' }}>
        {isLoading && disabled && <LoadingOverlay
            visible={true}
            loaderProps={{ color: 'blue', type: 'dots', size: 'sm' }}
        />}
        <Checkbox
            label='Новости сервиса'
            checked={checked}
            onChange={onChange}
            disabled={disabled}
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
    disabled: boolean;
    isLoading: boolean;
}

const NotificationChannel = ({ label, onChange, checked, disabled, isLoading }: NotificationChannelProps) => (
    <Paper radius='xl' withBorder shadow='sm' px='sm' py={4} style={{ position: 'relative' }}>
        {isLoading && disabled && <LoadingOverlay
            visible={true}
            loaderProps={{ color: 'blue', type: 'dots', size: 'xs' }}
        />}
        <Checkbox
            label={label}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    </Paper>
);

export default NotificationsCard;