// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_TEACHER } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../(_mock)';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import Invoice from '../../../../sections/@teacher/invoice/details';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page) {
  return <Layout variant='teacher'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_TEACHER.root },
            {
              name: 'Invoices',
              href: PATH_TEACHER.invoice.root,
            },
            { name: invoice?.invoiceNumber || '' },
          ]}
        />

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}
