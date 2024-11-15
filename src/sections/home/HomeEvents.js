// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Stack, Button } from '@mui/material';
//framermotion
import { MotionViewport, varFade } from '../../components/animate';
import { m } from 'framer-motion';
// components
import HomeEventCard from './HomeEventCard';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../utils/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function HomeEvents() {
  const isMountedRef = useIsMountedRef();
  const [events, setEvents] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/events');

      if (isMountedRef.current) {
        setEvents(response.data.events);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'start',
            mb: { xs: 10, md: 5 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              MONTESSORICONNECT
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Stack direction={'row'} spacing={1} mb={10}>
              <Typography variant="h2">Upcoming</Typography>
              <Typography
                variant="h2"
                sx={{
                  backgroundcolor: 'primary',
                  backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Events
              </Typography>
            </Stack>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Box mb={5}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                }}
              >
                {events.slice(0, 6).map((event) => (
                  <HomeEventCard key={event.id} event={event} />
                ))}
              </Box>
            </Box>
          </m.div>
        </Box>
        <Button variant="contained" sx={{ width: 372, height: 48 }} href='/events'>
          See all
        </Button>
      </Container>
    </RootStyle>
  );
}
