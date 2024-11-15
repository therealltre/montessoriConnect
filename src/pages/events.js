// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Drawer,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import useIsMountedRef from '../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../utils/axios';
import Iconify from '../components/Iconify';
import HomeEventCard from '../sections/home/HomeEventCard';
import EventHero from '../sections/events/EventHero';
import SimpleBar from '../components/simplebar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  width: 250,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 250,
    boxSizing: 'border-box',
  },
}));

// ----------------------------------------------------------------------

Career.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Career() {
  const isMountedRef = useIsMountedRef();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [employmentType, setEmploymentType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);

  const getJobs = useCallback(async () => {
    try {
      const response = await axios.get('/api/events');

      if (isMountedRef.current) {
        setJobs(response.data.events);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleEmploymentTypeChange = (event) => {
    const { value } = event.target;
    setEmploymentType((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleExperienceLevelChange = (event) => {
    const { value } = event.target;
    setExperienceLevel((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const filteredJobs = jobs.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()));
  // .filter((event) => (employmentType.length > 0 ? employmentType.includes(job.employment) : true))
  // .filter((event) => (experienceLevel.length > 0 ? experienceLevel.includes(job.seniority) : true));

  console.log('Employment Types Selected:', employmentType);
  console.log('Experience Levels Selected:', experienceLevel);

  return (
    <Page title="Events">
      <RootStyle>
        <EventHero />

        <Container sx={{ my: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              fullWidth
              label="Search events"
              placeholder="Search events"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
            {/* <IconButton onClick={handleFilterToggle} sx={{ ml: 2 }}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton> */}
          </Box>

          {/* filter Drawer ------------------------------------------------- */}
          <FilterDrawer anchor="right" open={filterOpen} onClose={handleFilterToggle}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Employment Type
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={employmentType.includes('Full Time')}
                        value="Full Time"
                        onChange={handleEmploymentTypeChange}
                      />
                    }
                    label="Full-Time"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={employmentType.includes('Part Time')}
                        value="Part Time"
                        onChange={handleEmploymentTypeChange}
                      />
                    }
                    label="Part-Time"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={employmentType.includes('Contract')}
                        value="Contract"
                        onChange={handleEmploymentTypeChange}
                      />
                    }
                    label="Contract"
                  />
                </FormGroup>
              </FormControl>

              <Divider sx={{ mb: 5 }} />

              {/* ********* ********************************* */}
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Experience Level
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={experienceLevel.includes('Junior')}
                        value="Junior"
                        onChange={handleExperienceLevelChange}
                      />
                    }
                    label="Junior"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={experienceLevel.includes('Mid')}
                        value="Mid"
                        onChange={handleExperienceLevelChange}
                      />
                    }
                    label="Mid"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={experienceLevel.includes('Senior')}
                        value="Senior"
                        onChange={handleExperienceLevelChange}
                      />
                    }
                    label="Senior"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </FilterDrawer>

          {/* Jobs listing ------------------------------------------------- */}
          <SimpleBar style={{ maxHeight: 700 }}>
            {filteredJobs.length === 0 ? (
              <Box sx={{ textAlign: 'center', my: 10 }}>
                <Iconify icon="eva:close-circle-outline" width={64} height={64} color="text.disabled" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Sorry, no job matches that description
                </Typography>
              </Box>
            ) : (
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
                {filteredJobs.map((event) => (
                  <HomeEventCard key={event.id} event={event} />
                ))}
              </Box>
            )}
          </SimpleBar>
        </Container>
      </RootStyle>
    </Page>
  );
}
