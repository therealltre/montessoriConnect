import PropTypes from 'prop-types';
import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Grid, Stack, Typography, Divider, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormProvider } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import Image from 'next/image';

// ----------------------------------------------------------------------

SchoolContents.propTypes = {
  isEdit: PropTypes.bool,
  currentSchool: PropTypes.object,
};

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const CoverImage = styled('div')(({ src }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '50vh',
  width: '100%',
}));

export default function SchoolContents({ currentSchool }) {
  const defaultValues = useMemo(() => {
    const eventDescription = currentSchool?.description || [];
    const keyResponsibilities = currentSchool?.keyResponsibilities || [];
    const whyUs = currentSchool?.whyUs || [];

    const concatenatedDescription = `
        Event Description:
        ${eventDescription.map((item) => `• ${item}`).join('\n')}

        Key Responsibilities:
        ${keyResponsibilities.map((item) => `• ${item}`).join('\n')}

        Why You'll Love Working Here:
        ${whyUs.map((item) => `• ${item}`).join('\n')}
      `.trim();

    return {
      // companyName: currentSchool?.companyName || '',
      logoUrl: currentSchool?.logoUrl || '',
      cover: currentSchool?.cover || '',
      schoolName: currentSchool?.schoolName || '',
      fullDescription: concatenatedDescription,

      // enddate: currentSchool?.enddate || '',
      schoolAddress: currentSchool?.schoolAddress || '',
      schoolAbout: currentSchool?.schoolAbout || '',
      schoolEmail: currentSchool?.schoolEmail || '',
      phoneNumber: currentSchool?.phoneNumber || '',
    };
  }, [currentSchool]);

  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider methods={methods}>
      <CoverImage src={currentSchool?.logoUrl} sx={{ mb: 5, borderRadius: 2 }} />
      <Grid container spacing={3}>
        {/* details ------------------------------------- */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">About </Typography>

            <Divider />

            <Stack spacing={3} mt={3}>
              <Stack>
                <Typography mb={2}>{currentSchool?.schoolAbout}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Contact: </Typography>

            <Divider />

            <Stack spacing={2} mt={3}>
              <Stack>
                <Typography>{currentSchool?.schoolName}</Typography>
              </Stack>
              <Stack direction="row">
                <IconStyle icon={'eva:pin-fill'} />
                <Typography variant="body2">{currentSchool?.schoolAddress}</Typography>
              </Stack>
              <Stack direction="row">
                <IconStyle icon={'eva:email-fill'} />
                <Typography variant="body2">{currentSchool?.schoolEmail}</Typography>
              </Stack>
              <Stack direction="row">
                <IconStyle icon={'ic:baseline-phone'} />
                <Typography variant="body2">{currentSchool?.phoneNumber}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* Our Faculty  */}

        <Grid item xs={12} md={12}>
          <Typography variant="h5">Our Faculty</Typography>
        </Grid>

        {currentSchool?.ourFaculty?.map((faculty, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Image
                src={faculty.facultyImgUrl}
                alt={`${faculty.facultyName}'s image`}
                width={320}
                height={159}
                layout="responsive" // Optional: Adjusts the layout of the image
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {faculty.facultyName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {faculty.role}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">{faculty.description}</Typography>
            </Card>
          </Grid>
        ))}

        {/* Programs Section */}
        <Grid item xs={12} md={12}>
          <Typography variant="h5">Our Programs</Typography>
        </Grid>

        {currentSchool?.ourPrograms?.map((program, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6">{program.programName}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Age Group: {program.ageGroup}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">{program.description}</Typography>
            </Card>
          </Grid>
        ))}

        {/* map area--------------------------------------- */}

        {/* job poster information --------------------------------------------------- */}
        {/* <Grid item xs={12} md={12}>
          <Card sx={{ p: 1, mt: 3 }}>
            <MapGL
              {...viewport}
              onViewportChange={setViewport}
              mapStyle="mapbox://styles/mapbox/light-v9"
              // mapStyle="mapbox://styles/mapbox/streets-v9"
              // mapStyle="mapbox://styles/mapbox/streets-v12"
              mapboxApiAccessToken={MAPBOX_API}
              width="100%"
              height="100%"
            >
              <MapControlFullscreen />
              <MapControlScale />
              <MapControlNavigation />

              {schools.map((school) => (
                <MapControlMarker
                  key={school.id}
                  latitude={school.latlng.lat} // Access lat from latlng
                  longitude={school.latlng.lng} // Access lng from latlng
                  onClick={() => setTooltip(school)}
                />
              ))}

              {tooltip && (
                <MapControlPopup
                  longitude={tooltip.latlng.lng}
                  latitude={tooltip.latlng.lat}
                  onClose={() => setTooltip(null)}
                  sx={{
                    '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
                    '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                    '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
                  }}
                >
                  <Box p={3} display="flex" alignItems="center" justifyContent="center">
                    <AvatarWrapper src={tooltip.logoUrl} variant="rounded" sx={{ width: 113, height: 56 }} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography component="p" variant="caption">
                    {tooltip.schoolAddress}
                  </Typography>

                  <Typography component="p" variant="caption" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <Iconify icon="eva:phone-fill" sx={{ mr: 0.5, width: 14, height: 14 }} />
                    {tooltip.phoneNumber}
                  </Typography>
                </MapControlPopup>
              )}
            </MapGL>
          </Card>
        </Grid> */}
      </Grid>
    </FormProvider>
  );
}
