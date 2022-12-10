import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { handleSubmit, control } = useForm<LoginFormData>();

  return <Grid container justifyContent='center' alignContent='center'>
    <form>
      <Grid mb={2} display='flex' alignItems='center' justifyContent='center'>
        <Logo width={64} height={64} />
      </Grid>
      <Grid mb={2} display='flex' alignItems='center' justifyContent='center'>
        <Typography mr={2} variant='h5'>Router Monitor</Typography>
      </Grid>
      <Grid mb={1}>
        <Controller
          name={"username"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value || ''} required variant='outlined' label='Username' aria-describedby='username' />
          )}
        />
      </Grid>
      <Grid mb={1}>
        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value || ''} required variant='outlined' label='Password' aria-describedby='password' />
          )}
        />
      </Grid>
      <Grid mb={1}>
        <Button onClick={handleSubmit(onSubmit)} fullWidth variant='contained'>Login</Button>
      </Grid>
    </form>
  </Grid>;
}
