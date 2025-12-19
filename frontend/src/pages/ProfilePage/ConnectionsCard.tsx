import { Paper, Flex, Stack, Text, Button, Title } from '@mantine/core';
import { ConnectionsCardTexts } from './type/profile-texts';

interface ConnectionsCardProps {
    isEmailVerified: boolean;
    isTelegramConnected: boolean;
    onConfirmEmail: () => void;
    onToggleTelegram: () => void;
    textData: ConnectionsCardTexts
}

const ConnectionsCard = ({
    isEmailVerified,
    isTelegramConnected,
    onConfirmEmail,
    onToggleTelegram,
    textData
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
            />
            <ConnectionItem
                label="Telegram"
                status={isTelegramConnected ? textData.connected : textData.disconnect}
                showButton={true}
                buttonText={isTelegramConnected ? textData.disable : textData.connect}
                onButtonClick={onToggleTelegram}
                textData={textData.status}
            />
        </Flex>
    </Paper>
);

interface ConnectionItemProps {
    label: string;
    status: string;
    showButton: boolean;
    buttonText: string;
    onButtonClick: () => void;
    textData: string;
}

const ConnectionItem = ({
    label,
    status,
    showButton,
    buttonText,
    onButtonClick,
    textData
}: ConnectionItemProps) => (
    <Paper radius='lg' withBorder shadow='sm' p='sm' style={{ flexGrow: 1 }}>
        <Flex align='center' gap='sm' justify="space-between">
            <Stack gap={4}>
                <Text>{label}</Text>
                <Text c="dimmed" fw={500} style={{ whiteSpace: 'nowrap' }}>
                    {textData}: {status}
                </Text>
            </Stack>
            {showButton && (
                <Button variant="filled" radius="lg" onClick={onButtonClick}>
                    {buttonText}
                </Button>
            )}
        </Flex>
    </Paper>
);

export default ConnectionsCard;