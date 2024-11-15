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
import {
  Card,
  Grid,
  Stack,
  Typography,
  FormControlLabel,
  TextField,
  Divider,
  Radio,
  FormLabel,
  FormControl,
  RadioGroup,
  Checkbox,
} from '@mui/material';
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

JobNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentJob: PropTypes.object,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function JobNewEditForm({ isEdit = false, currentJob }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    companyName: Yup.string().required('Name is required'),
    logoUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    jobtitle: Yup.string().required('Job title is required'),
    description: Yup.string().required('Description is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    location: Yup.string().required('Location is required'),
    deadline: Yup.date().required('Deadline is required').nullable(),
  });

  const defaultValues = useMemo(() => {
    const jobDescription = currentJob?.description || '';
    const keyResponsibilities = currentJob?.keyResponsibilities || [];
    const whyUs = currentJob?.whyUs || [];

    const employmentType = currentJob?.employment || '';
    const experience = currentJob?.experience || '';

    const concatenatedDescription = `
      Job Description:<br />
      ${jobDescription}<br /><br />

      Key Responsibilities:<br />
      ${keyResponsibilities.map((item) => `• ${item}`).join('<br />')}<br /><br />

      Why You'll Love Working Here:<br />
      ${whyUs.map((item) => `• ${item}`).join('<br />')}
    `.trim();

    return {
      companyName: currentJob?.companyName || '',
      logoUrl: currentJob?.logoUrl || '',
      jobtitle: currentJob?.jobtitle || '',
      fullDescription: concatenatedDescription,
      location: currentJob?.location || '',
      deadline: currentJob?.deadline ? new Date(currentJob?.deadline) : null,
      status: currentJob?.status,
      employment: employmentType,
      experience: experience,
      isPublished: true,
    };
  }, [currentJob]);

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentJob) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentJob, reset, defaultValues]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.job.cards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'logoUrl',
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
              <Typography mb={2}>Title, Description, Image...</Typography>
              <Divider />
              <Stack spacing={3} mt={3}>
                <RHFTextField name="jobtitle" label="Job Title" placeholder={'Ex. Science Teacher'} />
                <RHFTextField name="companyName" label="School Name" placeholder={'Ex. school'} />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="fullDescription" />
                </div>

                <div>
                  <LabelStyle>School Logo</LabelStyle>
                  <RHFUploadSingleFile name="logoUrl" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
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
                <FormControl component="fieldset">
                  <FormLabel component="legend">Employment Type:</FormLabel>
                  <Controller
                    name="employment"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} direction="flex">
                        <Stack direction={{ xs: 'column', lg: 'row' }} alignItems={'start'} spacing={1}>
                          <FormControlLabel value="Full Time" control={<Radio />} label="Full Time" />
                          <FormControlLabel value="Part Time" control={<Radio />} label="Part Time" />
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Experience</FormLabel>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} direction="flex">
                        <FormControlLabel value="No experience" control={<Radio />} label="No experience" />
                        <FormControlLabel value="1 year(s)" control={<Radio />} label="1 year experience" />
                        <FormControlLabel value="2 year(s)" control={<Radio />} label="2 year experience" />
                        <FormControlLabel value="3 year(s)" control={<Radio />} label="3 year experience" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                {isEdit ? (
                  <RHFSelect name="location" label="Location" placeholder="Location">
                    <option value="location" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label} ({option.code}) + {option.phone}
                      </option>
                    ))}
                  </RHFSelect>
                ) : (
                  <RHFTextField name="location" label="Location" />
                )}

                <Controller
                  name="deadline"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Deadline"
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
                {!isEdit ? 'Create Job' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </LocalizationProvider>
  );
}
