// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Stack>
          <ProfileAbout />
        </Stack>
      </Grid>

      {/* <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid> */}
    </Grid>
  );
}
