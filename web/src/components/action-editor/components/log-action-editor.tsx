import { TextField } from "@mui/material";
import { LogActionDataDto } from "../../../api/actions/actions.dto";

export interface LogActionDataEditorProps {
	value: LogActionDataDto;
	onChange: (value: LogActionDataDto) => void;
}

export function LogActionDataEditor({ value, onChange }: LogActionDataEditorProps) {
	const { message } = value || {};
	const setMessage = (message: string) => onChange({ ...value, message });
	
	return (
		<div>
			<TextField
				fullWidth
				label='Message'
				value={message || ''}
				onChange={(event) => setMessage?.(event.target.value)}
			/>
		</div>
	);
}
