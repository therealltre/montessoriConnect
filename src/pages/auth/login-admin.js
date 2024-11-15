// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link,  Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
// import GuestGuard from '../../guards/GuestGuard';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
import { LoginAdminForm } from '../../sections/auth/login';
import RoleBasedGuardAdmin from '../../guards/RoleBasedGuardAdmin';

// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <RoleBasedGuardAdmin accessibleRoles={['admin']}>
      <Container maxWidth="2xl">
        <Page title="Admin Login">
          <RootStyle>
            <HeaderStyle>
              <Logo />
              {/* {smUp && (
                <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                  Don&apos;t have an account? {''}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )} */}
            </HeaderStyle>

            {mdUp && (
              <SectionStyle>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                  Hi, Welcome Back
                </Typography>
                <Image
                  visibleByDefault
                  disabledEffect
                  src="/assets/illustrations/illustration_login_admin.png"
                  alt="login"
                />
              </SectionStyle>
            )}

            <Container maxWidth="sm">
              <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      Sign in to MontessoriConnect Admin
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                  </Box>
                </Stack>
                {/* 
              <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
              </Alert> */}

                <LoginAdminForm />
                {/* {method === 'JWT' && <LoginForm role={value} />} */}

                {!smUp && (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don&apos;t have an account?{' '}
                    <NextLink href={PATH_AUTH.register} passHref>
                      <Link variant="subtitle2">Get started</Link>
                    </NextLink>
                  </Typography>
                )}
              </ContentStyle>
            </Container>
          </RootStyle>
        </Page>
      </Container>
    </RoleBasedGuardAdmin>
  );
}
