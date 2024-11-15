// @mui
import { styled } from '@mui/material/styles';

import { Button, Container } from '@mui/material';
// routes
import { PAGE_EVENTS } from '../../../routes/paths';
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
import { MotionViewport } from '../../../components/animate';
import { EventContent } from '../../../sections/events';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

EventDetails.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EventDetails() {
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
    <Container component={MotionViewport} mt={5} mb={10}>
      <RootStyle>
        <Container component={MotionViewport} sx={{ textAlign: 'start' }}>
          <Page title="Event: Details">
            <Button
              size="medium"
              startIcon={<Iconify icon="weui:back-filled" />}
              href={PAGE_EVENTS.root}
              sx={{ mb: 2 }}
            >
              Back
            </Button>
          </Page>
        </Container>

        <EventContent currentEvent={currentEvent} />
      </RootStyle>
    </Container>
  );
}
