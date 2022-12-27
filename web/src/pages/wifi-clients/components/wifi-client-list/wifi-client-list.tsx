import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useWifiClientsQuery } from "../../../../api/wifi-clients/wifi-clients.api";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";

export interface WifiClientListProps {
  onEditClick?: (id: string) => void;
}

export function WifiClientList({ onEditClick }: WifiClientListProps) {
  const { data: wifiClients } = useWifiClientsQuery();
  const rows = wifiClients?.map(wifiClient => ({ ...wifiClient, id: wifiClient._id })) || [];

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1, valueGetter: ({ row }) => row.name || row.mac },
    { field: 'mac', headerName: 'Mac', flex: 1 },
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
        return (
          <IconButton onClick={() => onEditClick?.(String(cell.id))}>
            <EditIcon color='primary' />
          </IconButton>
        );
      },
    },
  ];

  return <DataGrid autoPageSize rows={rows} columns={columns} />;
}
