import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../(_mock)';
// components
import { FormProvider, RHFEditor, RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

EventNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentEvent: PropTypes.object,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function EventNewEditForm({ isEdit = false, currentEvent }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    companyName: Yup.string().required('Name is required'),
    imageUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    title: Yup.string().required('Job title is required'),
    description: Yup.string().required('Description is required'),

    // email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.date().required('Date is required').nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      companyName: currentEvent?.companyName || '',
      imageUrl: currentEvent?.cover || '',
      title: currentEvent?.title || '',
      description: currentEvent?.description || '',
      date: currentEvent?.date ? new Date(currentEvent?.date) : null,
      endDate: currentEvent?.endDate ? new Date(currentEvent?.endDate) : null,
      startTime: currentEvent?.startTime || null,
      location: currentEvent?.location || '',

      // email: currentEvent?.email || '',
      phoneNumber: currentEvent?.phoneNumber || '',
      status: currentEvent?.status,
      // tags: ['Logan'],
      isPublished: true,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [currentEvent]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentEvent) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEvent]);

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    console.log('Form submitted');
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.events.cards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5">Details</Typography>
              <Typography mb={2}>Title, short description, image...</Typography>
              <Divider />
              <Stack spacing={3} mt={3}>
                <RHFTextField name="title" label="Event Title" placeholder={'Ex. Back to School Night'} />
                <RHFTextField name="location" label="Event Location" placeholder={'Ex. 123 ave'} />

                <div>
                  <LabelStyle>Event Description</LabelStyle>
                  <RHFEditor name="description" />
                </div>

                <div>
                  <LabelStyle>Event Cover Image</LabelStyle>
                  <RHFUploadSingleFile name="imageUrl" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5">Properties</Typography>
              <Typography mb={2}>Additional attributes</Typography>
              <Divider />

              <Stack spacing={3} mt={3}>
                <RHFTextField name="phoneNumber" label="Contact Phone Number" placeholder={'Ex. school'} />

                {!isEdit ? (
                  <RHFSelect name="location" label="Country" placeholder="Country">
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label} ({option.code}) + {option.phone}
                      </option>
                    ))}
                  </RHFSelect>
                ) : (
                  <RHFTextField name="location" label="location" />
                )}

                <RHFTextField name="startTime" label="Time" placeholder={'Ex. 10am to 1pm'} />

                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Event Date"
                      inputFormat="dd/MM/yyyy"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="End Date"
                      inputFormat="dd/MM/yyyy"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Event' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </LocalizationProvider>
  );
}
