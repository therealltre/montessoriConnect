import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import StudentNewEditForm from '../../../../sections/@teacher/student/StudentNewEditForm';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';


// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { name } = query;
  const isMountedRef = useIsMountedRef();

    const [students, setStudents] = useState([]);

  const getStudents = useCallback(async () => {
    try {
      const response = await axios.get('/api/students');

      if (isMountedRef.current) {
        setStudents(response.data.students);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);


  const currentUser = students.find((student) => paramCase(student.displayName) === name);
  // const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="Student: Edit student">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit student"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Student', href: PATH_TEACHER.student.list },
            { name: capitalCase(name) },
          ]}
        />

        <StudentNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}
