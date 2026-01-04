import { AppShell, Loader, Text, Flex } from "@mantine/core";
import { Suspense, lazy } from "react";
import TabsSwitcher from "./TabsSwitcher";

import { TabItem } from "./types/components";
import Header from "./Header";
const SnippetForm = lazy(() => import("./SnippetForm"));
const ProfileForm = lazy(() => import("./ProfileForm"));


const LoadingFallback = () => (
    <Flex
        h="100vh"
        direction="column"
        align="center"
        justify="center"
        gap="md"
    >
        <Loader size="lg" type="dots" />
        <Text>Загрузка...</Text>
    </Flex>
);

const tabs: TabItem[] = [
    {
        id: 1,
        valueName: 'snippets',
        title: 'Сниппеты',
        children: (
            <Suspense fallback={<LoadingFallback />}>
                <SnippetForm />
            </Suspense>
        ),
    },
    {
        id: 2,
        valueName: 'profile',
        title: 'Профиль',
        children: (
            <Suspense fallback={<LoadingFallback />}>
                <ProfileForm />
            </Suspense>
        ),
    }
]

const ProfilePage = () => {
    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main styles={{
                main: {
                    background: 'var(--mantine-color-gray-0)'
                }
            }}>
                <TabsSwitcher tabs={tabs} />
            </AppShell.Main>
        </AppShell>
    )
}

export default ProfilePage;