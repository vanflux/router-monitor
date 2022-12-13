import { Typography } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.scss';

export function Header() {
  return <div className='header-container'>
    <Logo width={32} height={32} fill='white' />
    <Typography ml={1} noWrap variant='h5'>Router Monitor</Typography>
  </div>
}
