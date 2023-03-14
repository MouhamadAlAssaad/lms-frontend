import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectButton(props) {
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setData(event.target.value);
  };
  console.log(data);
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label={props.labelName}
          onChange={handleChange}
        >
          {props.options.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectButton;