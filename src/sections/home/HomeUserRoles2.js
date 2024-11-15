import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Tabs, Tab, Typography, useMediaQuery, Stack, Button } from '@mui/material';
import Image from 'next/image';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';

const TABS = [
  {
    icon: '/assets/icons/ic_parent_1.svg',
    description: 'Parent',
    contents: [
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_search.svg',
        title: 'Find a School and compare your options',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/schools',
        redirectText: 'FIND A SCHOOL',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_community.svg',
        title: 'Connect with Montessori parents',
        subtitle: 'Connect with Montessori parents from schools you are interested in for unbiased reviews',
        href: '/parentsforum',
        redirectText: 'CONNECT',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_book.svg',
        title: 'Learn more about Montessori method',
        subtitle: 'Expand your knowledge about Montessori and how it differs from traditional education',
        href: '/about-montessori',
        redirectText: 'LEARN',
      },
    ],
  },
  {
    icon: '/assets/icons/ic_school_1.svg',
    description: 'School',
    contents: [
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_school.svg',
        title: 'Create A School Profile',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/schools',
        redirectText: 'VIEW SCHOOL PROFILES',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_teacher.svg',
        title: 'View Teacher Profile',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/tutors',
        redirectText: 'FIND AN EDUCATOR',
      },
      {
        // header: 'Paid Access',
        // icon: '/assets/icons/ic_briefcase-black.svg',
        title: 'View Teacher Profile (Full)',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/teachersFull',
        redirectText: 'FIND AN EDUCATOR',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_event.svg',
        title: 'Post Events',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/dashboard/events/new/',
        redirectText: 'POST AN EVENT',
      },
    ],
  },
  {
    icon: '/assets/icons/ic_educator.svg',
    description: 'Educators',
    contents: [
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_search.svg',
        title: 'Find Job Openings',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/career',
        redirectText: 'FIND A JOB',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_school.svg',
        title: 'Connect With Schools',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/schools',
        redirectText: 'CONNECT',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_briefcase-black.svg',
        title: 'Professional Development',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/events',
        redirectText: 'FIND EVENTS',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_event.svg',
        title: 'View School Events',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/events',
        redirectText: 'FIND EVENTS',
      },
    ],
  },
  {
    icon: '/assets/icons/ic_training_center.svg',
    description: 'Training Center',
    contents: [
      {
        // header: 'Paid Access',
        // icon: '/assets/icons/ic_briefcase-black.svg',
        title: 'Post Trainings',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/page1',
        redirectText: 'POST TRAINING',
      },
      {
        // header: 'Free Access',
        // icon: '/assets/icons/ic_school.svg',
        title: 'View School Profiles',
        subtitle:
          'Explore school profiles with our interactive map, read school profiles, compare your options, and reviews. ',
        href: '/schools',
        redirectText: 'VIEW SCHOOL PROFILES',
      },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  paddingTop: theme.spacing(10),
  borderRadius: theme.shape.borderRadius * 2,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

export default function SimpleTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const router = useRouter(); // Initialize the Next.js router

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRedirect = (href) => {
    router.push(href); // Redirect to the provided href
  };

  const selectedContents = TABS[selectedTab].contents;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'start', mb: { xs: 5, md: 5 } }}>
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              MontessoriConnect
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant="h2">I am</Typography>
              <Typography
                variant="h2"
                sx={{
                  backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                  backgroundSize: '100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                a:
              </Typography>
            </Stack>
          </m.div>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          aria-label="simple tabs"
          width= '100%'
          // sx={{width: '100%'}}
        >
          {TABS.map((tab, index) => (
            <Tab
              key={index}
              icon={<Image src={tab.icon} alt={tab.description} width={36} height={36} />}
              label={tab.description}
              sx={{
                flexDirection: 'row',
                gap: 1,
                height: 60, // Increase tab height
                minHeight: 60, // Set minimum height to ensure height consistency
                backgroundColor: '#367BF5',
                color: 'common.white',
                m: 0, // Remove any margin between tabs
                py: 1.5, // Adjust vertical padding for content alignment
              }}
            />
          ))}
        </Tabs>

        <Box
          sx={{
            // mt: 5,
            p: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(0, 178, 255, 0.08)',
          }}
        >
          <Grid container spacing={2}>
            {selectedContents.map((content, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{ p: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    {content.subtitle}
                  </Typography>
                  <Button
                    sx={{ mt: 2 }}
                    endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                    onClick={() => handleRedirect(content.href)} // Add redirect on click
                  >
                    {content.redirectText}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
