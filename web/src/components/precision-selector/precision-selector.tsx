import { Typography } from "@mui/material";
import Link from "@mui/material/Link/Link";
import './precision-selector.scss';

export interface PrecisionSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  precisions: { value: number, label: string }[];
}

export function PrecisionSelector({ value, onChange, precisions }: PrecisionSelectorProps) {
  return (
    <div className='precision-selector-container'>
      <Typography variant='body2'>Precision</Typography>
      <div className='precisions'>
        {precisions.map(precision => (
          <Link
            key={precision.value}
            onClick={() => onChange?.(precision.value)}
            variant='body2'
            href="#"
            border={value === precision.value ? 1 : undefined}
            borderRadius={1}
            paddingX={0.3}
          >{precision.label}</Link>
        ))}
      </div>
    </div>
  );
}
