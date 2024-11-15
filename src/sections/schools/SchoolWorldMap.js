import '../../utils/mapboxgl';
import MapGL from 'react-map-gl';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { MAPBOX_API } from '../../config';
import Iconify from '../../components/Iconify';
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../components/map';
import { MotionViewport } from '../../components/animate';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import axios from '../../utils/axios';

const RootStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  height: 700,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  borderColor: '#1a1a1a',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
          height: ${theme.spacing(8)};
          width: ${theme.spacing(8)};
    `
);

// ----------------------------------------------------------------------

export default function SchoolWorldMap() {
  const [tooltip, setTooltip] = useState(null);
  const [schools, setSchools] = useState([]);
  const isMountedRef = useIsMountedRef();

  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: -40,
    zoom: 2,
  });

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

  return (
    <Container component={MotionViewport}>
      <RootStyle>
        <MapGL
          {...viewport}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/mapbox/light-v9"
          // mapStyle="mapbox://styles/mapbox/streets-v9"
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
      </RootStyle>
    </Container>
  );
}
