import { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
// @mui
import { TextField } from '@mui/material';
import { Masonry, StaticDatePicker, MobileDatePicker, DesktopDatePicker } from '@mui/lab';
//
import { Block } from '../../Block';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

export default function PickerDate() {
  const [value, setValue] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
        <Block title="Basic">
          <DesktopDatePicker
            label="For desktop"
            value={value}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
          />

          <MobileDatePicker
            orientation="portrait"
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
          />
        </Block>

        <Block title="Static mode">
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            shouldDisableDate={isWeekend}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Block>

        <Block title="Views playground">
          <DatePicker
            views={['year']}
            label="Year only"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
          />
          <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
          />
          <DatePicker
            openTo="year"
            views={['year', 'month', 'day']}
            label="Year, month and date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
          />
          <DatePicker
            views={['day', 'month', 'year']}
            label="Invert the order of views"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
          />
          <DatePicker
            views={['day']}
            label="Just date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
          />
        </Block>
      </Masonry>
    </LocalizationProvider>
  );
}
