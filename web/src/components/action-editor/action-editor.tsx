import { MenuItem, TextField } from "@mui/material";
import { ReactElement } from "react";
import { ActionDataDto, ActionDto, LogActionDataDto } from "../../api/actions/actions.dto";
import { LogActionDataEditor } from "./components/log-action-editor";
import './action-editor.scss';

export interface ActionEditorProps {
	value: ActionDto;
	onChange: (value?: ActionDto) => void;
}

const types: ({
	type: string,
	label: string,
	render: (value: LogActionDataDto, onChange: (value?: LogActionDataDto) => void) => ReactElement,
})[] = [
	{
		type: 'log',
		label: 'Log',
		render: (value, onChange) => <LogActionDataEditor value={value} onChange={onChange} />,
	}
];

export function ActionEditor({ value, onChange }: ActionEditorProps) {
	const { data } = value || {};
	const { type } = data || {};
	
	const setType = (type: string) => onChange({ ...value, data: { ...data, type } });
	const setData = (data: ActionDataDto) => onChange({ ...value, data });

	const component = types.find(x => x.type === type)?.render(data as any, setData as any);

	return (
		<div className='action-editor-container'>
			<TextField
				select
				fullWidth
				label='Type'
				value={type || ''}
				onChange={(event) => setType?.(event.target.value)}
			>
				{types?.map(({ type, label }) => (
					<MenuItem key={type} value={type}>{label}</MenuItem>
				)) || <MenuItem />}
			</TextField>
			<div className='sub-editor'>
				{component}
			</div>
		</div>
	);
}
