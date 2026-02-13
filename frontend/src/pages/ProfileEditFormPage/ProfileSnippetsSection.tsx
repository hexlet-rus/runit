import { Button, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

function ProfileSnippetsSection({ userId }) {
  const { t: profileEditText } = useTranslation('translation', {
    keyPrefix: 'profileEdit',
  });

  const navigate = useNavigate();

  return (
    <Stack
      bd="1px gray"
      bdrs="md"
      bg="white"
      mt="lg"
      pb="md"
      pl="lg"
      pr="md"
      pt="md"
      style={{ height: '100%' }}
    >
      <Button
        color="rgba(5, 4, 4, 0.66)"
        onClick={() => navigate(routes.getSnippetPath(userId))}
        size="md"
        variant="transparent"
      >
        {profileEditText('snippets')}
      </Button>
      <Button
        color="rgba(5, 4, 4, 0.66)"
        onClick={() => navigate(routes.profilePageNew())}
        size="md"
        variant="transparent"
      >
        {profileEditText('profile')}
      </Button>
    </Stack>
  );
}

export default ProfileSnippetsSection;
