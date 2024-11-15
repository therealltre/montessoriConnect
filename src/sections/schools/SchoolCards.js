import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, Grid, Button, Chip } from '@mui/material';
import { PAGE_SCHOOLS } from '../../routes/paths';
import { useRouter } from 'next/router';
import { paramCase } from 'change-case';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ----------------------------------------------------------------------

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
          height: ${theme.spacing(8)};
          width: ${theme.spacing(8)};
    `
);

// Custom styles for positioning elements
const CardWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    padding: ${theme.spacing(3)};
  `
);

const BadgeWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    top: 0;
    right: 0;
    height: 30px; /* Fixed height of 28px */
    line-height: 30px; /* Ensures the text is vertically centered */
    display: inline-flex;
    align-items: center;
    border-radius: 0 8px 0 0; /* Rounded only at the top right corner */
    background-color: ${theme.palette.primary.main};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
    color: white;
    font-weight: medium;
  `
);

const ViewProfileButton = styled(Button)(
  ({ theme }) => `
    position: absolute;
    bottom: ${theme.spacing(2)};
    right: ${theme.spacing(2)};
  `
);

// ----------------------------------------------------------------------

SchoolCard.propTypes = {
  school: PropTypes.object.isRequired,
};

export default function SchoolCard({ school }) {
  const { schoolAddress, schoolName, logoUrl, age, numberOfStudents, summerProgram, memberParents, hiring, member } =
    school;

  const { push } = useRouter();

  const handleEditRow = (id) => {
    push(PAGE_SCHOOLS.schools.details(paramCase(id)));
  };

  return (
    <CardWrapper>
      {/* Member badge at the top right corner */}
      {member && (
        <BadgeWrapper>
          <Chip label="Member" color="primary" />
        </BadgeWrapper>
      )}

      <Grid container spacing={2} sx={{ mb: 1 }}>
        {/* School logo on the left */}
        <Grid item xs={12} lg={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AvatarWrapper src={logoUrl} variant="rounded" sx={{ width: 123, height: 70 }} />
          </Box>
        </Grid>

        {/* School content on the right */}
        <Grid item xs={12} lg={8}>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={(e) => {
              e.preventDefault();
              handleEditRow(school.schoolName);
            }}
          >
            {schoolName}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
            {schoolAddress}
          </Typography>

          <Box display={'flex'} flexDirection={'row'}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', mr: 1 }}>
              • Ages:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {age}
            </Typography>
          </Box>

          <Box display={'flex'} flexDirection={'row'}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', mr: 1 }}>
              • Number of students:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {numberOfStudents}
            </Typography>
          </Box>

          <Box display={'flex'} flexDirection={'row'}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', mr: 1 }}>
              • Summer Program:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {summerProgram}
            </Typography>
          </Box>

          <Box display={'flex'} flexDirection={'row'}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', mr: 1 }}>
              • Member parents:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {memberParents}
            </Typography>
          </Box>

          <Box display={'flex'} flexDirection={'row'}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', mr: 1 }}>
              • Member parents:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {memberParents}
            </Typography>
          </Box>

          {/* Conditionally render the Hiring text with a green circle */}
          {hiring && (
            <Box display="flex" alignItems="center" mt={1}>
              {/* Green circle */}
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'green',
                  marginRight: 1,
                }}
              />
              {/* Hiring text */}
              <Typography variant="body2" sx={{ color: 'green' }}>
                Hiring
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* View Profile button with right arrow */}
      <ViewProfileButton
        variant="outlined"
        endIcon={<ArrowForwardIcon />}
        onClick={(e) => {
          e.preventDefault();
          handleEditRow(school.schoolName);
        }}
      >
        View Profile
      </ViewProfileButton>
    </CardWrapper>
  );
}
