import { Typography } from "@mui/material";
import './active-label.scss';

export interface ActiveLabelProps {
  value: boolean;
}

export function ActiveLabel({ value }: ActiveLabelProps) {
  return (
    <div className='active-label-container'>
      <div className={value ? 'active' : 'inactive'} />
      <Typography variant='body2' className='text'>{value ? 'Yes' : 'No'}</Typography>
    </div>
  );
}
