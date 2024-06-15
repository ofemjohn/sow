import React from 'react';
import { alpha, Box, Container, Stack, Typography } from '@mui/material';
import sowlogo from '../images/sowlogo.png';

const logoStyle = {
  width: '150px', // Adjusted size for better placement
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '50%',
  marginTop: '20px',
};

const Hero = () => {
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
        <Box>
          <img
            src={sowlogo}
            style={logoStyle}
            alt="logo of Scent of Water Parish"
          />
        </Box>
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' }, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(2rem, 5vw, 2rem)',
              color: '#72AA82',
            }}
          >
            The Redeemed Christian Church of God
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: 'clamp(2rem, 5vw, 2rem)',
              color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
            })}
          >
            Scent of Water Parish
          </Typography>
        </Stack>
        <Box
          id="about"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            maxWidth: '1200px',
            p: 4,
            bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
            borderRadius: '10px',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
            textAlign: 'left',
          })}
        >
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
              color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'
            })}
          >
            About The Ministry
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            History
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2 }}
          >
            The Scent of Water (SOW) Parish is a Mission of the RCCG Rose of Sharon Parish in Ikeja GRA, Lagos. We are part of the Apapa Family of the RCCG Region 20, Lagos Province 35 Zone and Area 009.
            In July 2014, a team of Ministers and Workers was sent to start a parish of the church. After weeks of fasting and prayer, the parish was established at # 9 Allen Avenue, Ikeja – Lagos. The first Service of the church was held on Sunday July 13, 2014 and the inauguration service was held on January 28, 2015 under the Ministerial guidance of the Provincial Pastor, Lagos Province 35, Pastor Remi Morgan with the able support of Pastor Emeka Obiagwu, Zonal/Area Pastor, Rose of Sharon.
            The parish grew both in numbers and anointing and the space could no longer take the teaming members. Consequently, after weeks of fasting and prayers, the Lord led us to the present location with a clear mandate and mission as articulated below. By the special grace of God, the Parish relocated and commenced services at 30 Ogundana Street, Off Allen Avenue by Hilton Hotel Bus Stop from February 1, 2016.
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            Vision
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2 }}
          >
            In line with the Vision of The Redeemed Christian Church of God (RCCG), our Vision is:
            <ul>
              <li>To make heaven.</li>
              <li>To take as many people with us.</li>
              <li>To have a member of RCCG in every family of all nations.</li>
              <li>To accomplish No. 1 above, holiness will be our lifestyle.</li>
              <li>To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.</li>
              <li>We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.</li>
            </ul>
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            Mission
          </Typography>
          <Typography
            variant="body1"
          >
            Our Mission is encapsulated in two scriptures:
            <ul>
              <li>Jeremiah 1:10 (KJV) - See, I have this day set thee over the nations and over the kingdoms, to root out, and to pull down, and to destroy, and to throw down, to build, and to plant.</li>
              <li>Job 14: 7-9 (KJV) - For there is hope of a tree, if it be cut down, that it will sprout again, and that the tender branch thereof will not cease. Though the root thereof wax old in the earth, and the stock thereof die in the ground; Yet through the scent of water it will bud, and bring forth boughs like a plant.</li>
            </ul>
            Our mission is to enthrone the kingdom of God in our immediate community of Ogundana, Community Road, Ajayi Street, Allen Avenue, etc., and to bring everyone to the knowledge of the true God and His son Jesus Christ who is our Lord and Saviour.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

