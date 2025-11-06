import { AppShell, Box, Container, Flex, useMantineTheme } from "@mantine/core";
import Footer from "./footer";
import TechnologiesSection, { mocData } from "./TechnologiesSection";
import { SectionContainer } from "./layout";
import FeaturesSection from "./FeaturesSection";
import HeroBanner, { mockData } from "./MainBanner";
import Header from "./Header";
import CallToAction from "./CallToAction";
import CommunitySection from "./CommunitySection";
import { CommunityType } from "src/types/components";


function HomePage() {
  const theme = useMantineTheme();
  return (
    <AppShell header={{ height: 60 }}>

      <AppShell.Header>
        <SectionContainer>
            <Header/>
        </SectionContainer>
      </AppShell.Header>

      <AppShell.Main >
        <SectionContainer>
          <HeroBanner data={mockData}/>
        </SectionContainer>

        {/* <Container bd="gray.1" m={0} p={0}> */}
        <Box bg="gray.1">
          <SectionContainer>
          <FeaturesSection/>
          </SectionContainer>
        </Box>
        {/* </Container> */}

        <SectionContainer>
          <TechnologiesSection technologies={mocData}/>
        </SectionContainer>
        <Box bg="gray.1">
        <SectionContainer>
          <Container>//CommunitySection вставить</Container>
        </SectionContainer>
        </Box>

        <SectionContainer>
          <CallToAction/>
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
