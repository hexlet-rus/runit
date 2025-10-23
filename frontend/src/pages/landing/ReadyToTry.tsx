import { Flex, Title, Text, Button, Stack } from '@mantine/core';
import { useDispatch } from "react-redux";
import { actions as modalActions } from '../../slices/modalSlice';

const mockdata = {
  data: {
    mainTextContent: {
      title: 'Готовы попробовать?',
      subtitle: 'Начните бесплатно. Без установки и регистрации.',
    },
    buttonsTextContent: {
      ideButton: 'Открыть IDE',
      docsButton: 'Документация',
    }
  }
}

function ReadyToTry() {
  const { data } = mockdata;
  const dispatch = useDispatch();

  const handleOpenIDE = () => {
    dispatch(modalActions.openModal({ type: 'newSnippet' }));
  };

  const handleOpenDocs = () => {
    dispatch(modalActions.openModal({ type: 'inDevelopment' }));
  };
 
  return (
    <Flex bdrs="lg" bd="1px solid #d0e9ffff" p="40px" justify="space-between" wrap="wrap">
      <Flex direction="column">
        <Title fw={600} c="dark" order={1} lh="1.6rem" mb="sm">{data.mainTextContent.title}</Title>
        <Text c="#393939ff" ta="left">{data.mainTextContent.subtitle}</Text>
      </Flex>
      <Stack justify="flex-end" mt="20px">
        <Flex gap="sm">
          <Button variant="filled" radius="lg" onClick={() => handleOpenIDE()}>
            {data.buttonsTextContent.ideButton}
          </Button>
          <Button variant="filled" radius="lg" onClick={() => handleOpenDocs()}>
            {data.buttonsTextContent.docsButton}
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default ReadyToTry;
