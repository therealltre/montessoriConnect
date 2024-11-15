// @mui
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import { useRouter } from 'next/router';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { capitalCase, paramCase } from 'change-case';
import Iconify from '../../../../components/Iconify';
import { EventContent } from '../../../../sections/events';
import useSettings from '../../../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

EventDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EventDetails() {
  const { themeStretch } = useSettings();
  const { push, query } = useRouter();

  const { title } = query;

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

  const currentEvent = events.find((event) => paramCase(event.title) === title);

  // Handle edit button click
  const handleEdit = () => {
    // Assuming you have an edit page for events, e.g., /dashboard/events/[title]/edit
    // Redirect to the edit page with the current event's ID or title
    if (currentEvent) {
      push(`${PATH_DASHBOARD.events.root}/${paramCase(currentEvent.title)}/edit`);
    }
  };

  return (
    <Page title="Event: Post a new event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Events Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.events.root },
            { name: capitalCase(title) },
          ]}
        />

        <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<Iconify icon="weui:back-filled" />}
            href={PATH_DASHBOARD.events.cards}
            sx={{ mb: 2 }}
          >
            Back
          </Button>

          <Button
            sx={{ display: 'flex', direction: 'row', alignItems: 'center', mb: 2 }}
            variant="outlined"
            onClick={handleEdit}
          >
            <Tooltip title="Edit">
              <IconButton>
                <Iconify icon={'eva:edit-fill'} sx={{ color: 'primary.main' }} />
              </IconButton>
            </Tooltip>
            <Typography>Edit Event</Typography>
          </Button>
        </Box>

        <EventContent currentEvent={currentEvent} />
      </Container>
    </Page>
  );
}
