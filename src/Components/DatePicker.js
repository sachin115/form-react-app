import * as React from "react";
import Stack from "@mui/material/Stack";
import { TextField } from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function MaterialUIDatePickers(props) {
  const { value, handleDateChange, dateErrorText } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          required
          label="Date Of Request"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              error={!!dateErrorText}
              helperText={dateErrorText}
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
