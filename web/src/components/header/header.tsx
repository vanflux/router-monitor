import { Typography } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ToggleDarkMode } from "../toggle-dark-mode/toggle-dark-mode";
import './header.scss';

export function Header() {
  const version = import.meta.env.VITE_VERSION || 'dev';

  return <div className='header-container'>
    <div className='center'>
      <Logo width={32} height={32} fill='white' />
      <Typography ml={1} noWrap variant='h5'>Router Monitor</Typography>
      <Typography ml={1} variant='body2'>{version}</Typography>
    </div>
    <div className='right'>
      <ToggleDarkMode />
    </div>
  </div>
}
