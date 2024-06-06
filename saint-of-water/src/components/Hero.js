import React from 'react';
import { alpha, Box, Container, Stack, Typography } from '@mui/material';
import DemoPaper from './DemoPaper';
import sowlogo from '../images/sowlogo.png';

const logoStyle = {
  width: '300px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '50%',
  marginTop: '20px',
};

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(4rem, 10vw, 2rem)',
              color: '#72AA82',
            }}
          >
            The Redeemed Christian Church of God
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: 'clamp(2rem, 5vw, 2rem)',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              textAlign: 'center',
            }}
          >
            Saint of Water Parish
          </Typography>
        </Stack>
        <Box>
          <img
            src={sowlogo}
            style={logoStyle}
            alt="logo of saint of water parish"
          />
        </Box>
        <DemoPaper sx={{ mt: 8, marginBottom: '-85px' }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: 'clamp(1.5rem, 5vw, 1.5rem)',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              textAlign: 'center',
            }}
          >
            For there is hope for a tree, If it is cut down, that it will sprout again,
            And that its tender shoots will not cease.
            Though its root may grow old in the earth, And its stump may die in the ground,
            Yet at the scent of water it will bud And bring forth branches like a plant..
            <br />
            Job 14:7-9
          </Typography>
        </DemoPaper>
        <Box
          id="vision-and-goals"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            maxWidth: '1500px',
            p: 4,
            bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
            borderRadius: '10px',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
              color: theme => theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
            }}
          >
            Vision and Goals of the RCCG
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 3,
              color: theme => theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary'
            }}
          >
            1. To make it to heaven<br />
            2. To take as many people as possible with us<br />
            3. To have a member of the Christian Church of God in every family of all nations<br />
            4. To accomplish No. 1, Holiness will be our lifestyle<br />
            5. To accomplish No. 2 & 3, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes of driving distance in every city and town of developed countries<br />
            <br />
            We will pursue these objectives until every nation in the world is reached for JESUS CHRIST OUR LORD.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
