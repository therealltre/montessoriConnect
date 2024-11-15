import * as Yup from 'yup';
import React, { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// import { values } from 'lodash';
//Appwrtie
// import { account, ID } from '../../../appwrite';
import { useSnackbar } from 'notistack';
import ErrorIcon from '@mui/icons-material/Error';
import { PATH_AFTER_ADMIN_LOGIN } from '../../../config';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function LoginAdminForm() {
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  // const [isPending, startTransition] = React.useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    // terms: Yup.boolean().oneOf(
    //   [true],
    //   ('You must agree to our terms and conditions')
    // )
  });

  const defaultValues = {
    email: 'admin@montessoriconnect.com',
    password: 'admin',
    remember: true,
    submit: null,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('Submitting data:', data);
      await login(data.email, data.password);
      console.log('Login successful');
      enqueueSnackbar('Login success!');
      router.push(PATH_AFTER_ADMIN_LOGIN);
      // Optionally, you can redirect the user to another page upon successful login
      // Router.push('/dashboard'); // Example using Next.js Router
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Login failed!', {
        variant: 'error',
        icon: <ErrorIcon />,
      });
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: 'Login error' });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="terms" label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
