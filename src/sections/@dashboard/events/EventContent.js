import PropTypes from 'prop-types';
import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Grid, Stack, Typography, Divider, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormProvider } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

EventContents.propTypes = {
  isEdit: PropTypes.bool,
  currentEvent: PropTypes.object,
};

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      height: ${theme.spacing(8)};
      width: ${theme.spacing(8)};
`
);

const CoverImage = styled('div')(({ src }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '50vh',
  width: '100%',
}));

export default function EventContents({ currentEvent }) {
  const defaultValues = useMemo(() => {
    const eventDescription = currentEvent?.description || [];
    const keyResponsibilities = currentEvent?.keyResponsibilities || [];
    const whyUs = currentEvent?.whyUs || [];

    const concatenatedDescription = `
        Event Description:
        ${eventDescription.map((item) => `• ${item}`).join('\n')}

        Key Responsibilities:
        ${keyResponsibilities.map((item) => `• ${item}`).join('\n')}

        Why You'll Love Working Here:
        ${whyUs.map((item) => `• ${item}`).join('\n')}
      `.trim();

    return {
      companyName: currentEvent?.companyName || '',
      logoUrl: currentEvent?.logoUrl || '',
      cover: currentEvent?.cover || '',
      title: currentEvent?.title || '',
      fullDescription: concatenatedDescription,
      date: currentEvent?.postedDate || '',
      enddate: currentEvent?.enddate || '',
      location: currentEvent?.location || '',
      phoneNumber: currentEvent?.phoneNumber || '',
    };
  }, [currentEvent]);

  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider methods={methods}>
      <CoverImage src={currentEvent?.cover} sx={{ mb: 5, borderRadius: 2 }} />
      <Grid container spacing={3}>
        {/* details ------------------------------------- */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Event title: </Typography>
            <Typography variant="h4"> {currentEvent?.title}</Typography>

            <Divider />

            <Stack spacing={3} mt={3}>
              <Stack>
                <Typography mb={2} variant="h6">
                  Location
                </Typography>
                <Typography mb={2}>{currentEvent?.location}</Typography>
              </Stack>

              <Stack>
                <Typography mb={2} variant="h6">
                  Event Description
                </Typography>
                <Typography mb={2}>{currentEvent?.description}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* sidebar properties--------------------------------------- */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon={'ion:calendar'} width={20} height={20} color={'primary'} />
              <Stack>
                <Typography variant="body2">Date Posted:</Typography>
                <Typography variant="subtitle1"> {currentEvent?.date}</Typography>
              </Stack>
            </Box>

            <Box
              sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon={'ion:calendar'} width={20} height={20} color={'primary'} />
              <Stack>
                <Typography variant="body2">End date:</Typography>
                <Typography variant="subtitle1"> {currentEvent?.enddate}</Typography>
              </Stack>
            </Box>
          </Card>

          {/* job poster information --------------------------------------------------- */}
          <Card sx={{ p: 1, mt: 3 }}>
            <Box p={3} display="flex" alignItems="flex-start">
              <AvatarWrapper src={currentEvent?.logoUrl} variant="rounded" />
              <Box
                sx={{ textAlign: 'start', ml: 3, color: 'color.primary' }}
                display={'flex'}
                flexDirection={'column'}
                gap={1}
              >
                <Typography variant="subtitle1">{currentEvent?.location} </Typography>
                <Typography>{currentEvent?.phoneNumber}</Typography>
              </Box>
            </Box>
          </Card>
          
        </Grid>
      </Grid>
    </FormProvider>
  );
}
