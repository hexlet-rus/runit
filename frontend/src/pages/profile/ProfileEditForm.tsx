import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Button,
  Grid,
  Group,
  Notification,
  PasswordInput,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { LanguageIcon } from '@heroicons/react/24/solid';
import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { RootReducerType } from 'src/types/slices';
import { UpdateUserInput } from '../../types/components';
import { useTRPC } from '../../utils/trpc';
import routes from '../../routes';
import { useAuth, useLanguage } from '../../hooks';
import {
  username,
  email,
  password,
  required,
  confirmPassword,
} from '../../utils/validationSchemas';

function ProfileEditForm() {
  const { t } = useTranslation();
  const { t: profileEditText } = useTranslation('translation', {
    keyPrefix: 'profileEdit',
  });

  const { language, setLanguage } = useLanguage();
  const handleChangeLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const schema = yup.object().shape({
    name: username(),
    login: username(),
    email: email(),
    currentPassword: required(),
    newPassword: password(),
    confirmPassword: confirmPassword(),
  });
  type FormValuesType = yup.InferType<typeof schema>;
  const customYupResolver = (validationSchema: yup.AnyObjectSchema) => {
    const resolver = yupResolver(validationSchema);
    return (values: FormValuesType) => {
      const errors = resolver(values);
      if (!errors) {
        return null;
      }
      if (errors && typeof errors === 'object') {
        const translatedErrors: Record<string, string> = {};
        Object.entries(errors as Record<string, string>).forEach(
          ([field, errorKey]) => {
            translatedErrors[field] = t(errorKey);
          },
        );
        return translatedErrors;
      }
      return errors;
    };
  };

  const currentUserId = useSelector(
    (state: RootReducerType) => state.user.userInfo.id,
  );

  const { signOut } = useAuth();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const emailConfirmed = false;
  const navigate = useNavigate();

  const trpc = useTRPC();

  const queryData = trpc.users.getUserById.queryOptions(currentUserId);
  const { data, isLoading, error, refetch } = useQuery(queryData);

  const userMutationOptions = trpc.users.updateUser.mutationOptions();
  const userUpdater = useMutation({
    ...userMutationOptions,
    onError: (err) => {
      setSubmitError(
        err.message || t('errors.userNotUpdated'),
      );
    },
    onSuccess: () => {
      refetch();
      navigate(routes.profilePageNew());
    },
  });

  const initialFormValues: FormValuesType = {
    name: data?.username || '',
    login: data?.username || '',
    email: data?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const form = useForm<FormValuesType>({
    initialValues: initialFormValues,
    validate: customYupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.username || '',
        login: data.username || '',
        email: data.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [data]);

  function transformFormToApiData(
    formValues: FormValuesType,
    userId: number,
  ): UpdateUserInput {
    return {
      id: userId,
      username: formValues.login,
      email: formValues.email,
      // currentPassword: formValues.currentPassword,
      password: formValues.newPassword,
    };
  }

  const handleSubmit = async (values: FormValuesType) => {
    try {
      const apiData = transformFormToApiData(values, currentUserId);
      userUpdater.mutate(apiData);
    } catch (err) {
      console.error(err);
      setSubmitError(t('errors.userNotUpdated'));
    }
  };

  if (isLoading) return <div>{profileEditText('loading')}</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <AppShell header={{ height: 70 }} style={{ height: '100vh' }}>
      <AppShell.Header>
        <Group align="center" gap={0} justify="space-between" p="lg">
          <Group align="center" justify="left">
            <Button
              color="indigo"
              ml="lg"
              radius="md"
              size="sm"
              variant="filled"
            />
            <Box fw={700} ml="xs" style={{ fontSize: '18px' }}>
              {profileEditText('header')}
            </Box>
          </Group>
          <Group align="center" justify="flex-end">
            <ActionIcon
              onClick={() => handleChangeLanguage()}
              size="lg"
              variant="default"
            >
              <LanguageIcon style={{ width: '50%', height: '50%' }} />
            </ActionIcon>
            <Button mr="lg" onClick={signOut} radius="lg" variant="default">
              {profileEditText('logout')}
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="gray.1">
        <Box m="lg">
          <Grid align="flex-start" gutter="md" justify="center" m="lg">
            <Grid.Col h="110px" offset={0.1} span={1.5}>
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
                  onClick={() => navigate(routes.getSnippetPath(1))}
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
            </Grid.Col>
            <Grid.Col h="400px" span={9}>
              <Box
                bdrs="md"
                bg="white"
                m="lg"
                p="lg"
                style={{ border: '1px gray' }}
              >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Title order={5}>{profileEditText('formHeader')}</Title>
                  <Space />
                  <Stack
                    align="stretch"
                    gap="xl"
                    justify="flex-start"
                    style={{ fontSize: '14px' }}
                  >
                    <Group grow justify="flex-start">
                      <TextInput
                        label={profileEditText('name')}
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('name')}
                      />
                      <TextInput
                        label={profileEditText('login')}
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('login')}
                      />
                    </Group>

                    <Group grow justify="flex-start">
                      <TextInput
                        label={profileEditText('email')}
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('email')}
                      />
                      <PasswordInput
                        label="Действующий пароль"
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('currentPassword')}
                      />
                    </Group>
                  </Stack>
                  {!emailConfirmed && (
                    <Group gap="xs" justify="flex-start">
                      <Anchor
                        size="xs"
                        style={{ color: 'orange' }}
                        underline="never"
                      >
                        {profileEditText('notConfirmed')}
                      </Anchor>
                      <Anchor
                        size="xs"
                        style={{ color: 'orange' }}
                        underline="always"
                      >
                        {profileEditText('sendLetterAgain')}
                      </Anchor>
                    </Group>
                  )}
                  <Stack align="stretch" fs="14" gap="xl" justify="flex-start">
                    <Group grow justify="flex-start">
                      <PasswordInput
                        label={profileEditText('newPassword')}
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('newPassword')}
                      />
                      <PasswordInput
                        label={profileEditText('confirmPassword')}
                        radius="lg"
                        size="md"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...form.getInputProps('confirmPassword')}
                      />
                    </Group>
                    <Space />
                  </Stack>
                  <Group justify="flex-start">
                    <Button
                      onClick={() => navigate('/')}
                      radius="lg"
                      variant="default"
                    >
                      {profileEditText('cancel')}
                    </Button>
                    <Button
                      disabled={userUpdater.isPending}
                      radius="lg"
                      type="submit"
                    >
                      {profileEditText('save')}
                    </Button>
                  </Group>

                  {submitError && (
                    <Notification
                      color="red"
                      onClose={() => setSubmitError(null)}
                    >
                      {submitError}
                    </Notification>
                  )}
                </form>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default ProfileEditForm;
