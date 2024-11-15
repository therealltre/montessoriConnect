import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
// import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 1440,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'center',
  },
}));


const HeroOverlayStyle = styled(m.img)(({ theme }) => ({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    // right: '8%',
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '88vh',
    objectFit: 'none',
  },
}));

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    // right: '8%',
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100vh',
    objectFit: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="/assets/overlay.svg"
          //not avaiable
          variants={varFade().in}
        />

        <HeroImgStyle alt="hero" src="/assets/images/home/hero1.png" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Welcome to <br />
              </Typography>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Montessori Connect
              </Typography>
              <Typography component="span" variant="h2" sx={{ color: 'common.white' }}>
                Streamline your school management <br />
              </Typography>
              <Typography component="span" variant="h2" sx={{ color: 'common.white' }}>
                with our all-in-one system
              </Typography>
            </m.div>

            {/* <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                The starting point for your next project based on easy-to-customize MUI helps you build apps faster and
                better.
              </Typography>
            </m.div> */}

            <m.div variants={varFade().inRight}>
              <NextLink href={PATH_AUTH.login} passHref>
                <Button size="large" variant="contained">
                  Get Started
                </Button>
              </NextLink>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
