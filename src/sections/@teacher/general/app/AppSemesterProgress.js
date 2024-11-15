import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// components
import ReactApexChart from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = '100%';

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  display: 'flex', // Add flexbox
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [60];

export default function AppSemesterProgress() {
  const theme = useTheme();

  const chartOptions = merge(
    {},
    {
      colors: [theme.palette.primary.dark],

      stroke: { colors: [theme.palette.background.paper] },
      // Disable legend to remove the "Series-1" text
      legend: {
        show: false, // Hide legend
      },

      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
          dataLabels: {
            name: {
              show: false, // Hide the name label (removes Series-1)
            },
            value: {
              show: true,
              fontSize: '16px',
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
    }
  );

  return (
    <Card>
      <CardHeader title="Semester Progress" />
      <ChartWrapperStyle>
        <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={330} />
      </ChartWrapperStyle>
    </Card>
  );
}
