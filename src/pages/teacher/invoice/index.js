import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_TEACHER } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_TEACHER.invoice.root) {
      push(PATH_TEACHER.invoice.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
