import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Grid, Stack, Typography, } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';


// ----------------------------------------------------------------------

const CARDS = [
  {
    imageUrl: '/assets/images/instagram/post_1.jpg',
    title: 'Article 1',
    articleType: 'Philosophy',
    author: 'Michael Palmisano',
  },
  {
    imageUrl: '/assets/images/instagram/post_2.jpg',
    title: 'Article 2',
    articleType: 'Child Development',
    author: 'William Carnahan',
  },
  {
    imageUrl: '/assets/images/instagram/post_3.jpg',
    title: 'Article 3',
    articleType: 'Success Stories',
    author: 'Stephane Maarek',
  },
  {
    imageUrl: '/assets/images/instagram/post_4.jpg',
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


// ----------------------------------------------------------------------

export default function HomeAboutMontessoriConnect() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 2 } }}>
          <m.div variants={varFade().inDown}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant="h2">MC On</Typography>
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
                Instagram
              </Typography>
            </Stack>
          </m.div>
        </Box>

        <Grid container spacing={2}>
          {CARDS.map((card) => (
            <Grid item xs={12} lg={3} key={card.title}>
              {/* <m.div variants={varFade().inUp}> */}
              <CardStyle>
                <ImageWrapper>
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                    }}
                  />
                </ImageWrapper>
              </CardStyle>
              {/* </m.div> */}
            </Grid>
          ))}
        </Grid>

        <Stack sx={{ mt: 2, mb: 5, justifyContent: 'space-between' }} direction={'row'}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src={'/assets/images/instagram/carousel.jpg'}
              alt="carousel"
              sx={{
                width: 112,
                height: 11,
              }}
            />
          </Box>
          <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
            @montessoriconnect
          </Typography>
        </Stack>
      </Container>
    </RootStyle>
  );
}
