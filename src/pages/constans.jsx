import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const AccordionWrapper = styled('div')(() => ({
  border: '1px solid #ccc',
  borderRadius: '10px',
  overflow: 'hidden',
}));

export const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': {
    borderTop: 0,
  },
  '&:last-child': {
    borderBottom: 0,
  },
}));

export const AccordionSummary = styled(props => (
  <MuiAccordionSummary expandIcon={<PlayArrowIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  color: '#9e9e9e',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#9e9e9e',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: theme.palette.primary.light,
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    color: theme.palette.primary.light,
  },
  '&:hover': {
    color: '#212121',
    // '& .MuiAccordionSummary-expandIconWrapper': {
    //   color: '#212121',
    // },
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
