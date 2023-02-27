import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIDatePickers(props) {
  const { value, handleDateChange, dateErrorText } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        required
        fullWidth
        label="Date Of Request"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        error={dateErrorText}
        helperText={dateErrorText}
        value={value}
        size="small"
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
