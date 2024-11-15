import PropTypes from 'prop-types';
// guards
// import AuthGuard from '../guards/AuthGuard';
// components
import MainLayout from './main';
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';
import AuthGuard from '../guards/AuthGuard';
import TeacherLayout from './teacher';
import AdminLayout from './admin';
import RoleBasedGuardAdmin from '../guards/RoleBasedGuardAdmin';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly', 'teacher', 'admin']),
};

export default function Layout({ variant = 'dashboard', children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }

  if (variant === 'admin') {
    return (
      <RoleBasedGuardAdmin>
        <AdminLayout> {children} </AdminLayout>
      </RoleBasedGuardAdmin>
    );
  }

  if (variant === 'teacher') {
    return (
      <AuthGuard>
        <TeacherLayout> {children} </TeacherLayout>
      </AuthGuard>
    );
  }

  return (
    <RoleBasedGuard accessibleRoles={'school'}>
      <DashboardLayout> {children} </DashboardLayout>
    </RoleBasedGuard>
  );
}
