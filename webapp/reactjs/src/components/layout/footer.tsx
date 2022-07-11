import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Restore, Favorite, Archive } from '@mui/icons-material';

const Footer = () => {
	const [footerIconValue, setFooterIconValue] = React.useState(0);

	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation
				showLabels
				value={footerIconValue}
				onChange={(event, newValue) => {
					setFooterIconValue(newValue);
				}}
			>
				<BottomNavigationAction label="Recents" icon={<Restore />} />
				<BottomNavigationAction label="Favorites" icon={<Favorite />} />
				<BottomNavigationAction label="Archive" icon={<Archive />} />
			</BottomNavigation>
		</Paper>
	)
}

export default Footer;