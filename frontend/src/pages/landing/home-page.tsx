import { AppShell, Box, Container } from '@mantine/core';
import TechnologiesSection, { mockDataTechnology } from './TechnologiesSection';
import { SectionContainer } from './layout';
import FeaturesSection from './FeaturesSection';
import HeroBanner, { mockData } from './MainBanner';
import Header from './Header';
import CallToAction from './CallToAction';
import Footer from './Footer-1';

function HomePage() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SectionContainer>
          <Header />
        </SectionContainer>
      </AppShell.Header>

      <AppShell.Main>
         <SectionContainer>
          <HeroBanner data={mockData} />
        </SectionContainer>

        <Box bg="gray.1">
          <SectionContainer>
            <FeaturesSection />
          </SectionContainer>
        </Box>

        <SectionContainer>
          <TechnologiesSection technologies={mockDataTechnology} />
        </SectionContainer> 
        <Box bg="gray.1">
          <SectionContainer>
            <Container>//CommunitySection вставить</Container>
          </SectionContainer>
        </Box>

        <SectionContainer>
          <CallToAction />
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
