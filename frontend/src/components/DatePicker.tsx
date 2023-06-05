import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import ReactDatePicker from "react-datepicker";
import EventIcon from "@mui/icons-material/Event";

interface DatePickerProps{
  [key: string]: any;
}

const DatePicker = (props: DatePickerProps) => {
  /* --------------------------------
     TIMEPICKER
   --------------------------------*/
  //disable time before current time//can be used to filter passed date + today
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  //disable date before today//don't disable today
  const filterPassedDate = (date: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate.getDate() === new Date().getDate()) {
      return currentDate.getTime() > selectedDate.getTime();
    }
    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <ReactDatePicker
      customInput={
        <TextField
          {...props}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
        />
      }
      selected={props.selectedDate}
      onChange={(date) => props.setSelectedDate(date)}
      showTimeSelect
      isClearable //adds clear btn
      //showIcon //works only with no custom input
      closeOnScroll={true}
      filterTime={props.filterTime || filterPassedTime}
      filterDate={props.filterDate || filterPassedDate}
      dateFormat="dd/MM/yyyy h:mm aa"
      placeholderText="Pick date"
      timeIntervals={15} //remove prop for default = 30min
      //   className="form-control form-control-sm mb-3"
      //timeCaption="time" //default = 'Time'
      {...props}
    />
  );
};

export default DatePicker;
