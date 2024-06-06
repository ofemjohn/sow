import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { CardContent } from '@mui/material';

const paymentInfo = [
  {
    title: 'Project/General Offering',
    accountNumber: '4011102567',
    description: 'For physical development',
  },
  {
    title: 'Ministers Tithe',
    accountNumber: '6060464904',
    description: 'For ordained ministers',
  },
  {
    title: 'General Tithe',
    accountNumber: '6060464942',
    description: 'For unordained ministers and congregation',
  },
  {
    title: 'ACCMAD',
    accountNumber: '6060464942',
    description: 'For CADAM, Welfare, Christian Social Responsibility',
  },
  {
    title: 'Sunday School',
    accountNumber: '6060464966',
    description: '',
  },
  {
    title: 'RCCG (SOW) Building Project',
    accountNumber: '5600507785',
    description: 'For rent and other capital projects',
  },
  {
    title: 'Youth and Young Adults',
    accountNumber: '5700124129',
    description: '',
  },
];

export default function PaymentInfo() {
  return (
    <Container
      id="payment-info"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          Church Payment Information
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All forms of offerings can now be paid directly into the church accounts. Please find the account details below.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {paymentInfo.map((info, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                background: 'linear-gradient(#033363, #021F3B)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {info.title}
                  </Typography>
                  <Chip
                    icon={<AccountBalanceIcon />}
                    label="Fidelity Bank"
                    size="small"
                    sx={{
                      backgroundColor: 'primary.contrastText',
                      '& .MuiChip-label': {
                        color: 'primary.dark',
                      },
                      '& .MuiChip-icon': {
                        color: 'primary.dark',
                      },
                    }}
                  />
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'grey.200' }}
                >
                  Account Number: {info.accountNumber}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'grey.200' }}
                >
                  {info.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
