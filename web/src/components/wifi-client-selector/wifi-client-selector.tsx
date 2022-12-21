import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField/TextField";
import { useEffect } from "react";
import { useWifiClientsQuery } from "../../api/wifi-clients/wifi-clients.api";
import { WifiClientDto } from "../../api/wifi-clients/wifi-clients.dto";

export interface WifiClientSelectorProps {
  value?: string;
  onChange?: (value?: WifiClientDto) => void;
  selectIfEmpty?: boolean;
}

export function WifiClientSelector({ value, onChange, selectIfEmpty }: WifiClientSelectorProps) {
  const { data } = useWifiClientsQuery();

  useEffect(() => {
    if (selectIfEmpty && !value && data?.length) {
      onChange?.(data[0]);
    }
  }, [data, value, selectIfEmpty]);

  return (
    <TextField
      select
      label='Wifi Client'
      value={value || ''}
      onChange={(event) => {
        const _id = event.target.value;
        const wifiClient = data?.find(wifiClient => wifiClient._id === _id);
        onChange?.(wifiClient);
      }}
    >
      {data?.map(wifiClient => (
        <MenuItem key={wifiClient._id} value={wifiClient._id}>{wifiClient.name}</MenuItem>
      )) || <MenuItem />}
    </TextField>
  );
}
