import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/material";
export default function CalendarCard() {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            "DatePicker",
            "MobileDatePicker",
            "DesktopDatePicker",
            "StaticDatePicker",
          ]}
        >
          <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
