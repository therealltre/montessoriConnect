// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
  // HomeHero,
  HomeAboutMontessoriConnect,
  // HomeDarkMode,
  // HomeLookingFor,
  // HomePricingPlans,
  // HomeAdvertisement,
  // HomeCleanInterfaces,
  // HomeHugePackElements,
  // HomeWorldMap,
  // HomeFaq,
  // HomeEvents,
  HomeUserRoles2,
  HomeHeroMap,
  HomeHero2,
  HomeResources,
  HomeBecomeMemeber,
  HomeMCInstagram,
  // HomeWorldMap,
  HomeVectorMap,
  HomePlatformStatistics,
  // HomeSubscribe,
} from '../sections/home';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Home">
      <RootStyle>
        {/* <HomeHero /> */}
        <ContentStyle>
          <HomeHero2 />

          <HomeHeroMap />
          <HomePlatformStatistics />

          {/* <HomeVectorMap /> */}
          {/* <HomeWorldMap /> */}
          <HomeUserRoles2 />

          <HomeAboutMontessoriConnect />
          <HomeResources />
          <HomeBecomeMemeber />
          <HomeMCInstagram />
          {/* <HomeSubscribe /> */}

          {/* <HomeEvents /> */}

          {/* <HomeHugePackElements /> */}

          {/* <HomeDarkMode /> */}

          {/* <HomeCleanInterfaces /> */}

          {/* <HomePricingPlans /> */}

          {/* <HomeLookingFor /> */}

          {/* <HomeFaq /> */}

          {/* <HomeAdvertisement /> */}
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
