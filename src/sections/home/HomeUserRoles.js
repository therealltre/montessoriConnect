import { m } from 'framer-motion';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardContent, Container, Grid, Stack, Tabs, Tab, Typography, useMediaQuery } from '@mui/material';
import Iconify from '../../components/Iconify';
import { MotionViewport, varFade } from '../../components/animate';
import Image from 'next/image';
import { useRouter } from 'next/router';

const TABS = [
  {
    icon: '/assets/icons/ic_parent.svg',
    description: 'Parent',
    cards: [
      {
        header: 'Free Access',
        icon: '/assets/icons/ic_search.svg',
        title: 'Find a School',
        href: '/schools',
      },
      { header: 'Free Access', icon: '/assets/icons/ic_community.svg', title: 'Parent Community', href: '/parentsforum' },
      { header: 'Free Access', icon: '/assets/icons/ic_book.svg', title: 'Learn About Montessori', href: '/about-montessori' },
      {
        header: 'Free Access',
        icon: '/assets/icons/ic_events-resources.svg',
        title: 'Events & Resources',
        href: '/events',
      },
    ],
  },
  {
    icon: '/assets/icons/ic_school.svg',
    description: 'School',
    cards: [
      { header: 'Free Access', icon: '/assets/icons/ic_school.svg', title: 'Create A School Profile', href: '/auth/register' },
      {
        header: 'Free Access',
        icon: '/assets/icons/ic_teacher.svg',
        title: 'View Teacher Profile',
        href: '/tutors',
      },
      {
        header: 'Paid Access',
        icon: '/assets/icons/ic_briefcase-black.svg',
        title: 'View Teacher Profile (Full)',
        href: '/teachersFull',
      },
      { header: 'Free Access', icon: '/assets/icons/ic_event.svg', title: 'Post Events', href: '/dashboard/events/new/' },
    ],
  },
  {
    icon: '/assets/icons/ic_event.svg',
    description: 'Training Center',
    cards: [
      { header: 'Paid Access', icon: '/assets/icons/ic_briefcase-black.svg', title: 'Post Trainings', href: '/page1' },
      { header: 'Free Access', icon: '/assets/icons/ic_school.svg', title: 'View School Profiles', href: '/schools' },
    ],
  },
  {
    icon: '/assets/icons/ic_teacher.svg',
    description: 'Teachers',
    cards: [
      { header: 'Free Access', icon: '/assets/icons/ic_search.svg', title: 'Find Job Openings', href: '/career' },
      { header: 'Free Access', icon: '/assets/icons/ic_school.svg', title: 'Connect With Schools', href: '/schools' },
      {
        header: 'Free Access',
        icon: '/assets/icons/ic_briefcase-black.svg',
        title: 'Professional Development',
        href: '/events',
      },
      { header: 'Free Access', icon: '/assets/icons/ic_event.svg', title: 'View School Events', href: '/events' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  height: 'auto',
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  paddingTop: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

const BadgeStyle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold',
}));

const CardTabStyle = styled(Card)(({ theme, isSelected }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  alignContent: 'center',
  display: 'flex',
  spacing: 1,
  gap: 10,
  flexDirection: 'row',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: isSelected ? `0 4px 20px ${theme.palette.primary.main}` : '0 4px 10px rgba(0,0,0,0.1)',
  border: isSelected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: isSelected ? theme.palette.primary.main : 'white',
  color: isSelected ? theme.palette.common.white : 'inherit',
  '&:hover': {
    boxShadow: `0 6px 12px ${theme.palette.primary.main}`,
    transform: 'translateY(-4px)',
  },
}));

export default function TabsWithCards() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (href) => {
    router.push(href);
  };

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

        {/* Render scrollable tabs for mobile view */}
        {isMobile ? (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="tabs example"
          >
            {TABS.map((tab, index) => (
              <Tab
                key={index}
                icon={<Image src={tab.icon} alt={tab.description} width={24} height={24} />}
                label={tab.description}
                sx={{
                  display: 'flex',
                  flexDirection: 'row', // Ensures the icon is above the text
                  gap: 1, // Adds gap between the icon and text
                }}
              />
            ))}
          </Tabs>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'center', mb: 5 }}>
            {TABS.map((tab, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CardTabStyle onClick={() => handleTabChange(null, index)} isSelected={selectedTab === index}>
                  <Image
                    src={tab.icon}
                    alt={tab.description}
                    width={30}
                    height={30}
                    style={{ filter: selectedTab === index ? 'invert(1)' : 'none' }} // White icon when selected
                  />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {tab.description}
                  </Typography>
                </CardTabStyle>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={5}>
          <Grid container spacing={3}>
            {TABS[selectedTab].cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <m.div variants={varFade().inUp} initial="initial" animate="animate">
                  <Card
                    onClick={() => handleCardClick(card.href)}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center', // Center content vertically
                      justifyContent: 'space-between',
                      // textAlign: 'center',
                    }}
                  >
                    <BadgeStyle>{card.header === 'Free Access' ? 'Free' : 'Paid'}</BadgeStyle>

                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center', // Center content vertically
                        justifyContent: 'space-between',
                        // textAlign: 'center',
                      }}
                    >
                      {isMobile ? (
                        <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
                          <Image src={card.icon} alt="icon" width={30} height={30} />

                          <Typography variant="h6">{card.title}</Typography>
                          <Iconify icon="ion:chevron-forward-outline" width={24} height={24} />
                        </Box>
                      ) : (
                        <Box display="flex" alignItems="center" justifyContent="space-between" gap={4}>
                          <Image src={card.icon} alt="icon" width={30} height={30} />

                          <Typography variant="h6">{card.title}</Typography>
                          <Iconify icon="ion:chevron-forward-outline" width={24} height={24} />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
