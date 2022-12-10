import { TreeView } from "@mui/lab";
import TreeItem, { TreeItemProps } from "@mui/lab/TreeItem";
import { Divider, Grid, MenuItem, Select, Typography } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  return <Grid item padding={2} sx={{ color: 'primary.contrastText', bgcolor: 'primary.main' }}>
    <Grid my={2} container item>
      <Grid container justifyContent='center'>
        <Typography noWrap variant='h5'>Router Monitor</Typography>
      </Grid>
      <Grid container justifyContent='center'>
        <Logo width={64} height={64} fill='white' />
      </Grid>
    </Grid>
    <Divider />
    <Grid my={2} container item>
      <Grid container justifyContent='center'>
        <Typography mb={1} variant='subtitle1'>Agents:</Typography>
      </Grid>
      <Select sx={{ bgcolor: 'white' }} fullWidth>
        <MenuItem value='1'>Agent 1</MenuItem>
        <MenuItem value='2'>Agent 2</MenuItem>
        <MenuItem value='3'>Agent 3</MenuItem>
      </Select>
    </Grid>
    <Divider />
    <Grid my={2} container item>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <SidebarItem nodeId="1" label="Info" />
        <SidebarItem nodeId="1" label="Wifi Clients">
          <SidebarItem nodeId="2" label="RSSI Report" />
        </SidebarItem>
        <SidebarItem nodeId="1" label="Restriction">
          <SidebarItem nodeId="2" label="Mac Blocking" />
        </SidebarItem>
      </TreeView>
    </Grid>
  </Grid>
}
