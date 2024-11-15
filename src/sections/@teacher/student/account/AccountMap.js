import '../../../../utils/mapboxgl';
import MapGL from 'react-map-gl';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { MAPBOX_API } from '../../../../config';
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../../../components/map';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

export default function AccountMap() {
  const { enqueueSnackbar } = useSnackbar();
  const [tooltip, setTooltip] = useState(null);
  const { register, handleSubmit } = useForm();
  const [marker, setMarker] = useState(null);
  const tooltipRef = useRef();

  const [viewport, setViewport] = useState({
    latitude: 12,
    longitude: 42,
    zoom: 2,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltip(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          data.address
        )}.json?access_token=${MAPBOX_API}`
      );
      const result = await response.json();
      const [longitude, latitude] = result.features[0].center;
  
      const newMarker = { latitude, longitude, address: data.address };
  
      setMarker(newMarker);
      setViewport({ ...viewport, latitude, longitude, zoom: 14 });
  
      // Save the location in local storage
      localStorage.setItem('savedLocation', JSON.stringify(newMarker));
      // or use sessionStorage instead
      // sessionStorage.setItem('savedLocation', JSON.stringify(newMarker));
  
      enqueueSnackbar('Address saved successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to save address.', { variant: 'error' });
    }
  };
  
  // To retrieve the location from storage when needed
  useEffect(() => {
    const storedLocation = localStorage.getItem('savedLocation');
    // or use sessionStorage instead
    // const storedLocation = sessionStorage.getItem('savedLocation');
  
    if (storedLocation) {
      const { latitude, longitude, address } = JSON.parse(storedLocation);
      setMarker({ latitude, longitude, address });
      setViewport({ ...viewport, latitude, longitude, zoom: 14 });
    }
  }, []);
  

  return (
    <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <TextField fullWidth label="Enter Address" {...register('address', { required: true })} variant="outlined" />
          <LoadingButton type="submit" variant="contained" >
            Save Address
          </LoadingButton>
        </Stack>
      </form>
      <RootStyle>
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

          {marker && (
            <MapControlMarker
              latitude={marker.latitude}
              longitude={marker.longitude}
              onClick={() => setTooltip(marker)}
            />
          )}

          {tooltip && (
            <MapControlPopup
              longitude={tooltip.longitude}
              latitude={tooltip.latitude}
              onClose={() => setTooltip(null)}
              sx={{
                '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
                '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
              }}
            >
              <div ref={tooltipRef}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Saved Address
                </Typography>
                <Typography component="p" variant="caption">
                  {tooltip.address}
                </Typography>
              </div>
            </MapControlPopup>
          )}
        </MapGL>
      </RootStyle>
    </Card>
  );
}
