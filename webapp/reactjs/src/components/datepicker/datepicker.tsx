import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers";
import { ko } from "date-fns/esm/locale";
import { isMobile } from "react-device-detect";

export const CustomCalendarPicker = ({ datePickerValue, datePickerChangeHandler }: { datePickerValue: any, datePickerChangeHandler: any }) => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ko}
        >
            <CalendarPicker
                date={datePickerValue}
                onChange={(newValue) => {
                    datePickerChangeHandler(newValue);
                }}
            />
        </LocalizationProvider>
    )
}

export interface CustomStaticDatePickerInterface {
    type: 'day' | 'month' | 'year'
    value: Date | null
    changeHandler: any
    readOnly: boolean
    minDate: Date | null
}

export const CustomStaticDatePicker = ({ params }: { params: CustomStaticDatePickerInterface }) => {
    const displayType = isMobile ? 'mobile' : 'desktop';
    console.log(displayType);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ko}
            
        >
            <StaticDatePicker
                displayStaticWrapperAs={'desktop'}
                openTo={params.type}
                value={params.value}
                onChange={(newValue) => {
                    params.changeHandler(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
                componentsProps={{
                    actionBar: {
                        actions: ['today'],
                    },
                }}
                inputFormat={'yyyy-MM-dd'}
                acceptRegex={/^d{4}-d{2}-d{2}$/}
                minDate={
                    params.minDate !== null ? params.minDate : null
                }
            />
        </LocalizationProvider>
    );
}