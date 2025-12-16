import {
    Paper,
    Title,
    Flex,
    Group,
    Text
} from '@mantine/core';

interface ContactsCardProps {
    email: string;
    isEmailVerified: boolean;
    isTelegramConnected: boolean;
    textData: {
        contacts: string;
        connect: string;
        disconnect: string;
        confirmed: string;
        notConfirmed: string;
    }
}

const ContactsCard = ({
    email,
    isEmailVerified,
    isTelegramConnected,
    textData
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
                    {isEmailVerified ? textData.confirmed : textData.notConfirmed}
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
                    {isTelegramConnected ? textData.connect : textData.disconnect}
                </Text>
            </Group>
        </Flex>
    </Paper>
);

export default ContactsCard