import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Stack, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const TABS = [
  {
    icon: '/assets/icons/ic_parent.svg',
    description: 'Find a Montessori School',
    href: '/schools',
  },
  {
    icon: '/assets/icons/ic_school.svg',
    description: 'Find a Montessori Job',
    href: '/careers',
  },
  {
    icon: '/assets/icons/ic_event.svg',
    description: 'Find a Montessori Educator',
    href: '/tutors',
  },
  {
    icon: '/assets/icons/ic_teacher.svg',
    description: 'Find a Training Center',
    href: '#',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  backgroundColor: theme.palette.grey[400],
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  backgroundImage: 'url(/assets/overlay1.svg), url(/assets/images/home/landing-hero-bg.jpg)',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: 560,
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 1440,
  margin: 'auto',
  textAlign: 'left',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const TabsContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -20, // Adjust as needed
  left: 0,
  right: 0,
  zIndex: 20,
  display: 'flex',
  overflowX: 'auto', // Enable horizontal scrolling
  // gap: theme.spacing(2), // Space between tabs
  padding: theme.spacing(1), // Optional: Add padding for better touch targets
  [theme.breakpoints.up('md')]: {
    display: 'flex', // Change to flex for larger screens
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: 'visible', // Disable scrolling on larger screens
  },
}));

const Tab = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: 282, // Fixed width for large screens
  height: 70,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:after': {
    content: '""',
    marginLeft: theme.spacing(1),
    display: 'inline-block',
    width: 0,
    height: 0,
    // borderTop: '6px solid transparent',
    // borderBottom: '6px solid transparent',
    borderLeft: `6px solid ${theme.palette.common.white}`, // Right arrow
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    width: '1px',
    height: '60%',
    backgroundColor: theme.palette.common.white,
  },
  '&:first-of-type::before': {
    display: 'none', // Remove the divider for the first tab
  },
}));

// ----------------------------------------------------------------------

export default function HomeAboutMontessoriConnect() {
  const theme = useTheme();

  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Uniting the Global <br />
                Montessori Community
              </Typography>
              <Typography component="span" variant="h4" sx={{ color: 'common.white' }}>
                Discover schools, connect with educators, access resources, and find <br /> training centers for
                Montessori education worldwide.
              </Typography>
            </m.div>

            <TabsContainer>
              {TABS.map((tab, index) => (
                <a key={index} href={tab.href} style={{ textDecoration: 'none' }}>
                  <Tab
                    sx={{
                      gap: 2,
                      backgroundColor: index === 1 || index === 3 ? '#00B2FF' : theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: index === 1 || index === 3 ? '#0099cc' : theme.palette.primary.dark,
                      },
                    }}
                  >
                    {tab.description}
                    <Iconify icon={'cil:arrow-right'} width={24} height={24} />
                  </Tab>
                </a>
              ))}
            </TabsContainer>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
