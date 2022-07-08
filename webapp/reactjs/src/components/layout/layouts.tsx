import React from 'react';
import { Outlet } from 'react-router'
import { useSelector } from "react-redux";
import { RootState } from "@modules/rootReducer";

import Header from '@components/layout/header'
import Footer from '@components/layout/footer'
import ListMenu from '@components/menu/listMenu'
import {BasicButton} from "@components/button/button"

import { Box, CssBaseline, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


interface LayoutDefaultProps {
	children?: React.ReactElement;
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Layouts = ({ children }: LayoutDefaultProps) => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const accessToken = useSelector((state: RootState) => state.auth.accessToken);
	console.log(accessToken);

	return (

		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Header
					open={open}
					handleDrawerOpen={handleDrawerOpen}
				/>
			</AppBar>
			<ListMenu
				open={open}
				theme={theme}
				drawerWidth={drawerWidth}
				DrawerHeader={DrawerHeader}
				handleDrawerClose={handleDrawerClose}
			/>

			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{/* Content 영역 */}
				<main>
					{/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
					{children || <Outlet />}
				</main>
			</Box>

			<Footer />
		</Box>

	)
}

export default Layouts