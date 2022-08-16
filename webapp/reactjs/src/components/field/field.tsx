import React from "react";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField, TextFieldProps, IconButton, Tooltip } from "@mui/material";
import { Grid, InputLabel, TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type CustomTextFieldType = {
	tooltip?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal
	isRequired?: boolean;
	onButtonClick?: React.MouseEventHandler<HTMLButtonElement>
} & TextFieldProps;

interface CustomAutoCompleteFieldOptionInterface {
	code: string | number
	label: string
}

interface AutoCompleteFieldInterface {
	id: string
	label?: string;
	code?: string
	isDisable: boolean
	labelType: string
	options: CustomAutoCompleteFieldOptionInterface[]
	isRequired?: boolean;
	tooltip?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal
	value: any
	changeHandler: ((event: React.SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined
}

/**
 * @description tooltip 설정
 * @param tooltip
 * @returns 
 */
const GetTooltip = (tooltip: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | undefined) => {
	if (typeof tooltip !== 'undefined') {
		return tooltip;
	}
	else {
		return '';
	}
}

const CustomTextField = ({
	...props
}: CustomTextFieldType) => {
	return (
		<TextField {...props} fullWidth hiddenLabel size="small" variant="outlined" />
	)
};

const CustomTextFieldWithLabel = ({
	isRequired,
	label,
	tooltip,
	...props
}: CustomTextFieldType) => {
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
				<Tooltip title={GetTooltip(tooltip)} placement="top">
					<InputLabel required={isRequired}>
						{label}
					</InputLabel>
				</Tooltip>
			</Grid>
			<Grid item xs={8}>
				<CustomTextField {...props} />
			</Grid>

		</Grid>
	)
}

const CustomAutoCompleteField = ({
	id,
	isDisable,
	labelType,
	options,
	changeHandler,
	value,
	...props
}: AutoCompleteFieldInterface): React.ReactElement => {
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
			onChange={changeHandler}
			{...props}
			renderInput={(params) => (
				<CustomTextField {...params} fullWidth hiddenLabel />
			)}
			value={value}
		/>
	)
}

const CustomAutoCompleteFieldWithLabel = ({
	id,
	label,
	isDisable,
	labelType,
	options,
	changeHandler,
	value,
	isRequired,
	tooltip,
	...props
}: AutoCompleteFieldInterface) => {
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
				<Tooltip title={GetTooltip(tooltip)} placement="top">
					<InputLabel required={isRequired}>
						{label}
					</InputLabel>
				</Tooltip>
			</Grid>
			<Grid item xs={8}>
				<CustomAutoCompleteField
					id={id}
					isDisable={isDisable}
					labelType={labelType}
					options={options}
					changeHandler={changeHandler}
					value={value}
					{...props}
				/>
			</Grid>

		</Grid>
	)
}

const CustomTextAreaField = ({
	...props
}: CustomTextFieldType) => {
	return (
		<CustomTextField
			{...props}
			multiline
		/>
	)
}

const CustomTextAreaFieldWithLabel = ({
	isRequired,
	label,
	tooltip,
	...props
}: CustomTextFieldType) => {
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
				<InputLabel required={isRequired}>
					{label}
				</InputLabel>
			</Grid>
			<Grid item xs={8}>
				<CustomTextAreaField {...props} />
			</Grid>

		</Grid>
	)
}

const CustomTextareaAutosizeField = () => {
	return (
		<TextareaAutosize
			aria-label="minimum height"
			minRows={3}

			placeholder="Minimum 3 rows"
			style={{ width: 200 }}
		/>
	);
}

const CustomSearchField = ({
	onButtonClick,
	...props
}: CustomTextFieldType) => {
	return (
		<CustomTextField
			type='search'
			{...props}
			InputProps={{
				endAdornment: (
					<IconButton sx={{ mr: -1.5 }} onClick={onButtonClick}>
						<SearchIcon />
					</IconButton>
				)
			}}
		/>
	)
}

const CustomSearchFieldWithLabel = ({
	isRequired,
	label,
	tooltip,
	onButtonClick,
	...props
}: CustomTextFieldType) => {
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
				<Tooltip title={GetTooltip(tooltip)} placement="top">
					<InputLabel required={isRequired}>
						{label}
					</InputLabel>
				</Tooltip>
			</Grid>
			<Grid item xs={8}>
				<CustomSearchField
					onButtonClick={onButtonClick}
					{...props}
				/>
			</Grid>
		</Grid>
	)
}

export type { CustomAutoCompleteFieldOptionInterface };
export {
	CustomTextField, CustomTextFieldWithLabel,
	CustomAutoCompleteField, CustomAutoCompleteFieldWithLabel,
	CustomTextAreaField, CustomTextAreaFieldWithLabel, CustomTextareaAutosizeField,
	CustomSearchField, CustomSearchFieldWithLabel
};
