import { useNavigate } from 'react-router';
import TreeView from '@mui/lab/TreeView';

import { ExpandMore, ChevronRight } from '@mui/icons-material';
import TreeItem from '@mui/lab/TreeItem';
import { Container, CssBaseline, Typography, Box } from "@mui/material"
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface TreeMenuProps {
	open: boolean
	theme : any
	drawerWidth : number
	DrawerHeader : any
	handleDrawerClose : any
};

const TreeMenu = ({ open, theme, drawerWidth, DrawerHeader, handleDrawerClose}: TreeMenuProps) => {
	const navigate = useNavigate();

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
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
			{
				// 메뉴 별로 아이콘 을 조회하여 [] 로 만들어 전달 한다. 아이콘들은 lazy 를 사용하여 동적 import 한다 InboxIcon
			}
				{['Inbox', 'Starred'].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<TreeView
				aria-label="file system navigator"
				defaultCollapseIcon={<ExpandMore />}
				defaultExpandIcon={<ChevronRight />}
				sx={{ overflowY: 'auto' }}
				className=''
			>
				<TreeItem nodeId="1" label="MAIN" onClick={props => navigate("/main")} />
				<TreeItem nodeId="2" label="TEST">
					<TreeItem nodeId="2-1" label="TEST 1" onClick={props => navigate("/testPage1")} />
					<TreeItem nodeId="2-2" label="TEST 2" onClick={props => navigate("/testPage2")} />
				</TreeItem>
			</TreeView>
		</Drawer>
	);
}

export default TreeMenu