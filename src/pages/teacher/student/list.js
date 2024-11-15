// pages/index.js
import React from 'react';
import Layout from '../../../layouts';
import { UserTableRow } from '../../../sections/@teacher/student/list';

import { Container } from '@mui/material';
import useSettings from '../../../hooks/useSettings';

UserList.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

export default function UserList() {
  const { themeStretch } = useSettings();
  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <UserTableRow />
    </Container>
  );
}
