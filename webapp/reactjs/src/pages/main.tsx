import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { BasicButton } from "@components/button/button"
import { AutoCompleteField, CustomTextField } from "@components/field/field"

interface codeData {
	code: string;
	label: string;
}

const Main = () => {
	const [autoCompleteFieldValue, setAutoCompleteFieldValue] = useState<codeData | null>(null);
	const [customTextFieldValue, setCustomTextFieldValue] = useState("");

	useEffect(() => {
		if(autoCompleteFieldValue) {
			console.log(autoCompleteFieldValue.code);
		}
		
		if(customTextFieldValue) {
			console.log("useEffect customTextFieldValue : " + customTextFieldValue);
		}
		
	}, [autoCompleteFieldValue, customTextFieldValue]);

	const handleAutoCompleteFieldChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: codeData
	) => {
		if (value) {
			setAutoCompleteFieldValue(value);
		}
	};
	
	const handleCustomTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomTextFieldValue(e.target.value)
	}
	
	return (
		<div>
			<div>Main page</div>
			{
				// 버튼 샘플
			}
			<BasicButton component={Link} to="/testPage1">go testPage1</BasicButton>

			<AutoCompleteField
				id="TEST"
				name="TEST"
				code="123455"
				isDisable={false}
				labelType="LC"
				handleChange={handleAutoCompleteFieldChange}
			/>
			
			<CustomTextField
				name='TEST CUSTOM TEXT FIELD'
				value= {customTextFieldValue}
				label="TEST CUSTOM TEXT FIELD"
				onChange={handleCustomTextFieldChange}
			/>
		</div>

	)
}

export default Main;