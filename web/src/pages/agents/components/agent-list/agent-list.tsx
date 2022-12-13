import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAgentsQuery } from "../../../../features/agents/agents.api";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { AgentDto } from "../../../../features/agents/agents.dto";

export interface AgentListProps {
  onEditClick?: (agent: AgentDto) => void;
}

export function AgentList({ onEditClick }: AgentListProps) {
  const { data: agents } = useAgentsQuery();
  const rows = agents?.map(agent => ({ ...agent, id: agent._id })) || [];

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
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
          const agent = agents?.find(agent => agent._id === String(cell.id));
          if (agent) onEditClick?.(agent);
        };

        return (
          <IconButton onClick={onClick}>
            <EditIcon color='primary' />
          </IconButton>
        );
      },
    },
  ];

  return <DataGrid autoHeight rows={rows} columns={columns} />;
}
