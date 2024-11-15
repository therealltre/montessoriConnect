'use client';

import {
  Card,
  Link,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from '@mui/material';
import WorldMap from 'react-svg-worldmap';
import SimpleBar from '../../../../components/simplebar';

const CountryMap = () => {
  const getFillColor = (countryCode) => {
    const country = data.find((c) => c.country === countryCode);
    return country ? country.colorCode : '#E2E8F0';
  };

  const getStyle = ({ countryCode }) => ({
    fill: getFillColor(countryCode),
    stroke: '#FFFFFF',
    strokeWidth: 1,
    strokeOpacity: 1,
  });

  const data = [
    {
      country: 'US',
      name: 'United States',
      value: 40,
      style: 'bg-[#E6B9DE]',
      colorCode: '#E6B9DE',
    },
    {
      country: 'FR',
      name: 'France',
      value: 20,
      style: 'bg-[#2750AF]',
      colorCode: '#2750AF',
    },
    {
      country: 'IN',
      name: 'India',
      value: 15,
      style: 'bg-[#3962F7]',
      colorCode: '#3962F7',
    },
    {
      country: 'CA',
      name: 'Canada',
      value: 5,
      style: 'bg-[#BBD6FF]',
      colorCode: '#BBD6FF',
    },
    {
      country: 'GH',
      name: 'Ghana',
      value: 10,
      style: 'bg-[#116a14]',
      colorCode: '#116a14',
    },
  ];

  return (
    <Card>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} display={'flex'} justifyContent="center">
          <WorldMap size={'responsive'} data={data} color="#2750AF" valueSuffix=" Schools" styleFunction={getStyle} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" height="100%">
            <Box borderBottom={1} p={2} display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="h6" color="textPrimary">
                Countries List
              </Typography>
              <Link href="#" variant="body2" underline="hover">
                See All
              </Link>
            </Box>
            <SimpleBar style={{ maxHeight: 450 }}>
              <List
                sx={{
                  flexGrow: 1,
                }}
              >
                {data.map((item, i) => (
                  <ListItem
                    key={i}
                    alignItems="center"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: item.colorCode, color: '#fff' }}>
                        {item.country}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={<Typography variant="subtitle2">{item.name}</Typography>} />

                    <Typography variant="subtitle2" px={1} py={0.5} borderRadius={1}>
                      {item.value} Schools
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </SimpleBar>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CountryMap;
