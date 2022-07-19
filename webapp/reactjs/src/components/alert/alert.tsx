import React from "react";
import Alert, {AlertProps} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export interface AlertInterface {
    open: boolean
    title: string
    content: string
    fnCallBack: any
    alertProps: AlertProps
}

export const CustomAlert = ({customAlert} : {customAlert : AlertInterface}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(customAlert.open);
    }, [customAlert]);

    const closeClickhandler = () => {
        setOpen(!open);
        if(customAlert.fnCallBack) {
            customAlert.fnCallBack(); // 부모함수 호출
        }
    };

    return (
        <Dialog open={open} onClose={closeClickhandler}>
            <Alert
                severity={customAlert.alertProps.severity}
                color={customAlert.alertProps.color}
                role="alert"
                icon={<AccessAlarmIcon />}
                onClose={closeClickhandler}
                closeText="close"
                sx={{
                    
                }}
            >
                <AlertTitle>{customAlert.title}</AlertTitle>
                {customAlert.content}
            </Alert>
        </Dialog>
    )
}