// @mui
import { Container, Box } from '@mui/material';
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
import { JobCard } from '../../../sections/@teacher/job/cards';
import { useCallback, useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

JobCards.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobCards() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [jobs, setJobs] = useState([]);

  const getJobs = useCallback(async () => {
    try {
      const response = await axios.get('/api/jobs');

      if (isMountedRef.current) {
        setJobs(response.data.jobs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <Page title="Job: Cards">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Jobs List"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            // { name: 'Job', href: PATH_DASHBOARD.job.root },
            { name: 'Jobs' },
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
          {jobs.map((job) => (
            <JobCard key={job.id} post={job} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
