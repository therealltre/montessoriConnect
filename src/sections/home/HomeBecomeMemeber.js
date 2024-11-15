import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CONTENT = [
  {
    title: 'For Schools',
    description: 'Post jobs and attract the best educators and students.',
  },
  {
    title: 'For Educators',
    description: 'Find the right training and training to expand your skills.',
  },
  {
    title: 'For Training Centers',
    description: 'Reach and attract potential students to your program.',
  },
  {
    title: 'For All Members',
    description: 'Access unique perks and benefits.',
  },
  {
    title: 'For Schools',
    description: 'Post jobs and attract the best educators and students.',
  },
  {
    title: 'For Educators',
    description: 'Find the right training and training to expand your skills.',
  },
  {
    title: 'For Training Centers',
    description: 'Reach and attract potential students to your program.',
  },
  {
    title: 'For All Members',
    description: 'Access unique perks and benefits.',
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
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function HomeAboutMontessoriConnect() {
  // const theme = useTheme();

  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <Box sx={{ textAlign: 'start', mb: { xs: 2, md: 2 } }}>
            <m.div variants={varFade().inDown}>
              <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1} style={{ color: 'white' }}>
                <Typography variant="h2">Become</Typography>
                <Typography
                  variant="h2"
                  sx={{
                    backgroundColor: 'white',
                    backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  A Member
                </Typography>
              </Stack>
            </m.div>
          </Box>

          <ContentStyle>
            <Grid container spacing={{ xs: 2, lg: 4 }}>
              {CONTENT.map((item, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <m.div variants={varFade().inRight}>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'common.white' }}>
                      {item.description}
                    </Typography>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
