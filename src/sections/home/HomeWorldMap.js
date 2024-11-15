import PropTypes from 'prop-types'; // Add this import
import '../../utils/mapboxgl';
import MapGL from 'react-map-gl';
import { useCallback, useEffect, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { _mapContact } from '../../(_mock)';
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
import Image from 'next/image';
import { useRouter } from 'next/router';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import axios from '../../utils/axios';
import SimpleBar from '../../components/simplebar';

const CARDS = [
  {
    icon: '/assets/icons/ic_schoolbuilding.svg',
    title: 'Looking for a',
    description: 'Montessori School',
    href: '/schools',
  },
  {
    icon: '/assets/icons/ic_event.svg',
    title: 'Join our',
    description: 'Training Sessions',
    href: '/events',
  },
  {
    icon: '/assets/icons/ic_briefcase.svg',
    title: 'Seeking job opportunities in a',
    description: 'Montessori School',
    href: '/career',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  height: 700,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  // backgroundImage: `linear-gradient(135deg,
  //         ${theme.palette.primary.main} 0%,
  //         ${theme.palette.primary.dark} 100%)`,
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

const CardsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  maxHeight: 700,
  height: '100%',
  marginLeft: theme.spacing(2),
  // backgroundColor: theme.palette.primary.main
}));

const CardStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

const RedirectCard = ({ icon, title, description, bgColor, href }) => {
  RedirectCard.propTypes = {
    icon: PropTypes.string.isRequired, // Added validation for icon
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    href: PropTypes.string.isRequired,
  };

  const theme = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };
  return (
    <Card onClick={handleClick}>
      <CardContent style={{ backgroundColor: bgColor || 'white' }} sx={{ width: 368, height: 113, cursor: 'pointer' }}>
        <Box display="flex" alignItems="center" justifyContent={'space-between'} gap={2}>
          <Box>
            <Image src={icon} alt="icon" width={40} height={40} />
          </Box>
          <Stack style={{ color: bgColor ? theme.palette.common.white : 'inherit' }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="h5">{description}</Typography>
          </Stack>
          <Iconify icon="ion:chevron-forward-outline" color={bgColor ? '#fff' : 'inherit'} width={24} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ContactMap() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
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
    <Container component={MotionViewport} mt={15}>
      <RootStyle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
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
          </Grid>

          <Grid item xs={12} md={4}>
            {/* limit this to 8 schools and add more btn -> /schools  */}
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
      </RootStyle>
    </Container>
  );
}
