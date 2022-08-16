import React from 'react';
import { FormControlLabel, Checkbox, Grid, InputLabel } from '@mui/material';

interface CustomCheckboxInterface {
    isDisabled: boolean
    isChecked: boolean
    isRequired?: boolean
    value: 'Y' | 'N'
    inputLabel?: string
    label: string
    checkboxChangeHandler: (event: React.SyntheticEvent<Element, Event>, checked: boolean) => void
}

/**
 * @description 체크박스컴포넌트
 * @param item 
 * @returns 체크박스컴포넌트
 */
const CustomCheckbox = (item: CustomCheckboxInterface) => {
    return (
        <FormControlLabel
            control={<Checkbox
                defaultChecked={item.isChecked}
            />}
            label={item.label}
            disabled={item.isDisabled}
            value={item.value}
            onChange={(event: React.SyntheticEvent<Element, Event>, checked: boolean) => { item.checkboxChangeHandler(event, checked) }}
        />

    )
}

const CustomCheckboxWithLabel = (item: CustomCheckboxInterface) => {
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
                <InputLabel required={item.isRequired}>
                    {item.inputLabel}
                </InputLabel>
            </Grid>
            <Grid item xs={8}>
                <FormControlLabel
                    control={<Checkbox
                        defaultChecked={item.isChecked}
                    />}
                    label={item.label}
                    disabled={item.isDisabled}
                    value={item.value}
                    onChange={(event: React.SyntheticEvent<Element, Event>, checked: boolean) => { item.checkboxChangeHandler(event, checked) }}
                />
            </Grid>

        </Grid>
    )
}

export type {
    CustomCheckboxInterface
}

export {
    CustomCheckbox, CustomCheckboxWithLabel
}