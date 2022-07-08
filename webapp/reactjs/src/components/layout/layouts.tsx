import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "@modules/rootReducer";

import Header from '@components/layout/header'
import Footer from '@components/layout/footer'
import MakeAccordionMenu from '@components/menu/accordionMenu'
import TreeMenu from '@components/menu/treeMenu'
import {
	Box, CssBaseline, AppBar, Toolbar, Typography,
	Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { Inbox, Mail } from "@mui/icons-material"

interface LayoutDefaultProps {
	children?: React.ReactElement;
}


const Layouts = ({ children }: LayoutDefaultProps) => {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken);
	const drawerWidth = 240;
	console.log(accessToken);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						{/* 해당 layout에서 공통으로 사용되는 Header를 선언해준다. */}
						<Header />
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<TreeMenu />
				</Box>
			</Drawer>

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