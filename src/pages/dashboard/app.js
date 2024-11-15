// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AppWelcome,
  AppMembers,
  AppChart,
  AppWidgetSummary,
  AppCurrentDownload,
  AppSchoolsMap,
} from '../../sections/@dashboard/general/app';
// import { InvoiceTableRow } from '../../sections/@dashboard/invoice/list';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Overview">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppMembers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Students"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Teachers"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Parents"
              percent={-0.1}
              total={978}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppChart />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppSchoolsMap />
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <AppSchoolMap />
          </Grid> */}


          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
