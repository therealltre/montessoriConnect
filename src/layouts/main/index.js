import PropTypes from 'prop-types';

// @mui
import { Box, Stack } from '@mui/material';
// components
// import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainLayout({ children }) {
  // const { pathname } = useRouter();

  // const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {/* {!isHome ? ( */}

      <MainFooter />
      {/* ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © All rights reserved &nbsp;
              <Link href="#">MontessoriConnect</Link>
            </Typography>
          </Container>
        </Box>
      )} */}
    </Stack>
  );
}
