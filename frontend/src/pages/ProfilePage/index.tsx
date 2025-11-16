import { AppShell } from "@mantine/core";
import TabsSwitcher from "./TabsSwitcher";



function ProfilePage({ }) {
    return (
        <AppShell  header={{ height: 60 }}>
            <AppShell.Header>
                Header
            </AppShell.Header>
            <AppShell.Main styles={{
                main:{
                    background:'var(--mantine-color-gray-0)'
                }
            }}>
                <TabsSwitcher></TabsSwitcher>
            </AppShell.Main>
        </AppShell>
    )
}

export default ProfilePage;