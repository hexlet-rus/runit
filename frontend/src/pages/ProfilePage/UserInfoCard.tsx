import { Paper, Flex, Text, Button, Box } from '@mantine/core';
import { UserInfoCardProps } from './types/components';



const UserInfoCard = ({
  userName,
  isWrap,
  children,
  textData
}: UserInfoCardProps) => (
  <Paper radius='lg' shadow='sm' p='md' style={isWrap ? { flexGrow: 1 } : undefined}>
    <Flex direction='column' justify='space-between' style={{ height: '100%' }}>
      <Box>
        {children}
        <Text fw={600} mb='xs'>{userName}</Text>
      </Box>
      <Button variant="default" radius="lg" style={{ width: 'fit-content' }}>
        {textData.edit}
      </Button>
    </Flex>
  </Paper>
);

export default UserInfoCard;