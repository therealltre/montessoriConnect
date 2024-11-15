import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Stack, Typography, Pagination, Button } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import { useState } from 'react';

// ----------------------------------------------------------------------

const CARDS = [
  {
    imageUrl: '/assets/images/articles/article_3.jpg',
    title: 'Article 1',
    articleType: 'Philosophy',
    author: 'Michael Palmisano',
  },
  {
    imageUrl: '/assets/images/articles/article_4.jpg',
    title: 'Article 2',
    articleType: 'Child Development',
    author: 'William Carnahan',
  },
  {
    imageUrl: '/assets/images/articles/article_2.jpg',
    title: 'Article 3',
    articleType: 'Success Stories',
    author: 'Stephane Maarek',
  },
  {
    imageUrl: '/assets/images/articles/article_1.jpg',
    title: 'Article 4',
    articleType: 'Career',
    author: 'Rajeev Rawal',
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
  minHeight: 227,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(0),
  },
}));

const ImageWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
});

const ContentStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const BadgeStyle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 160,
  left: 0,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '2px 8px',
  borderRadius: '5px',
  fontSize: '12px',
  fontWeight: 'bold',
}));

// ----------------------------------------------------------------------

export default function HomeAboutMontessoriConnect() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page
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
                <Typography variant="h2">Why</Typography>
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
                  Montessori Connect
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
            <Grid item xs={12} lg={3} key={card.title}>
              {/* <m.div variants={varFade().inUp}> */}
              <CardStyle>
                <ImageWrapper>
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    sx={{
                      width: '100%',
                      height: 169,
                      objectFit: 'cover',
                      position: 'absolute',
                    }}
                  />
                </ImageWrapper>
                <BadgeStyle>{card.articleType}</BadgeStyle>
                <ContentStyle>
                  <Typography variant="h5" paragraph sx={{ textAlign: 'start' }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, textAlign: 'start' }}>
                    {card.author}
                  </Typography>
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
