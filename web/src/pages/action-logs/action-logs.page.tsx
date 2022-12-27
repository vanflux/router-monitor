import { ActionLogList } from "./components/action-logs-list/action-logs-list";
import { Grid } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import './action-logs.page.scss';

export function ActionLogsPage() {
  return <Layout>
    <div className='action-logs-page-container'>
      <Grid container direction='column' flex={1} my={2} gap={1}>
        <ActionLogList />
      </Grid>
    </div>
  </Layout>;
}
