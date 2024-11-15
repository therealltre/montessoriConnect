import React from 'react';
import { Card, CardHeader, CardContent, Stack, Typography, Divider } from '@mui/material';
import Iconify from '../../../../components/Iconify';

const lessons = [
  {
    id: '12345',
    title: 'Math Class',
    date: '2024-10-01',
    time: '10:00 AM - 11:00 AM',
  },
  {
    id: '54321',
    title: 'Science Class',
    date: '2024-10-02',
    time: '01:00 PM - 02:00 PM',
  },
  {
    id: '12345',
    title: 'Math Class',
    date: '2024-10-01',
    time: '10:00 AM - 11:00 AM',
  },
  {
    id: '54321',
    title: 'Science Class',
    date: '2024-10-02',
    time: '01:00 PM - 02:00 PM',
  },
  {
    id: '54321',
    title: 'Science Class',
    date: '2024-10-02',
    time: '01:00 PM - 02:00 PM',
  },

  // Add more lessons as needed
];

const LessonsCard = () => (
  <Card sx={{ height: '100%' }}>
    <CardHeader title="Upcoming Lessons" />
    <CardContent>
      {lessons.map((lesson, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Stack direction="column">
            <Typography variant="h6">{lesson.title}</Typography>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Iconify icon="solar:calendar-outline" />
              <Typography variant="body2">
                {lesson.date} | {lesson.time}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Class ID: {lesson.id}
          </Typography>
        </Stack>
      ))}
    </CardContent>
  </Card>
);

export default LessonsCard;
