import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import FoundationSharpIcon from '@mui/icons-material/FoundationSharp';
import ContactPageTwoToneIcon from '@mui/icons-material/ContactPageTwoTone';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import OtherHousesSharpIcon from '@mui/icons-material/OtherHousesSharp';

const items = [
  {
    icon: <ChurchOutlinedIcon />,
    title: 'Sunday Service',
    description:
      'Our Sunday Service begines 8:15 Am every sunday with the Sunday School',
  },
  {
    icon: <ContactPageTwoToneIcon />,
    title: 'Church Contact Lines',
    description:
    <React.Fragment>
      <span style={{ color: '#fff' }}>Phone: 08081703500 and Email: rccgsow@gmail.com or info@rccgsow.org.</ span> If you are going through difficult or challenge times or you wanrt to celebrate and dedicate your house, office or vehicle, etc. Use the above contact details to inform the church and someone will be deligated to attend to you.',
      </React.Fragment>
  },
  {
    icon: <OtherHousesSharpIcon />,
    title: 'House Fellowship Centres',
    description: (
      <React.Fragment>
        <span style={{ color: '#fff' }}>House of Victory:</span> 11 Mathew Street, Pero Bus Stop Agege (5 - 6pm)<br />
        <span style={{ color: '#fff' }}>House of Praise:</span> No 7 Freedom Paris, Oke-Apa Magboro Ogun State (5 - 6pm)<br />
        <span style={{ color: '#fff' }}>House of Prayer:</span> 30 Ogundana street, off Allen Avenue, Ikeja, Lagos (5:30 - 6:30pm) <br />
        <span style={{ color: '#fff' }}>House Of Grace:</span> 17 Oremeta Street, Oregun (6 - 7pm)
      </React.Fragment>
    ),
    
  },
  {
    icon: <LocalActivitySharpIcon />,
    title: 'Our Weekly Activities',
    description: (
      <React.Fragment>
        <span style={{ color: '#fff' }}>Sundays:</span> New Workers Training 07:00 - 08:15am<br />
        <span style={{ color: '#fff' }}>Sundays:</span> Workers Fresh Annointing 07:30 - 8:15am<br />
        <span style={{ color: '#fff' }}>Tuesday</span>  Digging Deep 6 - 7pm <br />
        <span style={{ color: '#fff' }}>Wednesdays::</span> Departmental Meetings as Scheduled <br />
        <span style={{ color: '#fff' }}>Thursdays:</span> Faith Clinic 6 - 7pm <br />
        <span style={{ color: '#fff' }}>fridays:</span> Departmental Meetings and Vigil (6 - 7pm) <br />
        <span style={{ color: '#fff' }}>Saturdays:</span> Evangelism and Visitations 4 - 6pm <br />
        <span style={{ color: '#fff' }}>Every 3rd Saturday</span> Shining Youth Fellowship Meeting 2 - 4pm
      </React.Fragment>
    ),
  },
  {
    icon: <PeopleAltSharpIcon />,
    title: 'Counseling',
    description:
      "Pastors are available for Counseling on Tuesday's and Thursday's from 5 - 6pm. Come talk to someone who will advice and pray with you over the issues you are going through",
  },
  {
    icon: <FoundationSharpIcon />,
    title: 'Fasting and Prayer',
    description:
      "Every thursday's - Ministers fasting and prayers. All workers are also expected to fast and pray. Prayer point - Father, thank you for making us an ever increasing family. Please send more laborers into your vineyard in the Scent of Water in Jesus name. Amen",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" sx={{fontSize: '30px'}}>
            What's Happening at Saint of Water Parish
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover what's going on at Saint of Water Parish! We have a variety of exciting events, activities, and announcements for all ages.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
