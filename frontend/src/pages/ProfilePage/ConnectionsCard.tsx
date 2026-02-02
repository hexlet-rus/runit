import { Paper, Flex, Stack, Text, Button, Title, LoadingOverlay } from '@mantine/core';
import { ConnectionsCardProps, ConnectionItemProps } from './types/components';


const ConnectionsCard = ({
    isEmailVerified,
    isTelegramConnected,
    onConfirmEmail,
    onToggleTelegram,
    textData,
    loading = false,
    pendingActions = { emailVerification: false, telegramConnection: false },
}: ConnectionsCardProps) => (
    <Paper radius='lg' shadow='sm' p='md'>
        <Title order={4} mb="md">
            {textData.title}
        </Title>
        <Flex gap='md' wrap="wrap">
            <ConnectionItem
                label="Email"
                status={isEmailVerified ? textData.connected : textData.disconnect}
                showButton={!isEmailVerified}
                buttonText={textData.confirm}
                onButtonClick={onConfirmEmail}
                textData={textData.status}
                loading={pendingActions.emailVerification}
                disabled={loading}
            />
            <ConnectionItem
                label="Telegram"
                status={isTelegramConnected ? textData.connected : textData.disconnect}
                showButton={true}
                buttonText={isTelegramConnected ? textData.disable : textData.connect}
                onButtonClick={onToggleTelegram}
                textData={textData.status}
                loading={pendingActions.telegramConnection}
                disabled={loading}
            />
        </Flex>
    </Paper>
);


const ConnectionItem = ({
    label,
    status,
    showButton,
    buttonText,
    onButtonClick,
    textData,
    loading = false,
    disabled = false,
}: ConnectionItemProps) => (
    <Paper radius='lg' withBorder shadow='sm' p='sm' style={{ flexGrow: 1, position: 'relative' }}>
        {loading && (
            <LoadingOverlay
                visible={true}
                loaderProps={{ color: 'blue', type: 'dots', size: 'sm' }}
                zIndex={1000}
            />
        )}
        <Flex align='center' gap='sm' justify="space-between">
            <Stack gap={4}>
                <Text>{label}</Text>
                <Text c="dimmed" fw={500} style={{ whiteSpace: 'nowrap' }}>
                    {textData}: {status}
                </Text>
            </Stack>
            {showButton && (
                <Button
                    variant="filled"
                    radius="lg"
                    onClick={onButtonClick}
                    disabled={disabled}
                    loading={loading}
                >
                    {buttonText}
                </Button>
            )}
        </Flex>
    </Paper>
);

export default ConnectionsCard;