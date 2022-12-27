import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useActionLogsQuery } from "../../../../api/actions/actions.api";
import moment from "moment";

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
      width: 120,
      valueFormatter: ({ value }: any) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
    },
  ];

  return <DataGrid autoPageSize rows={rows} columns={columns} />;
}
