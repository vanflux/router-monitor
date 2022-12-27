import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSchedulesQuery } from "../../../../api/schedules/schedules.api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActiveLabel } from "../../../../components/active-label/active-label";
import { formatDDMMYYHHmmss } from "../../../../utils/date-format.util";

export interface ScheduleListProps {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}

export function ScheduleList({ onEditClick, onDeleteClick }: ScheduleListProps) {
  const { data: schedules } = useSchedulesQuery();
  const rows = schedules?.map(schedule => ({ ...schedule, id: schedule._id })) || [];

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'cron', headerName: 'Cron', flex: 1 },
    {
      field: 'active',
      headerName: 'Active',
      flex: 1,
      renderCell: ({ value }: any) => <ActiveLabel value={value} />,
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
      headerName: 'Schedules',
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
