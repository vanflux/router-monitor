import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ClientRestrictionActiveActionDataDto } from "../../../api/actions/actions.dto";
import { WifiClientSelector } from "../../wifi-client-selector/wifi-client-selector";

export interface ClientRestrictionActiveActionDataEditorProps {
	value: ClientRestrictionActiveActionDataDto;
	onChange: (value: ClientRestrictionActiveActionDataDto) => void;
}

export function ClientRestrictionActiveActionDataEditor({ value, onChange }: ClientRestrictionActiveActionDataEditorProps) {
	const { clientId, active } = value || {};
	const setClientId = (clientId: string) => onChange({ ...value, clientId });
	const setActive = (active: boolean) => onChange({ ...value, active });
	
	return (
		<div>
			<WifiClientSelector
				selectIfEmpty
				onChange={client => setClientId(client?._id!)}
				value={clientId}
			/>
			<FormControlLabel control={<Checkbox checked={active || false} onChange={e => setActive(e.target.checked)} />} label="Active" />
		</div>
	);
}
