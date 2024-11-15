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
  IconButton,
  Grid,
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
import SchoolHero from '../sections/schools/SchoolHero';
import SchoolCard from '../sections/schools/SchoolCards';
import SchoolWorldMap from '../sections/schools/SchoolWorldMap';
import SimpleBar from '../components/simplebar';

import { HomeAboutMontessoriConnect, HomeBecomeMemeber, HomeMCInstagram } from '../sections/home';

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

SchoolPage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SchoolPage() {
  const isMountedRef = useIsMountedRef();
  const [schools, setSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [ageRange, setAgeRange] = useState([]);
  const [status, setStatus] = useState([]);
  const [schoolType, setSchoolType] = useState([]); // Array for school types

  const getSchools = useCallback(async () => {
    try {
      const response = await axios.get('/api/schools');
      if (isMountedRef.current) {
        setSchools(response.data.schools);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSchools();
  }, [getSchools]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleAgeRangeChange = (event) => {
    const { value } = event.target;
    setAgeRange((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setStatus((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSchoolTypeChange = (event) => {
    const { value } = event.target;
    setSchoolType((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const filteredSchools = schools.filter((school) => {
    // Search query filtering
    const matchesSearch = school.schoolName.toLowerCase().includes(searchQuery.toLowerCase());

    // Age range filtering
    const matchesAge = ageRange.length > 0 ? ageRange.includes(school.age) : true;

    // Status filtering
    const matchesStatus =
      status.length > 0
        ? status.includes(school.member ? 'Members' : 'Non-members') || status.includes('All Schools')
        : true;

    // School type filtering (adjusted to match the string values)
    const matchesSchoolType =
      schoolType.length > 0
        ? schoolType.includes(school.isPrivate ? 'Private' : 'Public') // schoolType is either 'Private' or 'Public'
        : true;

    return matchesSearch && matchesAge && matchesStatus && matchesSchoolType;
  });

  return (
    <Page title="Find Schools">
      <RootStyle>
        <SchoolHero />

        <Container sx={{ mt: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              fullWidth
              label="Search schools"
              placeholder="Ex. The Family School"
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
            <IconButton onClick={handleFilterToggle} sx={{ ml: 2 }}>
              <Typography>Filter</Typography>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Box>

          {/* Filter Drawer ------------------------------------------------- */}
          <FilterDrawer anchor="right" open={filterOpen} onClose={handleFilterToggle}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Age
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ageRange.includes('Infant & Toddler')}
                        value="Infant & Toddler"
                        onChange={handleAgeRangeChange}
                      />
                    }
                    label="Birth - 3 (Infant & Toddler)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ageRange.includes('Early Childhood')}
                        value="Early Childhood"
                        onChange={handleAgeRangeChange}
                      />
                    }
                    label="2 ½ - 6 (Early Childhood)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ageRange.includes('Elementary')}
                        value="Elementary"
                        onChange={handleAgeRangeChange}
                      />
                    }
                    label="6 - 12 (Elementary)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ageRange.includes('Secondary')}
                        value="Secondary"
                        onChange={handleAgeRangeChange}
                      />
                    }
                    label="12 - 18 (Secondary)"
                  />
                </FormGroup>
              </FormControl>

              <Divider sx={{ mb: 5 }} />

              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  School Status
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={status.includes('Members')} value="Members" onChange={handleStatusChange} />
                    }
                    label="Members"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={status.includes('Non-members')}
                        value="Non-members"
                        onChange={handleStatusChange}
                      />
                    }
                    label="Non-members"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={status.includes('All Schools')}
                        value="All Schools"
                        onChange={handleStatusChange}
                      />
                    }
                    label="All Schools"
                  />
                </FormGroup>
              </FormControl>

              <Divider sx={{ mb: 5 }} />

              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  School Type
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={schoolType.includes('Private')}
                        value="Private"
                        onChange={handleSchoolTypeChange}
                      />
                    }
                    label="Private"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={schoolType.includes('Public')}
                        value="Public"
                        onChange={handleSchoolTypeChange}
                      />
                    }
                    label="Public"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </FilterDrawer>

          {/* School listing ------------------------------------------------- */}
          <Grid container spacing={1}>
            {/* SchoolWorldMap taking lg=8 */}
            <Grid item xs={12} lg={7}>
              <SchoolWorldMap />
            </Grid>

            {/* SchoolCards taking lg=4 */}
            <Grid item xs={12} lg={5} sx={{ height: '100%', width: '100%', mb: 10 }}>
              <SimpleBar style={{ maxHeight: 700 }}>
                {filteredSchools.length === 0 ? (
                  <Box sx={{ textAlign: 'center', my: 10 }}>
                    <Iconify icon="eva:close-circle-outline" width={64} height={64} color="text.disabled" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Sorry, no schools match that description
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: 3,
                    }}
                  >
                    {filteredSchools.map((school) => (
                      <SchoolCard key={school.id} school={school} />
                    ))}
                  </Box>
                )}
              </SimpleBar>
            </Grid>
          </Grid>
        </Container>

        <HomeAboutMontessoriConnect />

        <HomeBecomeMemeber />
        <HomeMCInstagram />
      </RootStyle>
    </Page>
  );
}
