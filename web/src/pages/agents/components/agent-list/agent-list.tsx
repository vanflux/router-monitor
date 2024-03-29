import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAgentsQuery } from "../../../../api/agents/agents.api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDDMMYYHHmmss } from "../../../../utils/date-format.util";

export interface AgentListProps {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}

export function AgentList({ onEditClick, onDeleteClick }: AgentListProps) {
  const { data: agents } = useAgentsQuery();
  const rows = agents?.map(agent => ({ ...agent, id: agent._id })) || [];

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
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

  return <DataGrid autoPageSize rows={rows} columns={columns} />;
}
