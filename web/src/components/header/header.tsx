import { Grid, Typography } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/logo.svg';

export function Header() {
  return <Grid height={70} container justifyContent='center' alignItems='center' sx={{ color: 'primary.contrastText', bgcolor: 'primary.main' }}>
    <Logo width={32} height={32} fill='white' />
    <Typography ml={1} noWrap variant='h5'>Router Monitor</Typography>
  </Grid>
}
