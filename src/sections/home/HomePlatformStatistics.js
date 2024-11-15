// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(0),
  backgroundColor: '#EEF9FF',
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: 120,
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 1440,
  margin: '16px',
  textAlign: 'left',
  position: 'relative',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function HomePlatformStatistics() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <Grid container spacing={2}>
            <Grid item xs={10} md={3} lg={3}>
              <Typography variant="h2" sx={{ color: theme.palette.primary.dark }}>
                Access
              </Typography>
            </Grid>

            {/* get update */}
            <Grid item xs={12} md={3} lg={3}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
                  15,763
                </Typography>
                <Typography variant="h5" sx={{ color: theme.palette.primary.dark }}>
                  School Profiles
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
                  1257
                </Typography>
                <Typography variant="h5" sx={{ color: theme.palette.primary.dark }}>
                  Educator Profiles
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="h3" fontWeight={900} sx={{ color: theme.palette.primary.dark }}>
                  1257
                </Typography>
                <Typography variant="h5" sx={{ color: theme.palette.primary.dark }}>
                  Training Centers Profiles
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
