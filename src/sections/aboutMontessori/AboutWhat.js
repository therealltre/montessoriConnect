import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 1"
                      src="/assets/images/about/about-m-1.jpg"
                      ratio="3/4"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                      }}
                    />
                  </m.div>
                </Grid>
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 2"
                      src="/assets/images/about/about-m-2.jpg"
                      ratio="1/1"
                      sx={{ borderRadius: 2 }}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What is Montessori Education?{' '}
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                }}
              >
                Montessori education is more than just academics—it's a holistic approach that encourages emotional,
                social, and intellectual growth. In a Montessori classroom, children learn at their own pace, choosing
                from a variety of activities that foster self-directed discovery. Our goal is to help children become
                confident, independent thinkers who are passionate about learning and deeply connected to their
                community.
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>

      <Container component={MotionViewport} sx={{ mt: 24 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Key Principles of Montessori Education
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                component="ul"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                  pl: 2,
                }}
              >
                <Typography component="li">
                  Child-Centered Learning: Every child’s individual interests and pace guide their learning journey.{' '}
                </Typography>
                <Typography component="li">
                  Prepared Environment: Our classrooms are designed to inspire exploration, creativity, and
                  collaboration.
                </Typography>
                <Typography component="li">
                  Hands-On Learning: Montessori uses tactile, real-world experiences to build a deeper understanding of
                  concepts.
                </Typography>
                <Typography component="li">
                  Social and Emotional Growth: Montessori fosters empathy, compassion, and respect for others, creating
                  a strong sense of community and social justice.
                </Typography>
              </Typography>
            </m.div>
          </Grid>

          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 1"
                      src="/assets/images/about/about-m-3.jpg"
                      ratio="1/1"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                      }}
                    />
                  </m.div>
                </Grid>
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 2"
                      src="/assets/images/about/about-m-4.jpg"
                      ratio="3/4"
                      sx={{ borderRadius: 2 }}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>

      <Container component={MotionViewport} sx={{ mt: 24 }}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 1"
                      src="/assets/images/about/about-m-5.jpg"
                      ratio="3/4"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                      }}
                    />
                  </m.div>
                </Grid>
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 2"
                      src="/assets/images/about/about-m-6.jpg"
                      ratio="1/1"
                      sx={{ borderRadius: 2 }}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Why Montessori?
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                component="ul"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                  pl: 2,
                }}
              >
                <Typography>
                  Montessori education helps children grow into well-rounded individuals who are not only academically
                  capable but also socially responsible. They develop:
                </Typography>
                <Typography component="li">
                  Independence: Encouraging self-reliance and decision-making from an early age.{' '}
                </Typography>
                <Typography component="li">
                  Empathy: Building awareness and understanding of others’ feelings and perspectives.
                </Typography>
                <Typography component="li">
                  Love of Learning: Cultivating a lifelong passion for discovery and intellectual curiosity.
                </Typography>
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
