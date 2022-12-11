import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Link from "@mui/material/Link/Link";

export interface GranularitySelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  granularities: { value: number, label: string }[];
}

export function GranularitySelector({ value, onChange, granularities }: GranularitySelectorProps) {
  return (
    <Box sx={{ border: 1, borderRadius: 1, borderColor: 'grey.400' }} paddingX={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <Typography variant='body2'>Granularity</Typography>
      <Grid container gap={1}>
        {granularities.map(granularity => (
          <Link key={granularity.value} onClick={() => onChange?.(granularity.value)} variant='body2' href="#">{granularity.label}</Link>
        ))}
      </Grid>
    </Box>
  );
}
