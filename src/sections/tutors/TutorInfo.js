import PropTypes from 'prop-types';
import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Grid, Stack, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormProvider } from '../../components/hook-form';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

TutorInfo.propTypes = {
  isEdit: PropTypes.bool,
  currentStaff: PropTypes.object,
};

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const CoverImage = styled('div')(({ src, theme }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', // Ensures the image doesn't repeat
  height: '20vh',
  width: '50%',
  [theme.breakpoints.up('md')]: {
    height: '20vh',
    width: '20%',
  },
}));

export default function TutorInfo({ currentStaff }) {
  const defaultValues = useMemo(
    () => ({
      jobtitle: currentStaff?.title || '',
      username: currentStaff?.username || '',
      avatar: currentStaff?.avatar || '',
      coverImg: currentStaff?.coverImg || '',
      displayName: currentStaff?.displayName || '',
      role: currentStaff?.role || '',
      location: currentStaff?.location || '',
      aboutMe: currentStaff?.aboutMe || '',
      email: currentStaff?.email || '',
      phoneNumber: currentStaff?.phoneNumber || '',
    }),
    [currentStaff]
  );

  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider methods={methods}>
      <Stack display={'flex'} direction={{ sm: 'column', md: 'row' }} alignItems={'center'} gap={2}>
        <CoverImage src={currentStaff?.avatar} sx={{ mb: 5, borderRadius: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">{currentStaff?.displayName}</Typography>
          <Typography variant="subtitle1">{currentStaff?.jobtitle}</Typography>
          {/* <Typography variant="h6">About Me</Typography> */}
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* about ------------------------------------- */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">About Me</Typography>

            <Divider />

            <Stack spacing={3} mt={3}>
              <Stack>
                <Typography mb={2}>{currentStaff?.aboutMe}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Contact Details </Typography>

            <Divider />

            <Stack spacing={2} mt={3}>
              <Stack direction="row">
                <IconStyle icon={'eva:pin-fill'} />
                <Typography variant="body2">{currentStaff?.location}</Typography>
              </Stack>
              <Stack direction="row">
                <IconStyle icon={'eva:email-fill'} />
                <Typography variant="body2">{currentStaff?.email}</Typography>
              </Stack>
              <Stack direction="row">
                <IconStyle icon={'ic:baseline-phone'} />
                <Typography variant="body2">{currentStaff?.phoneNumber}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* work ------------------------------------- */}
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Work Experience </Typography>

            <Divider />
            <Grid
              container
              spacing={3}
              direction={{ xs: 'column', md: 'row' }} // Column on mobile, row on desktop
              mt={3}
            >
              {currentStaff?.workExperience?.map((work, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {work.duration}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {work.jobTitle}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {work.company}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">{work.responsibilities}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
