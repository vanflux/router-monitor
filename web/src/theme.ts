import { experimental_extendTheme as extendTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: blue[700],
        },
        background: {
          default: '#1E1E1E',
        },
        common: {
          background: '#181818',
        },
        text: {
          primary: 'lightgrey'
        }
      }
    }
  }
});
