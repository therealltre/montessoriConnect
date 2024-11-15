import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
// @mui
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

// Function to generate a random invoice number
const generateRandomInvoiceNumber = () => `INV-${Math.floor(Math.random() * 1000000)}`;

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const methods = useForm({
    defaultValues: {
      createDate: new Date(),
      dueDate: null,
      status: 'paid', // Set the default status here
      invoiceNumber: generateRandomInvoiceNumber(), // Add default value for invoice number
    },
  });

  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.neutral' }}>
          <Controller
            name="invoiceNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Invoice Number"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                fullWidth
                error={!!error}
                helperText={error?.message}
                sx={{ flex: 1 }}
                disabled
              />
            )}
          />

          <Controller
            name="createDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Date create"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!error} helperText={error?.message} sx={{ flex: 1 }} />
                )}
              />
            )}
          />

          <Controller
            name="dueDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Due date"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!error} helperText={error?.message} sx={{ flex: 1 }} />
                )}
              />
            )}
          />

          <RHFSelect
            fullWidth
            name="status"
            label="Status"
            InputLabelProps={{ shrink: true }}
            SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
            sx={{ flex: 1 }}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
      </LocalizationProvider>
    </FormProvider>
  );
}
