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
import StudentNewEditForm from '../../../sections/@teacher/student/StudentNewEditForm';
// sections

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Student: Add a new student">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new student"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Student', href: PATH_TEACHER.student.list },
            { name: 'New student' },
          ]}
        />
        <StudentNewEditForm />
      </Container>
    </Page>
  );
}
