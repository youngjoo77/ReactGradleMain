import React from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import { Typography } from '@mui/material';


interface CustomTabsInterface extends TabsProps {
    value: string,
    onChange: (event: React.SyntheticEvent, newValue: string) => void
}

interface CustomTabPanelInterface {
    tabPanelKey?: string
    id: string
    tabValue: string
    tabPanelValue: string
    children: React.ReactElement
}

const CustomTabs = ({
    value,
    onChange,
    ...props
}: CustomTabsInterface) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            {...props}
        >
            {props.children}
        </Tabs>
    )
}

const getVisibilityStyle = (hiddenCondition: boolean) => {
    if (hiddenCondition) {
        return {
            display: 'none',
            height: 0,
        };
    }
    else {
        return {
            display: 'block',
            height: 'inherit'
        };
    }
};

const CustomTabPanel = ({
    tabPanelKey,
    id,
    tabValue,
    tabPanelValue,
    children
}: CustomTabPanelInterface) => {

    return (
        <Typography
            key={tabPanelKey}
            component="div"
            role="tabpanel"
            id={id}
            aria-labelledby={`tab-panel-aria-labelledby-${id}`}
            style={getVisibilityStyle(tabValue !== tabPanelValue)}
        >
            {children}
        </Typography>
    )
}

export { CustomTabs, CustomTabPanel }