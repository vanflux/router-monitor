import TreeItem, { TreeItemProps } from "@mui/lab/TreeItem";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BlockIcon from '@mui/icons-material/Block';

export function SidebarItem({ children, label, ...props }: TreeItemProps) {
  return <TreeItem {...props} label={
    <Grid container item alignItems='center' sx={{ height: 30 }}>
      {label}
    </Grid>
  }>
    {children}
  </TreeItem>
}

export function Sidebar() {
  return <Grid width={350} padding={2} sx={{ color: 'primary.contrastText', bgcolor: 'primary.main' }}>
    <Grid my={3} container item>
      <Grid container justifyContent='center'>
        <Typography noWrap variant='h5'>Router Monitor</Typography>
      </Grid>
      <Grid mt={2} container justifyContent='center'>
        <Logo width={64} height={64} fill='white' />
      </Grid>
    </Grid>
    <Divider />
    <Grid my={3} container item>
      {[
        [<PodcastsIcon />, 'Agents'],
        [<PhoneIphoneIcon />, 'Wifi Clients'],
        [<BlockIcon />, 'Restriction'],
      ].map(([icon, text]) =>
        <Button fullWidth color='inherit' variant='text'>
          <Grid padding={0.5} container item>
            {icon}
            <Typography ml={1} color='contrastText'>{text}</Typography>
          </Grid>
        </Button>
      )}
    </Grid>
  </Grid>
}
