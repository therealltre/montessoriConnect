import '../../../../utils/mapboxgl';
import MapGL from 'react-map-gl';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
// import { _mapContact } from '../../../../(_mock)';
import { MAPBOX_API } from '../../../../config';
import Iconify from '../../../../components/Iconify';
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../../../components/map';
import SimpleBar from '../../../../components/simplebar';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
          height: ${theme.spacing(8)};
          width: ${theme.spacing(8)};
    `
);

// ----------------------------------------------------------------------
const CardsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  maxHeight: 700,
  height: '100%',
  marginLeft: theme.spacing(2),
}));

const CardStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

export default function AppSchoolsMap() {
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: -60,
    zoom: 1,
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [schools, setSchools] = useState([]);
  const isMountedRef = useIsMountedRef();

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

  const handleCardClick = (school) => {
    setViewport({
      ...viewport,
      latitude: school.latlng.lat,
      longitude: school.latlng.lng,
      zoom: 4,
    });
    setSelectedCountry(school);
  };

  return (
    <Card>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} display={'flex'} justifyContent="center">
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <CardsContainer sx={{ margin: 0 }}>
                <MapGL
                  {...viewport}
                  onViewportChange={setViewport}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
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
              </CardsContainer>
            </Grid>

            <Grid item xs={12} md={3}>
              <SimpleBar style={{ maxHeight: 580 }}>
                <CardsContainer>
                  {schools.map((school) => (
                    <CardStyle key={school.id} onClick={() => handleCardClick(school)}>
                      <CardContent>
                        <Typography variant="subtitle2">{school.schoolName}</Typography>
                        <Typography component="p" variant="caption">
                          {school.phoneNumber}
                        </Typography>
                      </CardContent>
                    </CardStyle>
                  ))}
                </CardsContainer>
              </SimpleBar>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
