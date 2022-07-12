import React from 'react';
import { isMobile } from "react-device-detect";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers";

const Main = () => {

	const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(new Date());
	const displayType = isMobile ? 'mobile' : 'desktop';

	React.useEffect(() => {
		// 날짜가 변경 되었을때 실행 된다.
		console.log(datePickerValue);
		if(datePickerValue) {
			let today = datePickerValue;
			console.log((today.toISOString().split('T')[0]).replace(/-/g, ""));
		}
	}, [datePickerValue]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<CalendarPicker
				date={datePickerValue}
				onChange={(newValue) => {
					setDatePickerValue(newValue);
				}} />
		</LocalizationProvider>
	)
}

export default Main;