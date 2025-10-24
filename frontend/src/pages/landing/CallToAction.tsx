import { Flex, Title, Text, Button, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as modalActions } from '../../slices/modalSlice';

const mockdata = {
  data: {
    textContent: {
      title: 'Готовы попробовать?',
      subtitle: 'Начните бесплатно. Без установки и регистрации.',
    },
  },
};

function CallToAction() {
  const { t: tLCTA } = useTranslation('translation', {
    keyPrefix: 'landing.callToAction',
  });
  const { data } = mockdata; // убрать после появления роута !!!!
  const dispatch = useDispatch();

  const handleOpenIDE = () => {
    dispatch(modalActions.openModal({ type: 'newSnippet' }));
  };

  const handleOpenDocs = () => {
    dispatch(modalActions.openModal({ type: 'inDevelopment' }));
  };

  return (
    <Flex
      bdrs="lg"
      bd="1px solid #d0e9ffff"
      p="40px"
      justify="space-between"
      wrap="wrap"
    >
      <Flex direction="column">
        <Title fw={600} c="dark" order={1} lh="1.6rem" mb="sm">
          {data.textContent.title}
        </Title>
        <Text c="#393939ff" ta="left">
          {data.textContent.subtitle}
        </Text>
      </Flex>
      <Stack justify="flex-end" mt="20px">
        <Flex gap="sm" direction={{ base: "column", xs: "row" }}>
          <Button variant="filled" radius="lg" onClick={() => handleOpenIDE()}>
            {tLCTA('ideButton')}
          </Button>
          <Button variant="filled" radius="lg" onClick={() => handleOpenDocs()}>
            {tLCTA('docButton')}
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default CallToAction;
