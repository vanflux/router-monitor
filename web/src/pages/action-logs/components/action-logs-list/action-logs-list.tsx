import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useActionLogsQuery } from "../../../../api/actions/actions.api";
import { formatDDMMYYHHmmss } from "../../../../utils/date-format.util";

export interface ActionLogListProps {}

export function ActionLogList({}: ActionLogListProps) {
  const { data: actionLogs } = useActionLogsQuery();
  const rows = actionLogs?.map(actionLog => ({ ...actionLog, id: actionLog._id })) || [];
  
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id' },
    { field: 'message', headerName: 'Message', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      width: 150,
      valueFormatter: ({ value }: any) => formatDDMMYYHHmmss(value),
    },
  ];

  return <DataGrid
    autoPageSize
    sortModel={[{ field: 'createdAt', sort: 'desc' }]}
    rows={rows}
    columns={columns}
  />;
}
