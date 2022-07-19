import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";

import {
	addAccesstoken, removeAccesstoken, addExpiresAccesstoken,
	removeExpiresAccesstoken, isAuthenticated, addUserRole
} from "@modules/auth/authModule"
import { toggleProgress } from "@modules/progress/progressModule"
import { addMenuList } from "@modules/menu/menuModule"
import { MenuListType } from "@modules/menu/menuType"

import { CustomBasicButton } from "@components/button/button"

import { Container, CssBaseline, Avatar, Typography, TextField, Box } from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import Link from '@mui/material/Link';
import useAxios from '@configs/axios/useAxios';

const Copyright = (props: any) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="http://localhost/">
				{window.location.protocol + "//" + window.location.hostname}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export  interface LoginToken {
	grantType: string,
	accessToken: string,
	tokenExpiresIn: number
}

export  interface LoginInData {
	email: string,
	password: string
}

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	//	const [hasLoginFailed, setHasLoginFailed] = useState(false);

	const createMenuList = React.useCallback(
		(menuList: MenuListType) => dispatch(addMenuList(menuList)),
		[dispatch]
	);

	// progress bar 함수
	const toggleProgressHandler = React.useCallback(
		(progressOpen: boolean) => dispatch(toggleProgress({ progressOpen: progressOpen })),
		[dispatch]
	);

	// 토큰 생성 함수
	const createAccesstoken = React.useCallback(
		(accessToken: string) => dispatch(addAccesstoken({ accessToken: accessToken })),
		[dispatch]
	);

	// 토큰 삭제 함수
	const deleteAccesstoken = React.useCallback(() => dispatch(removeAccesstoken()),
		[dispatch]
	);

	// 토큰 유효시간 생성 함후
	const createExpiresAccesstoken = React.useCallback(
		(tokenExpiresTime: string) => dispatch(addExpiresAccesstoken({ tokenExpiresTime: tokenExpiresTime })),
		[dispatch]
	);

	// 토큰 유효시간 삭제 함수
	const deleteExpiresAccesstoken = React.useCallback(() => dispatch(removeExpiresAccesstoken()),
		[dispatch]
	);

	// 권한 체크 저장 함수
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
		console.log("page 이동");
		navigate("/main"); // page 이동
	}

	//	const calculateRemainingTime = (expirationTime:number) => {
	//  		const currentTime = new Date().getTime();
	//  		const adjExpirationTime = new Date(expirationTime).getTime();
	//  		const remainingDuration = adjExpirationTime - currentTime;
	//  		return remainingDuration;
	//	};

	const setMenuList = () => {
		// 메뉴 데이터 생성
		const menuDateList = {
			menuItems: [{ key: "1", title: "메뉴1", show: false },
			{ key: "2", title: "메뉴2", show: true },
			{ key: "3", title: "메뉴3", show: false }]
		};

		createMenuList(menuDateList);
	}

	const loginClicked = () => {
		console.log("loginClicked");
		const loginData: LoginInData = { 'email': email, 'password': password };
		
		toggleProgressHandler(true); // Progress bar 생성
		localStorage.setItem('token', "Local-Test-token");
		saveIsAuthenticated(true);
		saveUserRole('admin'); // 사용자 역할 설정
		createAccesstoken("Local-Test-token");
//		createExpiresAccesstoken(String(result.tokenExpiresIn));
		setMenuList(); // 메뉴생성
		
		toggleProgressHandler(false); // Progress bar 삭제
		
		// main 페이지로 이동
		navigateHandler();
	
//		const response = useAxios.POST('/auth/login', loginData, true);
//		response.then((response) => {
//			if (response !== null) {
//				saveIsAuthenticated(true);
//				const result: LoginToken = response.data;
//				setEmail(email);
//				localStorage.setItem('token', result.accessToken);
//				console.log("login success!!!");
//				//				setGrantType(result.grantType);
//				//				setShowSuccessMessage(true);
//				//				setHasLoginFailed(false);
//				//				setCookie('accessToken', result.accessToken); // cookie 세팅 샘플
//				// redux 에 token 생성
//				createAccesstoken(result.accessToken);
//				createExpiresAccesstoken(String(result.tokenExpiresIn));
//
//
//				setMenuList(); // 메뉴생성
//				// main 페이지로 이동
//				navigateHandler();
//			}
//		}).catch(() => {
//			localStorage.removeItem('token');
//			//			setShowSuccessMessage(false);
//			//			setHasLoginFailed(true);
//
//			// redux 에 token 삭제
//			deleteAccesstoken();
//			deleteExpiresAccesstoken();
//			saveIsAuthenticated(false);
//			//			removeCookie('accessToken'); // cookie 샘플
//		})
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
					Sign in
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						autoFocus
						id="email"
						label="Email Address"
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
						label="password"
						name="password"
						type="password"
						value={password}
						onChange={passwordChange}
						autoComplete="current-password"
					/>
					<CustomBasicButton
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={loginClicked}
					>
						Login
					</CustomBasicButton>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />

		</Container>
	)
}

export default Login