import { AgentList } from "./components/agent-list/agent-list";
import { AgentEdit } from "./components/agent-edit/agent-edit";
import { AgentDto } from "../../api/agents/agents.dto";
import { IconButton, Grid, Modal } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './agents.page.scss';

export function AgentsPage() {
  const [editingAgent, setEditingAgent] = useState<AgentDto>();

  const onEditClick = (agent: AgentDto) => {
    setEditingAgent(agent);
  };
  const closeModal = () => setEditingAgent(undefined);

  return <Layout>
    <div className='agents-page-container'>
      <div className='top'>
        <IconButton color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <AgentList onEditClick={onEditClick} />
        </Grid>
      </div>
      <Modal
        open={!!editingAgent}
        onClose={closeModal}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div className='agents-page-modal'>
          {editingAgent && <AgentEdit id={editingAgent._id} onClose={closeModal} />}
        </div>
      </Modal>
    </div>
  </Layout>;
}
