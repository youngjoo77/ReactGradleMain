import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@modules/rootReducer";
import { addCodeList } from "@modules/code/codeModule"
import { CodeInterface } from '@modules/code/codeInterface'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import * as Utils from '@/utils';

interface CustomSelectProps {
    label?: string
    isDisabled: boolean
    isEmptyValue: boolean
    value: any
    onChangeHandler: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
    cdNbr?: string
    items?: CustomSelectItemInterface[]
};

interface CustomSelectItemInterface {
    cdNbr?: string
    cd: string
    cdNm: string
}

type selectEvent = SelectChangeEvent;

const CustomSelectbox = React.memo(({
    isDisabled,
    isEmptyValue,
    value,
    onChangeHandler,
    cdNbr,
    items
}: CustomSelectProps) => {
    const dispatch = useDispatch();
    const codeList = useSelector((state: RootState) => state.codeList.codeList);

    const codeSaveHandler = React.useCallback(
        (code: CodeInterface) => {
            const newCodeList = Object.assign([], codeList);

            setTimeout(() => {
                const codeItem = codeList.find(obj => {
                    return obj.cdNbr === cdNbr;
                });

                if (codeList && !codeItem) {
                    newCodeList.push(code);
                    dispatch(addCodeList({ codeList: newCodeList }));
                }
            }, 0);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [codeList, dispatch]
    );

    if (!Utils.StringUtil.isNull(cdNbr)) {
        let code;
        if (codeList) {
            // codeList 에 해당 code 가 있는지 확인 한다. 존재 한다면 해당 코드를 return 한다.
            code = codeList.find(obj => {
                return obj.cdNbr === cdNbr;
            });
        }
        else {
            code = null;
        }

        if (code) {
            if (Array.isArray(code.children)) {
                items = [];
                // eslint-disable-next-line array-callback-return
                code.children.map((item) => {
                    items?.push(item);
                });
            }
        }
        else {
            items = [];
            // axios 코드조회
            if (cdNbr === '10005') {
                const item: CodeInterface = {
                    cdNbr: cdNbr, cdNbrNm: '언어코드', children: [
                        { cdNbr: cdNbr, cd: 'en', cdNm: '영어' },
                        { cdNbr: cdNbr, cd: 'ko', cdNm: '한국어' },
                        { cdNbr: cdNbr, cd: 'zh', cdNm: '중국어' }
                    ]
                };

                items.push({ cdNbr: cdNbr, cd: 'en', cdNm: '영어' });
                items.push({ cdNbr: cdNbr, cd: 'ko', cdNm: '한국어' });
                items.push({ cdNbr: cdNbr, cd: 'zh', cdNm: '중국어' });

                codeSaveHandler(item);
            }
            else if (cdNbr === '10000') {
                const item: CodeInterface = {
                    cdNbr: cdNbr, cdNbrNm: '여부', children: [
                        { cdNbr: cdNbr, cd: 'Y', cdNm: '여' },
                        { cdNbr: cdNbr, cd: 'N', cdNm: '부' }
                    ]
                };

                items.push({ cdNbr: cdNbr, cd: 'Y', cdNm: '여' });
                items.push({ cdNbr: cdNbr, cd: 'N', cdNm: '부' });
                codeSaveHandler(item);
            }

        }
    }

    return (
        <FormControl size="small" sx={{ minWidth: 120 }} disabled={isDisabled} fullWidth>
            <Select
                displayEmpty
                value={value}
                onChange={onChangeHandler}
            >
                {
                    isEmptyValue
                        ? <MenuItem value=""><em>None</em></MenuItem>
                        : null
                }

                {
                    items?.map((item: CustomSelectItemInterface) => (
                        <MenuItem
                            key={`coustom-select-item-key-${item.cd}`}
                            value={item.cd}
                        >
                            {item.cdNm}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
})

const CustomSelectboxWithLabel = React.memo(({
    label,
    isDisabled,
    isEmptyValue,
    value,
    onChangeHandler,
    cdNbr,
    items
}: CustomSelectProps) => {
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
                <CustomSelectbox
                    value={value}
                    onChangeHandler={onChangeHandler}
                    isDisabled={isDisabled}
                    isEmptyValue={isEmptyValue}
                    items={items}
                    cdNbr={cdNbr}
                />
            </Grid>
        </Grid>
    )
})

export type { selectEvent }
export { CustomSelectbox, CustomSelectboxWithLabel }