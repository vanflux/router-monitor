import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useClientRestrictionsQuery } from "../../../../api/client-restrictions/client-restrictions.api";
import { useWifiClientsQuery } from "../../../../api/wifi-clients/wifi-clients.api";
import { ActiveLabel } from "../../../../components/active-label/active-label";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDDMMYYHHmmss } from "../../../../utils/date-format.util";

export interface ClientRestrictionListProps {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}

export function ClientRestrictionList({ onEditClick, onDeleteClick }: ClientRestrictionListProps) {
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
      renderCell: ({ value }) => <ActiveLabel value={value} />
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      flex: 1,
      valueFormatter: ({ value }: any) => formatDDMMYYHHmmss(value),
    },
    {
      field: 'updatedAt',
      headerName: 'Update Date',
      flex: 1,
      valueFormatter: ({ value }: any) => formatDDMMYYHHmmss(value),
    },
    {
      field: '',
      headerName: 'Actions',
      flex: 1,
      renderCell(cell) {
        return <>
          <IconButton onClick={() => onEditClick?.(String(cell.id))}>
            <EditIcon color='primary' />
          </IconButton>
          <IconButton onClick={() => onDeleteClick?.(String(cell.id))}>
            <DeleteIcon color='error' />
          </IconButton>
        </>;
      },
    },
  ];

  return  <DataGrid autoPageSize rows={rows} columns={columns} />;
}
