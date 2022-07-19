import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CustomBasicButton } from "@components/button/button"
import { CustomAlert, AlertInterface } from '@components/alert/alert'

interface State {
    value: string
    showPassword: boolean
    error: boolean
}

const ChangePassWord = () => {
    // 비밀번호
    const [password, setPasswordValue] = React.useState<State>({ value: '', showPassword: false, error: false });
    // 변경비밀번호
    const [newPassword, setNewPasswordValue] = React.useState<State>({ value: '', showPassword: false, error: false });
    // 확인비밀번호
    const [confimPassword, setConfimPasswordValue] = React.useState<State>({ value: '', showPassword: false, error: false });

    // alert
    const [alert, setAlert] = React.useState<AlertInterface>({ open: false, title: '', content: '', fnCallBack: null, alertProps: {} });

    // 비밀번호 변경 이벤트 처리
    const changehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;

        if (id === 'password') {
            setPasswordValue({ value: event.target.value, showPassword: password.showPassword, error: false });
        }
        else if (id === 'newPassword') {
            let errorFlag = false;

            if (confimPassword && confimPassword.value !== '') {
                if (event.target.value !== confimPassword.value) {
                    errorFlag = true;
                }
            }

            setNewPasswordValue({ value: event.target.value, showPassword: newPassword.showPassword, error: errorFlag });
            setConfimPasswordValue({ ...confimPassword, error: errorFlag });
        }
        else if (id === 'confimPassword') {
            let errorFlag = false;

            if (newPassword && newPassword.value !== '') {
                if (event.target.value !== newPassword.value) {
                    errorFlag = true;
                }
            }
            setNewPasswordValue({ ...newPassword, error: errorFlag });
            setConfimPasswordValue({ value: event.target.value, showPassword: confimPassword.showPassword, error: errorFlag });
        }
    };

    // 비밀번호 아이콘 클릭 이벤트 처리
    const showPasswordClickhandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.id;
        if (id === 'icon_password') {
            setPasswordValue({ ...password, showPassword: !password.showPassword });
        }
        else if (id === 'icon_newPassword') {
            setNewPasswordValue({ ...newPassword, showPassword: !newPassword.showPassword });
        }
        else if (id === 'icon_confimPassword') {
            setConfimPasswordValue({ ...confimPassword, showPassword: !confimPassword.showPassword });
        }
    };

    // 마우스 다운 이벤트 처리
    const passwordMouseDownhandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // 저장 버튼 클릭 이벤트 처리
    const saveClickHandler = () => {
        console.log("저장 클릭");
        if (password && newPassword && confimPassword) {
            if (password.value === '') {
                setAlert({ open: true, title: "비밀번호", content: "비밀번호의 값이 없습니다.", fnCallBack: alertIsCloseHandler, alertProps: { severity: 'error', color: 'error' } });
            }
            else if (newPassword.value === '') {
                setAlert({ open: true, title: "신규 비밀번호", content: "신규 비밀번호의 값이 없습니다.", fnCallBack: alertIsCloseHandler, alertProps: { severity: 'error', color: 'error' } });
            }
            else if (confimPassword.value === '') {
                setAlert({ open: true, title: "확인 비밀번호", content: "확인 비밀번호의 값이 없습니다.", fnCallBack: alertIsCloseHandler, alertProps: { severity: 'error', color: 'error' } });
            }

            if (password.value === newPassword.value) {
                setAlert({ open: true, title: "비밀번호 확인", content: "기존 비밀번호와 신규 비밀번호의 값이 같습니다.", fnCallBack: alertIsCloseHandler, alertProps: { severity: 'error', color: 'error' } });
            }

            if (newPassword.value !== confimPassword.value) {
                setAlert({ open: true, title: "비밀번호 확인", content: "신규 비밀번호와 확인 비밀번호 값이 다릅니다.", fnCallBack: alertIsCloseHandler, alertProps: { severity: 'error', color: 'error' } });
            }
        }
    }

    // alert callback 함수
    const alertIsCloseHandler = React.useCallback(() => {
        setAlert({ ...alert, open: false }); // 기존데이터는 그대로 이고 open 만 변경시
    }, [alert]);

    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <ListItem>
                        <ListItemText primary="비밀번호변경" secondary="" />
                    </ListItem>
                    <Divider />
                </List>

                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={password.showPassword ? 'text' : 'password'}
                        value={password.value}
                        onChange={changehandler}
                        error={password.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    id='icon_password'
                                    onClick={showPasswordClickhandler}
                                    onMouseDown={passwordMouseDownhandler}
                                    edge="end"
                                >
                                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password2">변경비밀번호</InputLabel>
                    <OutlinedInput
                        id="newPassword"
                        type={newPassword.showPassword ? 'text' : 'password'}
                        value={newPassword.value}
                        onChange={changehandler}
                        error={newPassword.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    id='icon_newPassword'
                                    aria-label="newPassword"
                                    onClick={showPasswordClickhandler}
                                    onMouseDown={passwordMouseDownhandler}
                                    edge="end"
                                >
                                    {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="newPassword"
                    />
                </FormControl>

                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password3">확인비밀번호</InputLabel>
                    <OutlinedInput
                        id="confimPassword"
                        type={confimPassword.showPassword ? 'text' : 'password'}
                        value={confimPassword.value}
                        onChange={changehandler}
                        error={confimPassword.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    id='icon_confimPassword'
                                    aria-label="confimPassword"
                                    onClick={showPasswordClickhandler}
                                    onMouseDown={passwordMouseDownhandler}
                                    edge="end"
                                >
                                    {confimPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="confimPassword"
                    />
                </FormControl>

                <CustomBasicButton
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    disabled={!(!confimPassword.error && !newPassword.error)}
                    onClick={saveClickHandler}
                >
                    save
                </CustomBasicButton>
            </Box>
            <CustomAlert
                customAlert={alert}
            />
        </Container>
    )
}

export default React.memo(ChangePassWord);