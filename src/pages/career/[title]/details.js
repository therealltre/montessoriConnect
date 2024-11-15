// @mui
import { styled } from '@mui/material/styles';

import { Button, Container, Tab, Tabs } from '@mui/material';
// routes
import { PAGE_CAREER } from '../../../routes/paths';
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
import { JobContent } from '../../../sections/career';
import { MotionViewport } from '../../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

JobDetails.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobDetails() {
  const { query } = useRouter();

  const { title } = query;

  const isMountedRef = useIsMountedRef();

  const [jobs, setJobs] = useState([]);

  const [selectedTab, setSelectedTab] = useState('jobContent'); // State for managing the selected tab

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

  const currentJob = jobs.find((job) => paramCase(job.jobtitle) === title);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container component={MotionViewport} mt={5} mb={10}>
      <RootStyle>
        <Container component={MotionViewport} sx={{ textAlign: 'start' }}>
          <Page title="Job: Details">
            <Button
              size="medium"
              startIcon={<Iconify icon="weui:back-filled" />}
              href={PAGE_CAREER.root}
              sx={{ mb: 2 }}
            >
              Back
            </Button>

            <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" sx={{ marginBottom: 2 }}>
              <Tab label="Job Details" value="jobContent" />
            </Tabs>
          </Page>
        </Container>

        <JobContent currentJob={currentJob} />
      </RootStyle>
    </Container>
  );
}
