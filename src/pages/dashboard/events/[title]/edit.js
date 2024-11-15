import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { EventNewEditForm } from '../../../../sections/@dashboard/events';

// ----------------------------------------------------------------------

JobEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

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

  return (
    <Page title="Event: Edit event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.events.cards },
            { name: capitalCase(title) },
          ]}
        />

        <EventNewEditForm isEdit currentEvent={currentEvent} />
      </Container>
    </Page>
  );
}
