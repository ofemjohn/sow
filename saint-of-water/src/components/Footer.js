import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import sowlogo from '../images/sowlogo.png';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";



const logoStyle = {
  width: '50px',
  height: '40px',
  marginLeft: '25px'
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}RCCG-SOW&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <img
                src={sowlogo}
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Send us an email for any inquiries or information.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="mailto:rccgsow@gmail.com"
              sx={{ flexShrink: 0 }}
            >
              Send us an Email
            </Button>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Address: 30 Ogundana street, off Allen Avenue, Ikeja, Lagos
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Our Location
          </Typography>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              width: '100%',
              height: '300px',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.352914%2C6.600150%2C3.358914%2C6.606150&layer=mapnik&marker=6.603150%2C3.355914"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://www.facebook.com/scentof.waterparishikeja?mibextid=ZbWKwL"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookSharpIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://youtube.com/@scentofwater5530?si=OkCtAIjgHd4EB0ET"
            aria-label="Twitter"
            sx={{ alignSelf: 'center' }}
          >
            <FaYoutube/>
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.instagram.com/rccg_sow_parish/?target_user_id=49074130880&ndid=617e3f4dfb2beHb6d0bcfc0H617e43e75b590H53&utm_source=instagram&utm_medium=email&utm_campaign=digest_email&click_source=header_profile&__bp=1#"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <FaSquareInstagram  />
          </IconButton>
          {/* <IconButton
            color="inherit"
            href="https://twitter.com/MaterialUI"
            aria-label="Twitter"
            sx={{ alignSelf: 'center' }}
          >
            <FaYoutube />
          </IconButton> */}
        </Stack>
      </Box>
    </Container>
  );
}
