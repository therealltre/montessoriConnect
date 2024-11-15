// @mui
import { styled } from '@mui/material/styles';

import { Button, Container, Grid } from '@mui/material';
// routes
import { PAGE_TUTORS } from '../../../routes/paths';
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
// import { JobContent } from '../../../sections/career';
import { MotionViewport } from '../../../components/animate';
import { TutorInfo } from '../../../sections/tutors';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));



// ----------------------------------------------------------------------

TutorDetails.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TutorDetails() {
  const { query } = useRouter();

  const { title } = query;

  const isMountedRef = useIsMountedRef();

  const [tutors, setTutors] = useState([]);

  // const [selectedTab, setSelectedTab] = useState('schoolContent'); // State for managing the selected tab

  const getTutors = useCallback(async () => {
    try {
      const response = await axios.get('/api/staffs');

      if (isMountedRef.current) {
        setTutors(response.data.staffs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTutors();
  }, [getTutors]);

  const currentStaff = tutors.find((staff) => paramCase(staff.displayName) === title);

  // const handleChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };

  return (
    <Container component={MotionViewport} mt={5} mb={10}>
      <RootStyle>
        <Container component={MotionViewport} sx={{ textAlign: 'start' }}>
          <Page title="Teacher: Info">
            <Button
              size="medium"
              startIcon={<Iconify icon="weui:back-filled" />}
              href={PAGE_TUTORS.root}
              sx={{ mb: 2 }}
            >
              Back
            </Button>

            {/* <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" sx={{ marginBottom: 2 }}>
              <Tab label="School Details" value="schoolContent" />
            </Tabs> */}
          </Page>
        </Container>

        <Grid item xs={12} md={12}>
          <TutorInfo currentStaff={currentStaff} />
        </Grid>
      </RootStyle>
    </Container>
  );
}
