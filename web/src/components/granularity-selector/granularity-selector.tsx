import { Typography } from "@mui/material";
import Link from "@mui/material/Link/Link";
import './granularity-selector.scss';

export interface GranularitySelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  granularities: { value: number, label: string }[];
}

export function GranularitySelector({ value, onChange, granularities }: GranularitySelectorProps) {
  return (
    <div className='granularity-selector-container'>
      <Typography variant='body2'>Granularity</Typography>
      <div className='granularities'>
        {granularities.map(granularity => (
          <Link
            key={granularity.value}
            onClick={() => onChange?.(granularity.value)}
            variant='body2'
            href="#"
            border={value === granularity.value ? 1 : undefined}
            borderRadius={1}
            paddingX={0.3}
          >{granularity.label}</Link>
        ))}
      </div>
    </div>
  );
}
