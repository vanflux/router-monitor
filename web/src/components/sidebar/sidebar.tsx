import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { PAGE } from "../../router/pages";
import './sidebar.scss';

export function Sidebar() {
  const history = useHistory();
  return <div className='sidebar-container'>
    <Button onClick={() => history.push(PAGE.AGENTS)} fullWidth variant='outlined'>Agents</Button>
    <Button onClick={() => history.push(PAGE.WIFI_FLIENTS)} fullWidth variant='outlined'>Wifi Clients</Button>
    <Button onClick={() => history.push(PAGE.REPORTS_WIFI_FLIENTS)} fullWidth variant='outlined'>Wifi Clients Report</Button>
    <Button onClick={() => history.push(PAGE.CLIENT_RESTRICTIONS)} fullWidth variant='outlined'>Client Restrictions</Button>
  </div>
}
