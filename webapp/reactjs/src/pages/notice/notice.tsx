import React from 'react'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import CustomDataGrid  from '@components/grid/dataGrid'


const Notice = () => {
	const [tabValue, setTabValue] = React.useState("1");

	const tabChangehandler = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	return (
		<React.Fragment >
			<Container sx={{ width: '100%' }}>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={tabValue}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList onChange={tabChangehandler} aria-label="lab API tabs">
								<Tab label="Item One" value="1" />
								<Tab label="Item Two" value="2" />
								<Tab label="Item Three" value="3" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<CustomDataGrid />
							</Paper>
						</TabPanel>
						<TabPanel value="2">Item Two</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</TabContext>
				</Box>

			</Container>
		</React.Fragment >
	);
}

export default React.memo(Notice)