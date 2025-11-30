import { AppShell } from "@mantine/core";
import TabsSwitcher from "./TabsSwitcher";
import SnippetForm from "./SnippetForm";
import ProfileForm from "./ProfileForm";
import { TabItem } from "./TabsSwitcher";

const tabs: TabItem[] = [
    {   
        id:1,
        valueName:'snippets',
        title: 'Сниппеты',
        children: <SnippetForm/>,
    },
    {   
        id:2,
        valueName:'profile',
        title: 'Профиль',
        children: <ProfileForm/>,
    }
]

function ProfilePage({ }) {
    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
                Header
            </AppShell.Header>
            <AppShell.Main styles={{
                main: {
                    background: 'var(--mantine-color-gray-0)'
                }
            }}>
                <TabsSwitcher tabs={tabs}/>
            </AppShell.Main>
        </AppShell>
    )
}

export default ProfilePage;