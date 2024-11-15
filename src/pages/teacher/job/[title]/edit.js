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
import JobNewEditForm from '../../../../sections/@teacher/job/JobNewEditForm';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

JobEdit.getLayout = function getLayout(page) {
  return <Layout variant="teacher">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { title } = query;
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

  const currentJob = jobs.find((job) => paramCase(job.jobtitle) === title);

  return (
    <Page title="Job: Edit job">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit job"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Jobs', href: PATH_TEACHER.job.cards },
            { name: capitalCase(title) },
          ]}
        />

        <JobNewEditForm isEdit currentJob={currentJob} />
      </Container>
    </Page>
  );
}
