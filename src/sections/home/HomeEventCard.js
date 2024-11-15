import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import { PAGE_EVENTS } from '../../routes/paths';
import { useRouter } from 'next/router';
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

HomeEventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default function HomeEventCard({ event }) {
  const { date, cover, title, description } = event;
  const { push } = useRouter();

  const handleEditRow = (id) => {
    push(PAGE_EVENTS.events.details(paramCase(id)));
  };

  // Extract month and day
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString('default', { month: 'short' }); // e.g., 'Aug'
  const day = eventDate.getDate(); // e.g., 6

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={cover} alt={cover} ratio="21/9" />
      </Box>

      <Stack>
        <Grid container direction={'row'} alignItems={'center'}>
          <Grid item xs={12} lg={3} direction={'column-reverse'}>
            {/* Date section -----------------------------------------*/}
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
              {month}
            </Typography>
            <Typography variant="h3" sx={{ color: 'text.secondary' }}>
              {day}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9} textAlign={{ sm: 'center', md: 'start' }}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 3, cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              onClick={(e) => {
                e.preventDefault();
                handleEditRow(event.title);
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
                mr: 1,
                ml: 1,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2,
              }}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
