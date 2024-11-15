// @mui
import { Container, Box, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
//next
import NextLink from 'next/link';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { useCallback, useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { EventCard } from '../../../sections/@dashboard/events/cards';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

EventCards.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EventCards() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [events, setEvents] = useState([]);

  const getEvents = useCallback(async () => {
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
    getEvents();
  }, [getEvents]);

  return (
    <Page title="Events: Cards">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Events List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'Job', href: PATH_DASHBOARD.job.root },
            { name: 'Events' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.events.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Event
              </Button>
            </NextLink>
          }
        />

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
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
