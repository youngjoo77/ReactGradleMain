import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import { RootState } from "@modules/rootReducer";
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { AccountBalance, Event, Person, Settings, Archive, FileCopy, MoreHoriz, Edit } from '@mui/icons-material';
import { CustomMenu } from '@components/menu/menu'

const Footer = () => {
	const [footerIconValue, setFooterIconValue] = React.useState("/main");
	const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
	const settingMenuOpen = Boolean(anchorEl);

	const navigate = useNavigate();
	const userRole = useSelector((state: RootState) => state.auth.role);
	
	const footerOnchageHandler = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
		setFooterIconValue(newValue);
		if (newValue !== '/setting') {
			navigate(newValue); // page 이동
		}
		else {
			setAnchorEl(event.currentTarget);
		}
	}

	const settingMenuCloseHandler = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
		if (event.currentTarget.id) {
			navigate(event.currentTarget.id); // page 이동
		}
	};

	return (
		<Typography component="footer">
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation
					showLabels
					value={footerIconValue}
					onChange={(event, newValue) => footerOnchageHandler(event, newValue)}
				>
					<BottomNavigationAction label="Main" icon={<AccountBalance />} value={"/main"} id='main' />
					<BottomNavigationAction label="Notice" icon={<Event />} value={"/notice"} id='notice' />
					<BottomNavigationAction label="password" icon={<Person />} value={"/changePassWord"} id='changePassWord' />
					{
						userRole === 'admin' ? <BottomNavigationAction label="setting" icon={<Settings />} value={"/setting"} id='setting' /> : null
					}
				</BottomNavigation>
				{
					userRole === 'admin' ?
						<CustomMenu
							id="custom-menu-main"
							MenuListProps={{
								'aria-labelledby': 'demo-customized-button',
							}}
							anchorEl={anchorEl}
							open={settingMenuOpen}
							onClose={settingMenuCloseHandler}
						>
							<MenuItem onClick={settingMenuCloseHandler} id='/notice' disableRipple>
								<Edit />
								Edit
							</MenuItem>
							<MenuItem onClick={settingMenuCloseHandler} id='/changePassWord' disableRipple>
								<FileCopy />
								Duplicate
							</MenuItem>
							<Divider sx={{ my: 0.5 }} />
							<MenuItem onClick={settingMenuCloseHandler} id='/main' disableRipple>
								<Archive />
								Archive
							</MenuItem>
							<MenuItem onClick={settingMenuCloseHandler} id='/main' disableRipple>
								<MoreHoriz />
								More
							</MenuItem>
						</CustomMenu>
						: null
				}
			</Paper>
		</Typography>
	)
}

export default React.memo(Footer);