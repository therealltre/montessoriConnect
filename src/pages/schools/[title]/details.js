// @mui
import { styled } from '@mui/material/styles';

import { Avatar, Box, Button, Card, Container, Grid, Typography } from '@mui/material';
// routes
import { PAGE_SCHOOLS } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { useRouter } from 'next/router';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { paramCase } from 'change-case';
import Iconify from '../../../components/Iconify';
// import { JobContent } from '../../../sections/career';
import { MotionViewport } from '../../../components/animate';
import { SchoolContent } from '../../../sections/schools';
//map
import MapGL from 'react-map-gl';
import { MAPBOX_API } from '../../../config';
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlNavigation,
  // MapControlFullscreen,
} from '../../../components/map';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
          height: ${theme.spacing(8)};
          width: ${theme.spacing(8)};
    `
);

// ----------------------------------------------------------------------

JobDetails.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobDetails() {
  const { query } = useRouter();
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: -40,
    zoom: 2,
  });

  const { title } = query;

  const isMountedRef = useIsMountedRef();

  const [schools, setSchools] = useState([]);

  // const [selectedTab, setSelectedTab] = useState('schoolContent'); // State for managing the selected tab

  const getSchools = useCallback(async () => {
    try {
      const response = await axios.get('/api/schools');

      if (isMountedRef.current) {
        setSchools(response.data.schools);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSchools();
  }, [getSchools]);

  const currentSchool = schools.find((school) => paramCase(school.schoolName) === title);

  // const handleChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };

  return (
    <Container component={MotionViewport} mt={5} mb={10}>
      <RootStyle>
        <Container component={MotionViewport} sx={{ textAlign: 'start' }}>
          <Page title="School: Details">
            <Button
              size="medium"
              startIcon={<Iconify icon="weui:back-filled" />}
              href={PAGE_SCHOOLS.root}
              sx={{ mb: 2 }}
            >
              Back
            </Button>

            {/* <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" sx={{ marginBottom: 2 }}>
              <Tab label="School Details" value="schoolContent" />
            </Tabs> */}
          </Page>
        </Container>

        <Grid item xs={12} md={12}>
          <SchoolContent currentSchool={currentSchool} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ mt: 3 }}>
            <MapGL
              {...viewport}
              onViewportChange={setViewport}
              mapStyle="mapbox://styles/mapbox/light-v9"
              // mapStyle="mapbox://styles/mapbox/streets-v9"
              // mapStyle="mapbox://styles/mapbox/streets-v12"
              mapboxApiAccessToken={MAPBOX_API}
              width="100%"
              height="300px"
            >
              <MapControlScale />
              <MapControlNavigation />

              {currentSchool && (
                <MapControlMarker
                  key={currentSchool.id}
                  latitude={currentSchool.latlng.lat}
                  longitude={currentSchool.latlng.lng}
                  onClick={() => setTooltip(currentSchool)}
                />
              )}

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
        </Grid>
      </RootStyle>
    </Container>
  );
}
