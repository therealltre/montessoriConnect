// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// _mock_
import { _invoices } from '../../../../(_mock)';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../../sections/@teacher/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceEdit.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Invoice: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            { name: 'Invoices', href: PATH_TEACHER.invoice.list },
            { name: currentInvoice?.invoiceNumber || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </Page>
  );
}
