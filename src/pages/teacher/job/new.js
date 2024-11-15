// @mui
import { Container } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
// import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import JobNewEditForm from '../../../sections/@teacher/job/JobNewEditForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Job: Post a new job">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post a new job"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Job', href: PATH_TEACHER.job.cards },
            { name: 'New job' },
          ]}
        />
        <JobNewEditForm />
      </Container>
    </Page>
  );
}
