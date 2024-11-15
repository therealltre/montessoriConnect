import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Card, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm, LoginTeacherForm } from '../../sections/auth/login';
import { PATH_AFTER_LOGIN, PATH_AFTER_TEACHER_LOGIN } from '../../config';
import { useRouter } from 'next/router';
import RoleBasedGuard from '../../guards/RoleBasedGuard';

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
  // const { method } = useAuth();
  const [value, setValue] = useState(0);
  const router = useRouter(); // Use useRouter hook

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Redirect based on the selected tab
    // if (newValue === 0) {
    //   router.push(PATH_AFTER_LOGIN);
    // } else if (newValue === 1) {
    //   router.push(PATH_AFTER_TEACHER_LOGIN);
    // }
  };

  return (
    <GuestGuard>
      {/* <RoleBasedGuard accessibleRoles={['school', 'teacher']}>  */}
      <Container maxWidth="2xl">
        <Page title="Login">
          <RootStyle>
            <HeaderStyle>
              <Logo />
              {smUp && (
                <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                  Don&apos;t have an account? {''}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )}
            </HeaderStyle>

            {mdUp && (
              <SectionStyle>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                  Hi, Welcome Back
                </Typography>
                <Image
                  visibleByDefault
                  disabledEffect
                  src="/assets/illustrations/illustration_login_new.png"
                  alt="login"
                />
              </SectionStyle>
            )}

            <Container maxWidth="sm">
              <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      Sign in to MontessoriConnect
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                  </Box>
                </Stack>

                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  sx={{ mb: 3 }}
                >
                  {/* <Tab label="Admin" /> */}
                  <Tab label="School" />
                  <Tab label="Teacher" />
                </Tabs>

                {value === 0 && <LoginForm />}
                {value === 1 && <LoginTeacherForm />}

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
    </GuestGuard>
    // {/* </RoleBasedGuard> */}
  );
}
