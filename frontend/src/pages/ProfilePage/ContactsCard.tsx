import {
    Paper,
    Title,
    Flex,
    Group,
    Text
} from '@mantine/core';
import { ContactsCardProps } from './types/components';



const ContactsCard = ({
    email,
    isEmailVerified,
    isTelegramConnected,
    textData,
    pendingActions = { emailVerification: false, telegramConnection: false },
}: ContactsCardProps) => (
    <Paper radius='lg' shadow='sm' p='md'>
        <Title order={4} mb="md">{textData.contacts}</Title>
        <Flex gap='md' rowGap={4} wrap="wrap">
            <Group wrap="nowrap">
                <Text c="dimmed">Email: {email}</Text>
                <Text
                    span
                    c={isEmailVerified ? "green" : "orange"}
                    style={{ whiteSpace: 'nowrap' }}
                    fw={500}
                >
                    {!pendingActions.emailVerification && (isEmailVerified ? textData.confirmed : textData.notConfirmed)}
                </Text>
            </Group>
            <Group wrap="nowrap">
                <Text c="dimmed">Telegram:</Text>
                <Text
                    span
                    c={isTelegramConnected ? "green" : "orange"}
                    fw={500}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {!pendingActions.telegramConnection && (isTelegramConnected ? textData.connect : textData.disconnect)}
                </Text>
            </Group>
        </Flex>
    </Paper>
);

export default ContactsCard