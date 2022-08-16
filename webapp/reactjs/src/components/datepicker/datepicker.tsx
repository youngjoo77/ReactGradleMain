import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomTextField } from '@components/field/field';
import { ko, enUS, zhCN } from "date-fns/esm/locale";
import * as Utils from '@/utils';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
// import { useSelector } from "react-redux";
// import { RootState } from "@modules/rootReducer";

interface CustomDatePickerInterface {
	label?: string
	value: Date | null
	minValue?: Date | null
	maxValue?: Date | null
	type: 'normal' | 'from' | 'to'
	changeHandler: (value: Date | null, keyboardInputValue?: string) => void;
}

/**
 * @description datepicker 컴포넌트
 * @param CustomDatePickerInterface 
 * @returns datepicker 컴포넌트
 */
const CustomDatePicker = ({
	value,
	minValue,
	maxValue,
	type,
	changeHandler
}: CustomDatePickerInterface) => {
	const mltLng = 'ko';
	const lng = mltLng === "ko" ? ko : mltLng === "en" ? enUS : mltLng === "zh" ? zhCN : ko;
	// const themeMode = useSelector((state: RootState) => state.theme.mode);

	const getDatePicker = () => {
		return (
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lng}>
				<DatePicker
					value={value}
					onChange={(newValue) => {
						changeHandler(newValue);
					}}
					renderInput={(params) => <CustomTextField {...params} />}
					componentsProps={{
						actionBar: {
							actions: ['today']
						},
					}}
					inputFormat={Utils.DateUtil.inputDateformat}
					acceptRegex={/^d{4}-d{2}-d{2}$/}
					disableMaskedInput
					minDate={minValue !== null ? minValue : Utils.DateUtil.stringToDate('19000101', 'YYYYMMDD')}
					maxDate={maxValue !== null ? maxValue : Utils.DateUtil.stringToDate('99991231', 'YYYYMMDD')}
				/>
			</LocalizationProvider>
		)
	}

	if (!Utils.StringUtil.isNull(type)) {
		return getDatePicker();
	}
	else {
		return <div />;
	}
}

const CustomDatePickerWithLabel = ({
	label,
	value,
	minValue,
	maxValue,
	type,
	changeHandler
}: CustomDatePickerInterface) => {
	return (
		<Grid
			container
			direction="row"
			alignItems="center"
			justifyContent="flex-start"
			spacing={2}
			padding={0.5}
			columns={12}
		>
			<Grid item xs={4}>
				<InputLabel>
					{label}
				</InputLabel>
			</Grid>
			<Grid item xs={8}>
				<CustomDatePicker
					type={type}
					value={value}
					minValue={minValue}
					maxValue={maxValue}
					changeHandler={changeHandler}
				/>
			</Grid>
		</Grid>
	)
}

interface CustomStaticDatePickerInterface {
	type: 'day' | 'month' | 'year'
	value: Date | null
	changeHandler: any
	readOnly: boolean
	minDate: Date | null
}

const CustomStaticDatePicker = ({ params }: { params: CustomStaticDatePickerInterface }) => {

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
export type { CustomStaticDatePickerInterface }
export { CustomDatePicker, CustomDatePickerWithLabel, CustomStaticDatePicker }