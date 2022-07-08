import { useState } from 'react';
import { useNavigate } from 'react-router';

import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Dashboard, LibraryBooks } from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface ListMenuProps {
	open: boolean
	theme: any
	drawerWidth: number
	DrawerHeader: any
	handleDrawerClose: any
};

const ListMenu = ({ open, theme, drawerWidth, DrawerHeader, handleDrawerClose }: ListMenuProps) => {
	const navigate = useNavigate();
	const [navOpen, setNavOpen] = useState(false)

	function handleClick() {
		if (open) {
			setNavOpen(!navOpen)
		}
	}

	const openedMixin = (theme: Theme): CSSObject => ({
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: 'hidden',
	});

	const closedMixin = (theme: Theme): CSSObject => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: `calc(${theme.spacing(7)} + 1px)`,
		[theme.breakpoints.up('sm')]: {
			width: `calc(${theme.spacing(8)} + 1px)`,
		},
	});

	const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
		({ theme, open }) => ({
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
			boxSizing: 'border-box',
			...(open && {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			}),
			...(!open && {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			}),
		}),
	);

	return (

		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<IconButton
					onClick={handleDrawerClose}
					sx={{
						...(!open && { display: 'none' }),
					}}
				>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List component="nav" disablePadding>

				{
					// 메뉴 별로 아이콘 을 조회하여 [] 로 만들어 전달 한다. 아이콘들은 lazy 를 사용하여 동적 import 한다 InboxIcon
				}
				<ListItem key='Main' disablePadding sx={{ display: 'block' }}
					onClick={() => navigate("/main")}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							<Dashboard />
						</ListItemIcon>
						<ListItemText primary='Main' sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>

				<ListItem key='TEST Pages' disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}
						
						onClick={handleClick}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							<LibraryBooks />
						</ListItemIcon>
						<ListItemText primary='TEST Pages' sx={{ opacity: open ? 1 : 0 }} />
						{!open ? null : navOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</ListItem>
				<Collapse in={navOpen} id="test" timeout='auto' unmountOnExit>
					<Divider />
					<List component="nav" disablePadding>
						<ListItem key='Test Page 1' disablePadding sx={{ display: 'block' }}
							onClick={() => navigate("/testPage1")}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemText inset primary='Test Page 1' sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
						<ListItem key='Test Page 2' disablePadding sx={{ display: 'block' }}
							onClick={() => navigate("/testPage2")}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemText inset primary='Test Page 2' sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					</List>
				</Collapse>

			</List>
		</Drawer>
	);
}

export default ListMenu