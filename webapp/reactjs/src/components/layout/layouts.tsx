import React from 'react';
import { Outlet } from 'react-router'
import { useSelector } from "react-redux";
import { RootState } from "@modules/rootReducer";

import Header from '@components/layout/header'
import Footer from '@components/layout/footer'

import { Box, CssBaseline, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';


interface LayoutDefaultProps {
	children?: React.ReactElement;
}

const Layouts = ({ children }: LayoutDefaultProps) => {

	const accessToken = useSelector((state: RootState) => state.auth.accessToken);
	console.log(accessToken);

	return (

		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Header />
			</AppBar>

			<Box component="main" sx={{ flexGrow: 3, pt: 7 }}>
				{/* Content 영역 */}
				{/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
				{children || <Outlet />}
			</Box>

			<Footer />
		</Box>

	)
}

export default React.memo(Layouts)