import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAuthLoginAdminMutation } from '../../features/auth/auth.api';
import { PAGE } from '../../router/pages';
import { LoginForm } from './components/login-form';

export function LoginPage() {
  const history = useHistory();
  const { mutate } = useAuthLoginAdminMutation(() => history.replace(PAGE.REPORTS_WIFI_FLIENTS));
  return <Grid container>
    <LoginForm onSubmit={mutate} />
  </Grid>;
}
