// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
// import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import { EventNewEditForm } from '../../../sections/@dashboard/events';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Job: Post a new event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post a new event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.events.cards },
            { name: 'New Event' },
          ]}
        />
        <EventNewEditForm />
      </Container>
    </Page>
  );
}
