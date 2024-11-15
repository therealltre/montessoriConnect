import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Card,
  Grid,
  Stack,
  Typography,
  Divider,
  Box,
  Avatar,
  Button,
  Drawer,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { FormProvider, RHFUploadSingleFile } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

JobNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentJob: PropTypes.object,
};

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      height: ${theme.spacing(8)};
      width: ${theme.spacing(8)};
`
);

export default function JobNewEditForm({ currentJob }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultValues = useMemo(() => {
    const jobDescription = currentJob?.description || '';
    const keyResponsibilities = currentJob?.keyResponsibilities || [];
    const whyUs = currentJob?.whyUs || [];

    const concatenatedDescription = `
        Job Description:
        ${jobDescription}

        Key Responsibilities:
        ${keyResponsibilities.map((item) => `• ${item}`).join('\n')}

        Why You'll Love Working Here:
        ${whyUs.map((item) => `• ${item}`).join('\n')}
      `.trim();

    return {
      companyName: currentJob?.companyName || '',
      logoUrl: currentJob?.logoUrl || '',
      jobtitle: currentJob?.jobtitle || '',
      fullDescription: concatenatedDescription,
      postedDate: currentJob?.postedDate || '',
      deadline: currentJob?.deadline || '',
      employments: currentJob?.employment || '',
      experience: currentJob?.experience || '',
      location: currentJob?.location || '',
      schoolAddress: currentJob?.schoolAddress || '',
      phoneNumber: currentJob?.phoneNumber || '',
      status: currentJob?.status,
      isPublished: true,
      fullName: '',
      email: '',
      applicantPhoneNumber: '',
      coverLetter: '',
      resume: null,
    };
  }, [currentJob]);

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'resume',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const file = watch('resume');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Filter out empty fields from applicant data
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '')
      );
  
      // Create the final form data combining filtered applicant details and current job details
      const formData = {
        ...filteredData,
        currentJob: {
          companyName: currentJob?.companyName,
          jobtitle: currentJob?.jobtitle,
          postedDate: currentJob?.postedDate,
          deadline: currentJob?.deadline,
          employment: currentJob?.employment,
          experience: currentJob?.experience,
          location: currentJob?.location,
          schoolAddress: currentJob?.schoolAddress,
          phoneNumber: currentJob?.phoneNumber,
        },
      };
  
      console.log('Form Data:', formData);
      // Simulate a form submission with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  
  

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3}>
        {/* details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h4">{currentJob?.jobtitle}</Typography>

            <Divider />

            <Stack spacing={3} mt={3}>
              <Stack>
                <Typography mb={2} variant="h6">
                  Job Description
                </Typography>
                <Typography mb={2}>{currentJob?.description}</Typography>
              </Stack>

              <Stack>
                <Typography mb={2} variant="h6">
                  Key responsibilities{' '}
                </Typography>
                <Typography mb={2}>{currentJob?.keyResponsibilities} </Typography>
              </Stack>

              <Stack>
                <Typography mb={2} variant="h6">
                  Why You'll love working here
                </Typography>
                <Typography mb={2}>{currentJob?.whyUs} </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* sidebar properties */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon={'ion:calendar'} width={20} height={20} color={'primary'} />
              <Stack>
                <Typography variant="body2">Date Posted:</Typography>
                <Typography variant="subtitle1"> {currentJob?.postedDate}</Typography>
              </Stack>
            </Box>

            <Box
              sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon={'ion:calendar'} width={20} height={20} color={'primary'} />
              <Stack>
                <Typography variant="body2">Deadline:</Typography>
                <Typography variant="subtitle1"> {currentJob?.deadline}</Typography>
              </Stack>
            </Box>

            <Box
              sx={{ textAlign: 'start', ml: 3, mb: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon="f7:clock-fill" width={20} height={20} sx={{ color: 'primary' }} />
              <Stack>
                <Typography variant="body2">Employment Type:</Typography>
                <Typography variant="subtitle1"> {currentJob?.employment}</Typography>
              </Stack>
            </Box>

            <Box
              sx={{ textAlign: 'start', ml: 3, alignItems: 'start', color: 'color.primary' }}
              display={'flex'}
              gap={1}
            >
              <Iconify icon={'heroicons-outline:chart-bar'} width={20} height={20} />
              <Stack>
                <Typography variant="body2">Experience:</Typography>
                <Typography variant="subtitle1"> {currentJob?.experience}</Typography>
              </Stack>
            </Box>
          </Card>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleOpen}>
            Apply
          </Button>

          {/* Job Application Drawer */}
          <Drawer anchor="right" open={open} onClose={handleClose}>
            <Box sx={{ p: 3 }} width={{ sm: 400, md: 700 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="div">
                  Applying for {currentJob?.jobtitle}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                required
                label="Full Name"
                margin="normal"
                variant="outlined"
                {...methods.register('fullName', { required: 'Full Name is required' })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
              <TextField
                fullWidth
                required
                label="Email"
                margin="normal"
                variant="outlined"
                {...methods.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                required
                label="Phone Number"
                margin="normal"
                variant="outlined"
                {...methods.register('applicantPhoneNumber', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Enter a valid phone number',
                  },
                })}
                error={!!errors.applicantPhoneNumber}
                helperText={errors.applicantPhoneNumber?.message}
              />

              <Box sx={{ mb: 5 }}>
                <Typography variant="subtitle1">Upload CV *</Typography>
                <RHFUploadSingleFile
                  name="resume"
                  accept=""
                  maxSize={3145728}
                  onDrop={handleDrop}
                  {...methods.register('resume', { required: 'File upload is required' })}
                />
                {file && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Uploaded file: {file.name}
                  </Typography>
                )}
              </Box>

              <TextField
                fullWidth
                label="Cover Letter"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                {...methods.register('coverLetter')}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit Application'}
              </Button>
            </Box>
          </Drawer>

          {/* job poster information */}
          <Card sx={{ p: 1, mt: 3 }}>
            <Box p={3} display="flex" alignItems="flex-start">
              <AvatarWrapper src={currentJob?.logoUrl} variant="rounded" />
              <Box
                sx={{ textAlign: 'start', ml: 3, color: 'color.primary' }}
                display={'flex'}
                flexDirection={'column'}
                gap={1}
              >
                <Typography variant="subtitle1">{currentJob?.companyName}</Typography>
                <Typography>
                  {currentJob?.schoolAddress}, {currentJob?.location}{' '}
                </Typography>
                <Typography>{currentJob?.phoneNumber}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
