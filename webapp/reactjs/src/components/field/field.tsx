import { Autocomplete, TextField, TextFieldProps } from "@mui/material";


interface AutoCompleteFieldProps<T> {
	id: string
	name: string
	code: string
	isDisable: boolean
	labelType: string
	handleChange: any
};

export const AutoCompleteField = <T extends {}>({
	id,
	name,
	code,
	isDisable,
	labelType,
	handleChange
}: AutoCompleteFieldProps<T>): React.ReactElement => {
	/**
	 * 전달 받은 code 로 code 목록을 조회 한후 option 을 생성 한다.
	 */
	const options = [
		{ code: 'AD', label: 'Andorra' },
		{
			code: 'AE',
			label: 'United Arab Emirates'
		},
		{ code: 'AF', label: 'Afghanistan' },
		{
			code: 'AG',
			label: 'Antigua and Barbuda'
		}
	]

	const setOptionLabel = (option: any) => {
		switch (labelType) {
			case "L": return option.label;
			case "C": return option.code;
			case "LC": return option.label + " (" + option.code + ")";
			case "CL": return "(" + option.code + ") " + option.labe;
			default: return option.label;
		}
	}

	return (
		<Autocomplete
			autoHighlight
			getOptionLabel={(option) =>
				setOptionLabel(option)
			}
			isOptionEqualToValue={(option, value) => option.code === value.code}
			id={id}
			options={options}
			disabled={isDisable}
			fullWidth
			onChange={handleChange}
			renderInput={(params) => (
				<TextField {...params} label={name} fullWidth />
			)}
		/>
	)
}

type CustomTextFieldProps = {
  subLabel?: string;
  tooltip?: string;
} & TextFieldProps;

export const CustomTextField = ({
  label,
  subLabel,
  tooltip,
  ...props
}: CustomTextFieldProps) => {
  return (
    <>
      <TextField {...props} fullWidth />
    </>
  );
};