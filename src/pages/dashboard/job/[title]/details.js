// @mui
import { Box, Button, Container, IconButton, Tab, Tabs, Tooltip, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
// import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import JobContent from '../../../../sections/@dashboard/job/JobContent';
import { useRouter } from 'next/router';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { paramCase } from 'change-case';
import Iconify from '../../../../components/Iconify';
import CandidatesContent from '../../../../sections/@dashboard/job/CandidatesContent';
import { _userFollowers } from '../../../../(_mock)';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  const { push, query } = useRouter();

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

  const handleEdit = () => {
    push(PATH_DASHBOARD.job.edit(paramCase(title)));
  };



  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Page title="Job: Post a new job">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<Iconify icon="weui:back-filled" />}
            href={PATH_DASHBOARD.job.cards}
            sx={{ mb: 2 }}
          >
            Back
          </Button>

          <Button
            sx={{ display: 'flex', direction: 'row', alignItems: 'center', mb: 2 }}
            variant="outlined"
            onClick={handleEdit}
          >
            <Tooltip title="Edit">
              <IconButton>
                <Iconify icon={'eva:edit-fill'} sx={{ color: 'primary.main' }} />
              </IconButton>
            </Tooltip>
            <Typography>Edit Job</Typography>
          </Button>
        </Box>

        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" sx={{ marginBottom: 2 }}>
          <Tab label="Job Content" value="jobContent" />
          <Tab label="Candidates" value="candidates" />
        </Tabs>

        <Box>
          {selectedTab === 'jobContent' && <JobContent currentJob={currentJob} />}
          {selectedTab === 'candidates' && <CandidatesContent followers={_userFollowers} />}
        </Box>
      </Container>
    </Page>
  );
}
