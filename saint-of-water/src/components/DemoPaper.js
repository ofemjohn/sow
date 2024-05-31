
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  ...theme.typography.body1,
  textAlign: 'center',
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

export default DemoPaper;
