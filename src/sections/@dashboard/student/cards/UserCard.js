import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
// import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
// import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';
import { useRouter } from 'next/router';
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user }) {
  const { displayName, cover, jobtitle, imageUrl, } = user;
  const { push } = useRouter();

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.student.edit(paramCase(id)));
  };

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={displayName}
          src={imageUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        {/* <OverlayStyle /> */}
        <Image src={cover} alt={cover} ratio="21/9" />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ mt: 6, cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        onClick={(e) => {
          e.preventDefault();
          handleEditRow(user.displayName);
        }}
      >
        {displayName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
        {jobtitle}
      </Typography>

      {/* <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack> */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Follower
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Following
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Total Post
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPost)}</Typography>
        </div>
      </Box> */}
    </Card>
  );
}
