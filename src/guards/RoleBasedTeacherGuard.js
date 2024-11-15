import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

RoleBasedTeacherGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
};

const useCurrentRole = () => {
  // Logic here to get current user role
  // For now, we are using 'school' as a hardcoded role. Replace this with your actual role retrieval logic.
  const role = 'teacher'; 
  return role;
};

export default function RoleBasedTeacherGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    // If the current role is not in the accessibleRoles, redirect to login
    if (!accessibleRoles.includes(currentRole)) {
      const timer = setTimeout(() => {
        router.push('/auth/login'); // Redirect to login after showing the alert
      }, 3000); // Wait for 3 seconds before redirecting

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [currentRole, accessibleRoles, router]);

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page. You will be redirected to the login page.
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
