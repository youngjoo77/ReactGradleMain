import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { removeAccesstoken, removeExpiresAccesstoken, isAuthenticated } from "@modules/auth/authModule"
import { BasicButton } from "@components/button/button"

import { Box, Typography, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
	open: boolean
	handleDrawerOpen: any
};

const Header = ({ open, handleDrawerOpen}: HeaderProps) => {
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



	console.log("Header !!!!");

	const LogoutHandler = () => {
		console.log("logout  버튼 클릭 !!!!");

		localStorage.removeItem('token');

		deleteAccesstoken();
		deleteExpiresAccesstoken();
		saveIsAuthenticated(false);

		navigate("/login"); // 로그인 페이지로 이동
	}

	return (
		<Toolbar>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{
					marginRight: 5,
					...(open && { display: 'none' }),
				}}
			>
			<MenuIcon />
			</IconButton>
			<Typography variant="h6" noWrap component="div">
				HEADER
			</Typography>
			<BasicButton
					variant="contained"
					onClick={LogoutHandler}
				>
					logout
				</BasicButton>
		</Toolbar>
	)
}
export default Header;