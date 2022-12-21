import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useClientRestrictionsQuery } from "../../../../api/client-restrictions/client-restrictions.api";
import { ClientRestrictionDto } from "../../../../api/client-restrictions/client-restrictions.dto";
import { useWifiClientsQuery } from "../../../../api/wifi-clients/wifi-clients.api";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import "./client-restriction-list.scss";
import { Typography } from "@mui/material";

export interface ClientRestrictionListProps {
  onEditClick?: (clientRestriction: ClientRestrictionDto) => void;
}

export function ClientRestrictionList({ onEditClick }: ClientRestrictionListProps) {
  const { data: wifiClients } = useWifiClientsQuery();
  const { data: clientRestrictions } = useClientRestrictionsQuery();
  const rows = clientRestrictions?.map(clientRestriction => ({ ...clientRestriction, id: clientRestriction._id })) || [];

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    {
      field: 'clientId',
      headerName: 'Client Id',
      flex: 1,
      valueFormatter: ({ value }: any) => wifiClients?.find(wifiClient => wifiClient._id === value)?.name,
    },
    {
      field: 'active',
      headerName: 'Active',
      flex: 1,
      renderCell: ({ value }) => <div className='active-cell'>
        <div className={value ? 'active' : 'inactive'} />
        <Typography variant='body2' className='text'>{value ? 'Yes' : 'No'}</Typography>
      </div>,
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      flex: 1,
      valueFormatter: ({ value }: any) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      field: 'updatedAt',
      headerName: 'Update Date',
      flex: 1,
      valueFormatter: ({ value }: any) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      field: '',
      headerName: 'Actions',
      flex: 1,
      renderCell(cell) {
        const onClick = () => {
          const clientRestriction = clientRestrictions?.find(clientRestriction => clientRestriction._id === String(cell.id));
          if (clientRestriction) onEditClick?.(clientRestriction);
        };

        return (
          <IconButton onClick={onClick}>
            <EditIcon color='primary' />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className='client-restriction-list-container'>
      <DataGrid autoHeight rows={rows} columns={columns} />
    </div>
  );
}
