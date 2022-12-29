import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, useColorScheme } from '@mui/material';

export function ToggleDarkMode() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      sx={{ color: 'white' }}
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
