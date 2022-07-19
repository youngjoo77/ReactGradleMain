import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { removeAccesstoken, removeExpiresAccesstoken, isAuthenticated } from "@modules/auth/authModule"

import { Typography, Toolbar, IconButton, AppBar } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const deleteAccesstoken = React.useCallback(() => dispatch(removeAccesstoken()),
		[dispatch]
	);

	const deleteExpiresAccesstoken = React.useCallback(() => dispatch(removeExpiresAccesstoken()),
		[dispatch]
	);

	const saveIsAuthenticated = React.useCallback(
		(authenticated: boolean) => dispatch(isAuthenticated({ isAuthenticated: authenticated })),
		[dispatch]
	);

	const LogoutHandler = () => {
		console.log("logout  버튼 클릭 !!!!");

		localStorage.removeItem('token'); // 토큰삭제
		deleteAccesstoken();

		deleteExpiresAccesstoken(); // 토큰유효시간 삭제
		saveIsAuthenticated(false); // 권한검증여부 false 설정

		navigate("/login"); // 로그인 페이지로 이동
	}

	return (
		<Typography component="header">
			<AppBar component="nav">
				<Toolbar>
					<Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
						HEADER 영역입니다.
					</Typography>
					<Typography component="div">
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={LogoutHandler}
							color="inherit"
						>
							<Logout />
						</IconButton>
					</Typography>
				</Toolbar>
			</AppBar>
		</Typography>
	)
}

export default React.memo(Header);