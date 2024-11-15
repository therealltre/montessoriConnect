// @mui
import {  styled } from '@mui/material/styles';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
//framermotion
import { MotionViewport, varFade } from '../../components/animate';
import { m } from 'framer-motion';
// components
import { FaqsForm, FaqsList } from '../faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function HomeFaq() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }} >
              FAQS
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
              <Typography variant="h2">Looking For</Typography>
              <Typography
                variant="h2"
                sx={{
                  backgroundcolor: 'primary',
                  backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Answers?
              </Typography>
            </Stack>
          </m.div>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FaqsList />
          </Grid>

          <Grid item xs={12} md={6}>
            <FaqsForm />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
