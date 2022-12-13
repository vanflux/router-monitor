import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField/TextField";
import { useEffect } from "react";
import { useAgentsQuery } from "../../features/agents/agents.api";
import { AgentDto } from "../../features/agents/agents.dto";

export interface AgentSelectorProps {
  value?: string;
  onChange?: (value?: AgentDto) => void;
  selectIfEmpty?: boolean;
}

export function AgentSelector({ value, onChange, selectIfEmpty }: AgentSelectorProps) {
  const { data } = useAgentsQuery();

  useEffect(() => {
    if (selectIfEmpty && !value && data?.length) {
      onChange?.(data[0]);
    }
  }, [data, value, selectIfEmpty]);

  return (
    <TextField
      select
      label='Agent'
      value={value || ''}
      onChange={(event) => {
        const _id = event.target.value;
        const agent = data?.find(agent => agent._id === _id);
        onChange?.(agent);
      }}
    >
      {data?.map(agent => (
        <MenuItem key={agent._id} value={agent._id}>{agent.name}</MenuItem>
      )) || <MenuItem />}
    </TextField>
  );
}
