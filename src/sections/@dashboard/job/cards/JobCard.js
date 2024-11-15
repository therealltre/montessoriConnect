import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Box, Card, Avatar, Divider, Typography, IconButton } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
// import { fShortenNumber } from '../../../../utils/formatNumber';
// components
// import SocialsButton from '../../../../components/SocialsButton';
import { useRouter } from 'next/router';
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      height: ${theme.spacing(8)};
      width: ${theme.spacing(8)};
`
);

// ----------------------------------------------------------------------

JobCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function JobCard({ post }) {
  const { companyName, employment, jobtitle, logoUrl, candidateNumber, postedDate, seniority } = post;
  const { push } = useRouter();

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.job.details(paramCase(id)));
  };

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box p={3} display="flex" alignItems="flex-start" justifyContent="space-between">
        <AvatarWrapper src={logoUrl} variant="rounded" />
        <IconButton color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: 'start',
          ml: 3,
          cursor: 'pointer',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
        onClick={(e) => {
          e.preventDefault();
          handleEditRow(post.jobtitle);
        }}
      >
        {jobtitle}
      </Typography>

      <Typography variant="subtitle2" sx={{ textAlign: 'start', ml: 3, color: 'text.secondary' }}>
        {companyName}
      </Typography>

      <Typography variant="body2" sx={{ textAlign: 'start', ml: 3, color: 'text.secondary' }}>
        Posted Date: {postedDate}
      </Typography>

      <Box
        sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'center', color: 'color.primary' }}
        display={'flex'}
        gap={1}
      >
        <Iconify icon={'mage:users-fill'} width={16} height={16} color={'primary'} />
        <Typography variant="body2" color={'primary'}>
          {candidateNumber} candidates
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ py: 3, px: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Box display={'flex'} gap={1} mx={'auto'}>
          <Iconify icon={'heroicons-outline:chart-bar'} width={16} height={16} />

          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Experience: {seniority}
          </Typography>
          {/* <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography> */}
        </Box>

        <Box display={'flex'} gap={1} mx={'auto'}>
          <Iconify icon="f7:clock-fill" width={16} height={16} sx={{ color: 'primary' }} />
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            {employment}
          </Typography>
          {/* <Typography variant="subtitle1">{fShortenNumber(following)}</Typography> */}
        </Box>

        {/* <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Total Post
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPost)}</Typography>
        </div> */}
      </Box>
    </Card>
  );
}