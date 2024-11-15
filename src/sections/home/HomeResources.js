import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Stack, Typography, Pagination, Button } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import { useState } from 'react';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const CARDS = [
  {
    imageUrl: '/assets/images/articles/article_5.jpg',
    title: 'Building Future Leaders: Social Skills in the Montessori Classroom',
    resourceType: 'EBOOK',
    description:
      'Montessori education is renowned for its holistic approach, fostering not only academic prowess but also essential leadership skills. By employing innovative teaching methods, this educational philosophy cultivates qualities that prepare children to become the leaders of tomorrow.',
  },
  {
    imageUrl: '/assets/images/articles/article_5.jpg',
    title: 'What Is Montessori Education? The Philosophy and Method',
    resourceType: 'Psychology',
    description:
      'Montessori education helps develop all aspects of the child.For more than a century now, the child-focused approach that Dr. Maria Montessori, an Italian physician, developed for educating children has been transforming schools around the globe.',
  },
  {
    imageUrl: '/assets/images/articles/article_5.jpg',
    title: 'Building Future Leaders: Social Skills in the Montessori Classroom',
    resourceType: 'EBOOK',
    description:
      'Montessori education is renowned for its holistic approach, fostering not only academic prowess but also essential leadership skills. By employing innovative teaching methods, this educational philosophy cultivates qualities that prepare children to become the leaders of tomorrow.',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  border: 0,
  width: '100%',
  minHeight: 200,
  margin: 'auto',
  display: 'flex', // Use flex display
  flexDirection: 'row', // Default layout for larger screens
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column', // Stacks image above content in mobile view
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: '50%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Image takes full width in mobile view
    height: '100%', // Adjust height for mobile
  },
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2), // Add spacing for mobile view
  },
}));

// ----------------------------------------------------------------------

export default function HomeAboutMontessoriConnect() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 1; // Number of items per page
  const pageCount = Math.ceil(CARDS.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'start', mb: { xs: 10, md: 2 } }}>
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              MontessoriConnect
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              spacing={1}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Stack direction={'row'} spacing={1}>
                <Typography
                  variant="h2"
                  sx={{
                    backgroundColor: 'primary',
                    backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Resources
                </Typography>
              </Stack>

              {/* Pagination and See All Button */}
              <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
                <Pagination count={pageCount} page={page} onChange={handlePageChange} />
                <Button color="primary">See All</Button>
              </Stack>
            </Stack>
          </m.div>
        </Box>

        <Grid container spacing={2}>
          {CARDS.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((card) => (
            <Grid item xs={12} lg={12} key={card.title}>
              {/* <m.div variants={varFade().inUp}> */}
              <CardStyle sx={{ mb: { xs: 5, lg: 0 } }}>
                <ImageWrapper>
                  <Image src={card.imageUrl} alt={card.title} />
                </ImageWrapper>
                <ContentStyle>
                  <Typography variant="h4" paragraph sx={{ textAlign: 'start' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ textAlign: 'start' }}>
                    {card.resourceType}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, textAlign: 'start' }}>
                    {card.description}
                  </Typography>

                  <Button sx={{ width: 150 }} fullWidth>
                    Download PDF
                    <Iconify icon={'solar:arrow-right-outline'} />
                  </Button>
                </ContentStyle>
              </CardStyle>
              {/* </m.div> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
