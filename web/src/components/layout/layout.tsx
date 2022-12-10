import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Sidebar } from "../sidebar/sidebar";

export function Layout({ children }: { children: JSX.Element }) {
  return <Grid container item direction='row' wrap='nowrap'>
    <Sidebar />
    <Container>
      {children}
    </Container>
  </Grid>
}
