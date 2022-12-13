import Container from "@mui/material/Container";
import { ReactNode } from "react";
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import './layout.scss';

export function Layout({ children }: { children: ReactNode }) {
  return <div className='layout-container'>
    <Header />
    <div className='bottom'>
      <Sidebar />
      <div className='right'>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <div className='content'>
            {children}
          </div>
        </Container>
      </div>
    </div>
  </div>
}
