import React from "react";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";

const withCheckboxSelect =
  (Component, options, selectedOptions, handleChange, renderOptionLabel) =>
  (props) =>
    (
      <Component
        {...props}
        multiple
        value={selectedOptions}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="All">
          <Checkbox checked={selectedOptions.length === options.length} />
          <ListItemText primary="Select All" />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedOptions.indexOf(option.value) > -1} />
            <ListItemText primary={renderOptionLabel(option)} />
          </MenuItem>
        ))}
      </Component>
    );

export default withCheckboxSelect;
