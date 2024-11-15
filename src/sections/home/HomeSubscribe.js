// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
// components
import { MotionContainer } from '../../components/animate';
import Image from 'next/image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  backgroundColor: '#EEF9FF',
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: 260,
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
  const theme = useTheme();

  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <ContentStyle>
            <Grid container spacing={2} gap={{ xs: 2, md: 5, lg: 10 }}>
              <Grid item xs={10} md={3} lg={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={'/assets/images/subscribe/illustration.svg'} alt="carousel" width={350} height={160} />
                </Box>
              </Grid>

              {/* get update */}
              <Grid item xs={12} md={3} lg={3}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                    Get Regular <br /> Updates from
                  </Typography>
                  <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
                    MontessoriConnect
                  </Typography>
                </Stack>
              </Grid>

              {/* subscribeButton */}
              <Grid item xs={10} md={3} lg={4}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                    Subscribe to Newsletter
                  </Typography>

                  <TextField name="email" type="email" label="enter email address" fullWidth />
                  <Button variant="contained" fullWidth>
                    Subscribe
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
