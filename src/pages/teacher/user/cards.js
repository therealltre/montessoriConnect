// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// import { _userCards } from '../../../(_mock)';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserCard } from '../../../sections/@teacher/user/cards';
import { useCallback, useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

UserCards.getLayout = function getLayout(page) {
  return <Layout variant="teacher">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/students');

      if (isMountedRef.current) {
        setUsers(response.data.students);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Page title="Student: Cards">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Student Cards"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'User', href: PATH_TEACHER.student.root },
            { name: 'Cards' },
          ]}
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
          {users.map((student) => (
            <UserCard key={student.id} user={student} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
