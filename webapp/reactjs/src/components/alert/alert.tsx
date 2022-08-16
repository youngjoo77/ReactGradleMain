import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * description:
 * - alert property
 * 
 */
interface CustomAlertInterface {
    isOpen: boolean
    severity: 'error' | 'warning' | 'info' | 'success'
    title: string
    content: string
    fnCallBack: any
}

interface CustomSnackbarInterface {
    isOpen: boolean
    message: string
}

/**
 * @description
 * alert 을 생성 한다.
 * 
 * note:
 * - severity: alert 유형 ('error' | 'warning' | 'info' | 'success')
 */
const CustomAlert = ({ customAlertProp }: { customAlertProp: CustomAlertInterface }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(customAlertProp.isOpen);
    }, [customAlertProp.isOpen]);

    const closeClickhandler = () => {
        setOpen(false);
        if (customAlertProp.fnCallBack) {
            customAlertProp.fnCallBack(); // 부모함수 호출
        }
    };

    return (
        <Dialog
            open={open}
            onClose={closeClickhandler}
        >
            <Alert
                severity={customAlertProp.severity}
                color='info'
                role="alert"
                onClose={closeClickhandler}
                closeText="close"
            >
                <AlertTitle>{customAlertProp.title}</AlertTitle>
                {customAlertProp.content}
            </Alert>
        </Dialog>
    )
}

const CustomSnackbar = ({ isOpen, message }: CustomSnackbarInterface) => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    React.useEffect(() => {
        setSnackbarOpen(isOpen);
    }, [isOpen]);

    const snackbarCloseHandler = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={snackbarCloseHandler}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={snackbarCloseHandler}
            message={message}
            action={action}
        />
    )
}

export type {
    CustomAlertInterface
}

export {
    CustomAlert,
    CustomSnackbar
}