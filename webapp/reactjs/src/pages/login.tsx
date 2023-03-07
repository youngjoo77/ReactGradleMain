import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next'
import CustomAxios, { CustomAxionFunctionInterface } from '@/configs/axios/axios';

import {
	addAccesstoken, removeAccesstoken, addExpiresAccesstoken,
	removeExpiresAccesstoken, isAuthenticated, addUserRole
} from "@modules/auth/authModule"

import { CustomBasicButton } from "@components/button/button"

import { Container, CssBaseline, Avatar, Typography, TextField, Box, Link, InputLabel, MenuItem, FormControl } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LockOutlined } from "@mui/icons-material"

export interface LoginToken {
	grantType: string,
	accessToken: string,
	refreshToken: string,
	tokenExpiresIn: number
}

export interface LoginInData {
	email: string,
	password: string
}

const Copyright = (props: any) => {
	const url = window.location.protocol + "//" + window.location.hostname;

	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href={url}>
				{url}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lngValue, setlngValue] = useState(localStorage.getItem('language') || 'ko');

	// axios 컴포넌트에게 넘겨줄 ref 선언
	const axiosRef = React.useRef<CustomAxionFunctionInterface>(null);

	React.useEffect(() => {
		if (localStorage.getItem('language') === null) {
			localStorage.setItem('language', 'ko');
		}
	});
	// 다국어 선언
	const { t, i18n } = useTranslation('main');

	// auth 관련 생성 함수
	const createAccesstoken = React.useCallback(
		(accessToken: string) => dispatch(addAccesstoken({ accessToken: accessToken })),
		[dispatch]
	);

	const deleteAccesstoken = React.useCallback(() => dispatch(removeAccesstoken()),
		[dispatch]
	);

	const createExpiresAccesstoken = React.useCallback(
		(tokenExpiresTime: string) => dispatch(addExpiresAccesstoken({ tokenExpiresTime: tokenExpiresTime })),
		[dispatch]
	);

	const deleteExpiresAccesstoken = React.useCallback(() => dispatch(removeExpiresAccesstoken()),
		[dispatch]
	);

	const saveIsAuthenticated = React.useCallback(
		(authenticated: boolean) => dispatch(isAuthenticated({ isAuthenticated: authenticated })),
		[dispatch]
	);

	// 사용자 역할 저장 함수
	const saveUserRole = React.useCallback(
		(role: string) => dispatch(addUserRole({ role: role })),
		[dispatch]
	);
	
	const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate("/main"); // page 이동
	}

	const lngSelectChangeHandler = (
		event: SelectChangeEvent
	) => {
		if (event.target.value) {
			localStorage.setItem('language', event.target.value);
			setlngValue(event.target.value);
			i18n.changeLanguage(event.target.value);
		}
	};

	const loginClicked = () => {
		console.log('loginClicked');
		saveIsAuthenticated(true);
		setEmail(email);
		localStorage.setItem('token', "accesstoken-default-value");
		localStorage.setItem('tokenExpiresIn', String(1660186864.738));

		createAccesstoken("accesstoken-default-value");
		// // contents 페이지로 이동
		navigateHandler();

		const loginData: LoginInData = { 'email': email, 'password': password };

// 		const response = axiosRef.current?.REQUEST({
// 			method: 'POST',
// 			url: '/auth/login',
// 			data: loginData,
// 			loading: true
// 		});

// 		if (response) {
// 			response.then((response) => {
// 				if (response !== null) {
// 					saveIsAuthenticated(true);
// 					const result: LoginToken = response.data;
// 					setEmail(email);

// 					localStorage.setItem('token', result.accessToken);
// 					localStorage.setItem('refToken', result.refreshToken);
// 					localStorage.setItem('tokenExpiresIn', String(result.tokenExpiresIn));

// 					console.log("login success!!!");
// 					//				setGrantType(result.grantType);
// 					//				setCookie('accessToken', result.accessToken); // cookie 세팅 샘플
// 					// redux 에 token 생성
// 					createAccesstoken(result.accessToken);
// 					createExpiresAccesstoken(String(result.tokenExpiresIn));
// //					saveUserRole(result.userRole);
// 					saveUserRole('user');

// 					// main 페이지로 이동
// 					navigateHandler();
// 				}
// 			}).catch(() => {
// 				localStorage.removeItem('token');
// 				localStorage.removeItem('refToken');
// 				localStorage.removeItem('tokenExpiresIn');

// 				// redux 에 token 삭제
// 				deleteAccesstoken();
// 				deleteExpiresAccesstoken();
// 				saveIsAuthenticated(false);
// 				// removeCookie('accessToken'); // cookie 샘플
// 			})
// 		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />

			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					{t('signIn')}
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						autoFocus
						id="email"
						label={t('emailAddr')}
						name="email"
						value={email}
						autoComplete="email"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => emailChange(e)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="password"
						label={t('pwd')}
						name="password"
						type="password"
						value={password}
						onChange={passwordChange}
						autoComplete="current-password"
					/>

					<FormControl sx={{ minWidth: '100%', right: 0 }} size="medium" margin='normal'>
						<InputLabel id="theme-select-small">{t('language')}</InputLabel>
						<Select
							labelId="theme-select-small"
							id="theme-select-small"
							value={lngValue}
							label="theme"
							onChange={lngSelectChangeHandler}
							defaultValue={'ko'}
						>
							<MenuItem value={'ko'}>한국어</MenuItem>
							<MenuItem value={'en'}>영어</MenuItem>
						</Select>
					</FormControl>

					<CustomBasicButton
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={loginClicked}
					>
					
						{t('signIn')}
					</CustomBasicButton>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
			<CustomAxios
				ref={axiosRef}
			/>
		</Container>
	)
}

export default Login