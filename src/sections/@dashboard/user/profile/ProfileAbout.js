// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Grid, Divider } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileAbout() {
  const { user } = useAuth();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="About" />

          <Divider />

          <Grid item xs={12} md={8}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="body2">{user?.about}</Typography>
            </Stack>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Contact Details:" />
          <Divider />
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row">
              <IconStyle icon={'eva:pin-fill'} />
              <Typography variant="body2">
                Live at &nbsp;
                <Link component="span" variant="subtitle2" color="text.primary">
                  {user?.country}
                  {/* {country} */}
                </Link>
              </Typography>
            </Stack>

            <Stack direction="row">
              <IconStyle icon={'eva:email-fill'} />
              <Typography variant="body2">{user?.email}</Typography>
            </Stack>

            <Stack direction="row">
              <IconStyle icon={'ic:round-business-center'} />
              <Typography variant="body2">
                {user?.jobtitle} at &nbsp;
                <Link component="span" variant="subtitle2" color="text.primary">
                  {user?.company}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
