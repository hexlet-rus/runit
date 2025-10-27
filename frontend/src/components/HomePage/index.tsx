import { AppShell } from "@mantine/core";
import Footer from "../Footer";

const mockdata = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
]
function HomePage() {
  
  return (
    <AppShell header={{ height: 'auto' }} footer={{ height: 'auto' }} padding="md">

      <AppShell.Header pos="sticky">
          <AppShell.Section mx="auto" px="md" py="md" style={{maxWidth: 1440}}>Header</AppShell.Section>
      </AppShell.Header>

      <AppShell.Main mx="auto" px="md" py={0} style={{maxWidth: 1440}}>Main</AppShell.Main>

      <AppShell.Footer>
        <Footer/>
      </AppShell.Footer>

    </AppShell>
  );
}

export default HomePage;
