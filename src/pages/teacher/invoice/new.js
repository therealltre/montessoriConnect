// @mui
import { Container } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@teacher/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Invoices: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new invoice"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Invoices', href: PATH_TEACHER.invoice.list },
            { name: 'New invoice' },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
