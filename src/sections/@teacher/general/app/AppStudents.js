import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _appAuthors } from '../../../../(_mock)';
// components
import Iconify from '../../../../components/Iconify';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------

export default function AppMembers() {
  const displayMember = orderBy(_appAuthors, ['favourite'], ['desc']);

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

  return (
    <Card>
      <CardHeader title="Parents" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {/* {events.slice(0, 6).map((event) => (
          <HomepassHref key={event.id} event={event} />
        ))} */}

        {students.slice(0, 4).map((student) => (
          <MemberItem key={student.id} user={student} />
        ))}

        {/* {displayMember.map((author, index) => (
          <MemberItem key={author.id} author={author} index={index} />
        ))} */}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

MemberItem.propTypes = {
  user: PropTypes.object.isRequired,

  // author: PropTypes.shape({
  //   avatar: PropTypes.string,
  //   favourite: PropTypes.number,
  //   name: PropTypes.string,
  // }),
  index: PropTypes.number,
};

// function MemberItem({ author, index }) {
function MemberItem({ user, index }) {
  const { displayName, parentName, role, imageUrl } = user;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={displayName} src={imageUrl} />
      {/* <Avatar alt={author.displayName} src={author.avatar} /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{parentName}</Typography>
        {/* <Typography variant="subtitle2">{author.name}</Typography> */}
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          {/* <Iconify icon={'eva:heart-fill'} sx={{ width: 16, height: 16, mr: 0.5 }} /> */}
          {displayName}{' '}({role}){/* {fShortenNumber(author.favourite)} */}
        </Typography>
      </Box>

      {/* <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
      </IconWrapperStyle> */}
    </Stack>
  );
}
