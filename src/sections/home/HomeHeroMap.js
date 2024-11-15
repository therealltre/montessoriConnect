// import { m } from 'framer-motion';
import '../../utils/mapboxgl';
import MapGL from 'react-map-gl';
// @mui
import { styled } from '@mui/material/styles';
import { Box, useTheme, Typography, Avatar,  useMediaQuery } from '@mui/material';
// import { Button, Box, useTheme, Typography, Stack, Avatar, Grid, useMediaQuery } from '@mui/material';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// components
// import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer } from '../../components/animate';
// import { MotionContainer, varFade } from '../../components/animate';
import { MAPBOX_API } from '../../config';
import {
  // MapControlFullscreen,
  MapControlMarker,
  // MapControlNavigation,
  MapControlPopup,
  MapControlScale,
} from '../../components/map';
import { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import axios from '../../utils/axios';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
const mapaccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;

const RootStyle = styled('div')(({ theme }) => ({
  // maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(0),
  paddingTop: theme.spacing(10),
  borderRadius: theme.shape.borderRadius * 2,
  // [theme.breakpoints.up('md')]: {
  //   display: 'flex',
  //   maxWidth: '100%',
  //   paddingBottom: 0,
  //   alignItems: 'center',
  // },
}));

// ----------------------------------------------------------------------

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
            height: ${theme.spacing(8)};
            width: ${theme.spacing(8)};
      `
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
  });
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

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));


  return (
    <RootStyle>
      <MotionContainer>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MapGL
            {...viewport}
            onViewportChange={setViewport}
            mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxApiAccessToken={mapaccessToken}
            width={isLargeScreen ? '1440px' : '100%'}
            height={isLargeScreen ? '600px' : '500px'} // Adjust height as needed
            scrollZoom={false} // Disable scroll to zoom
          >
            {/* <MapControlFullscreen /> */}
            <MapControlScale />
            {/* <MapControlNavigation /> */}

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
                  '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
                    borderTopColor: theme.palette.primary.main,
                  }, // Matches the tooltip arrow color
                  '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
                    borderBottomColor: theme.palette.primary.main,
                  },
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
        </Box>
      </MotionContainer>
    </RootStyle>
  );
}
