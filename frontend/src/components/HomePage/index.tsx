import { AppShell, Flex, useMantineTheme } from "@mantine/core";
import Footer from "../Footer";
import TechnologiesSection, { mocData } from "../TechnologiesSection /TechnologiesSection";
import { SectionContainer } from "./layout";


function HomePage() {
  const theme = useMantineTheme();
  return (
    <AppShell header={{ height: 60 }}>

      <AppShell.Header>
        <SectionContainer>
            Header
        </SectionContainer>
      </AppShell.Header>

      <AppShell.Main >
        <SectionContainer>
          <TechnologiesSection technologies={mocData}/>
        </SectionContainer>
      </AppShell.Main>

      <AppShell.Footer pos="relative">
        <SectionContainer>
          <Footer/>
        </SectionContainer>
      </AppShell.Footer>

    </AppShell>
  );
}

export default HomePage;
