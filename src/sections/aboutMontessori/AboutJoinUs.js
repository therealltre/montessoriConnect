import { m } from 'framer-motion';
//next
import NextLink from 'next/link';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  height: 385,
  margin: 'auto',
  overflow: 'hidden',
  position: 'relative',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
  // display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    textAlign: 'left',
    backgroundColor: 'transparent',
    padding: 0,
  },
}));

// ----------------------------------------------------------------------

export default function AboutJoinUs() {
  return (
    <Container component={MotionViewport} mb={10} mt={10}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <Image
            visibleByDefault
            alt="kids_ad"
            src="/assets/images/home/kids_ad.png"
            disabledEffect
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Overlay>
            <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
              <Box component={m.div} variants={varFade().inDown} sx={{ color: 'common.white', mb: 5, mt: 3 }}>
                <Typography variant="h2">Get in touch</Typography>
                <Typography variant="h2">Join our community of montessori partners</Typography>
                <Typography variant="h6">Looking to become a montessori school?</Typography>
              </Box>
            </m.div>

            <NextLink href={PATH_AUTH.register} passHref>
              <Button
                size="large"
                variant="contained"
                target="_blank"
                rel="noopener"
                sx={{
                  whiteSpace: 'nowrap',
                  boxShadow: (theme) => theme.customShadows.z8,
                  color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                  bgcolor: 'common.white',
                  '&:hover': { bgcolor: 'grey.300' },
                }}
              >
                Get Started Now
              </Button>
            </NextLink>
          </Overlay>
        </Box>
      </ContentStyle>
    </Container>
  );
}
