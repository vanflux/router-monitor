import { IconButton, InputAdornment, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function PasswordTextInput(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggle = () => setShowPassword(!showPassword);
  
  return <TextField
    {...props}
    type={showPassword ? 'text' : 'password'} 
    InputProps={{
      ...props?.InputProps,
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggle}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
}
