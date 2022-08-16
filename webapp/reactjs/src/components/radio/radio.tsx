import { ChangeEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';

interface CustomRadioInterface {
    isDisabled: boolean
    vlaue: string
    label: string
}

interface CustomRadioGroupInterface {
    label?: string
    radioChangeHandler: ((event: ChangeEvent<HTMLInputElement>, value: string) => void) | undefined
    defaultValue: string
    items: CustomRadioInterface[]
}

const CustomRadio = ({
    radioChangeHandler,
    defaultValue,
    items
}: CustomRadioGroupInterface) => {
    return (
        <FormControl
            fullWidth
        >
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={radioChangeHandler}
                defaultValue={defaultValue}
            >
                {
                    items.map((item: CustomRadioInterface) => (
                        <FormControlLabel
                            key={`custom-radio-item-key-${item.vlaue}`}
                            value={item.vlaue}
                            disabled={item.isDisabled}
                            control={<Radio />}
                            label={item.label}
                        />
                    ))
                }

            </RadioGroup>
        </FormControl >
    )
}

const CustomRadioWithLabel = ({
    label,
    radioChangeHandler,
    defaultValue,
    items
}: CustomRadioGroupInterface) => {
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
                <CustomRadio
                    defaultValue={defaultValue}
                    radioChangeHandler={radioChangeHandler}
                    items={items}
                />
            </Grid>
        </Grid>
    )
}

export { CustomRadio, CustomRadioWithLabel }