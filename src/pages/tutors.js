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
import SimpleBar from '../components/simplebar';
import { TutorHero } from '../sections/tutors';
import TutorCard from '../sections/tutors/TutorCard';

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
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

//   const handleFilterToggle = () => {
//     setFilterOpen(!filterOpen);
//   };

//   const handleEmploymentTypeChange = (event) => {
//     const { value } = event.target;
//     setEmploymentType((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
//   };

//   const handleExperienceLevelChange = (event) => {
//     const { value } = event.target;
//     setExperienceLevel((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
//   };

  const filteredTutors = tutors.filter((staff) =>
    staff.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // .filter((event) => (employmentType.length > 0 ? employmentType.includes(job.employment) : true))
  // .filter((event) => (experienceLevel.length > 0 ? experienceLevel.includes(job.seniority) : true));

  return (
    <Page title="Find Teachers">
      <RootStyle>
        <TutorHero />

        <Container sx={{ mt: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              fullWidth
              label="Search teachers"
              placeholder="Search teachers..."
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

          {/* School listing ------------------------------------------------- */}
          <Grid container spacing={3}>
            {/* SchoolCards taking lg=4 */}
            <Grid item xs={12} lg={12} sx={{ height: '100%', width: '100%', mb: 10 }}>
              <SimpleBar style={{ maxHeight: 580 }}>
                {filteredTutors.length === 0 ? (
                  <Box sx={{ textAlign: 'center', my: 10 }}>
                    <Iconify icon="eva:close-circle-outline" width={64} height={64} color="text.disabled" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Sorry, no tutor name matches that description
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 3,
                      gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)', // 1 columns for mobile (xs and up)
                        sm: 'repeat(2, 1fr)', // 2 columns for mobile (xs and up)
                        lg: 'repeat(3, 1fr)', // 3 columns for desktop (lg and up)
                      },
                    }}
                  >
                    {filteredTutors.map((staff) => (
                      <TutorCard key={staff.id} tutor={staff} />
                    ))}
                  </Box>
                )}
              </SimpleBar>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
