import {
    Group,
    Text,
    Stack
} from "@mantine/core";
import { LegalStatusTexts} from './type/profile-texts';

interface LegalStatusProps {
    isLawStatus: boolean;
    dateLawStatus: string;
    textData: LegalStatusTexts
}

const LegalStatus: React.FC<LegalStatusProps> = ({ isLawStatus, dateLawStatus, textData }) => {
    return (
        <>
            <Text mb="md">{textData.lawStatus}</Text>
            <Group wrap="nowrap">
                <Text style={{ whiteSpace: 'nowrap' }}>{textData.acceptedRegistration}:</Text>
                <Text span c={isLawStatus ? "green" : "red"} fw={500}>
                    {isLawStatus ? textData.yes : textData.no}
                </Text>
            </Group>
            <Text mb="md">{textData.data}: {dateLawStatus} </Text>
            <Stack gap={0} c="dimmed">
                {textData.lawDocuments.map((doc, index) => (
                    <Text key={index} size="sm">{doc}</Text>
                ))}
            </Stack>
        </>
    );
};

export default LegalStatus;