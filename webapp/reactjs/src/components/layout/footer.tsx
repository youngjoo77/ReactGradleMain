import React from 'react';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import { AccountBalance, Event, Archive } from '@mui/icons-material';

const Footer = () => {
	const [footerIconValue, setFooterIconValue] = React.useState("/main");

	const navigate = useNavigate();

	const footerOnchageHandler = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
		console.log(newValue);
		setFooterIconValue(newValue);
		navigate(newValue); // page 이동
	}

	return (
		<Typography component="footer">
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation
					showLabels
					value={footerIconValue}
					onChange={(event, newValue) => footerOnchageHandler(event, newValue)}
				>
					<BottomNavigationAction label="Main" icon={<AccountBalance />} value={"/main"} />
					<BottomNavigationAction label="Notice" icon={<Event />} value={"/notice"} />
					<BottomNavigationAction label="password" icon={<Archive />} value={"/changePassWord"} />
				</BottomNavigation>
			</Paper>
		</Typography>
	)
}

export default React.memo(Footer);