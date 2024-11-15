import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_TEACHER } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_TEACHER.student.root) {
      push(PATH_TEACHER.student.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
