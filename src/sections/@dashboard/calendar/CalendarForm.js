import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF', // Updated field name
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
  onAddComplete: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func
};

export default function CalendarForm({ event, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = Object.keys(event).length === 0;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    start: Yup.date().required('Start date is required'),
    end: Yup.date().required('End date is required').when(
      'start',
      (start, schema) => start && schema.min(start, 'End date must be later than start date')
    ),
    textColor: Yup.string().required('Color is required')
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        textColor: data.textColor, // Corrected field name
        allDay: data.allDay,
        start: new Date(data.start), // Ensure start is a Date object
        end: new Date(data.end), // Ensure end is a Date object
      };
      if (event.id) {
        dispatch(updateEvent(event.id, newEvent));
        enqueueSnackbar('Update success!');
      } else {
        enqueueSnackbar('Create success!');
        dispatch(createEvent(newEvent));
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFTextField name="title" label="Title" />

          <RHFTextField name="description" label="Description" multiline rows={4} />

          <RHFSwitch name="allDay" label="All day" />

          <Controller
            name="start"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <MobileDateTimePicker
                label="Start date"
                inputFormat="dd/MM/yyyy hh:mm a"
                value={value ? new Date(value) : null}
                onChange={(date) => onChange(date)}
                textField={(params) => <TextField {...params} fullWidth sx={{ borderColor: 'transparent' }} />} // Remove border color
                {...rest}
              />
            )}
          />

          <Controller
            name="end"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <MobileDateTimePicker
                label="End date"
                inputFormat="dd/MM/yyyy hh:mm a"
                value={value ? new Date(value) : null}
                onChange={(date) => onChange(date)}
                textField={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!isDateError}
                    helperText={isDateError && 'End date must be later than start date'}
                    sx={{ borderColor: 'transparent' }} // Remove border color
                  />
                )}
                {...rest}
              />
            )}
          />

          <Controller
            name="textColor" // Correct field name here
            control={control}
            render={({ field }) => (
              <ColorSinglePicker 
                value={field.value} 
                onChange={field.onChange} 
                colors={COLOR_OPTIONS} 
                sx={{ borderColor: 'transparent' }} // Remove border color
              />
            )}
          />
        </Stack>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Iconify icon="eva:trash-2-outline" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {isCreating ? 'Add Event' : 'Save Changes'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </LocalizationProvider>
  );
}
