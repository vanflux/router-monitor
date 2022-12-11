import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Header } from "../header/header";

export function Layout({ children }: { children: JSX.Element }) {
  return <Grid container item direction='column' wrap='nowrap'>
    <Header />
    <Container>
      {children}
    </Container>
  </Grid>
}
