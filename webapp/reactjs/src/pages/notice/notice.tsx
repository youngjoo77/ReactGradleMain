import React from 'react'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import CustomDataGrid from '@components/grid/dataGrid'

const Notice = () => {
	const [tabValue, setTabValue] = React.useState("1");

	const tabChangehandler = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	// 컬럼 데이터 설정
	const columns = [
		{ field: 'id', type: 'number', headerName: 'ID', flex: 0 },
		{ field: 'type', type: 'string', headerName: '구분', flex: 1},
		{ field: 'content', type: 'string', headerName: '내용', flex: 2 },
		{field: 'registDate', type: 'date', headerName: '등록일자', flex: 1 },
		{ field: 'detailContent', type: 'string', headerName: 'action', flex: 0 }
	];

	// row 데이터 설정
	const rows = [
		{ id: 1, type: '구분1', content: 'Snow', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 2, type: '구분2', content: 'Lannister', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 3, type: '구분1', content: 'Lannister', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 4, type: '구분2', content: 'Stark', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 5, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 6, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 7, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 8, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 9, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 10, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 11, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 12, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 13, type: '구분1', content: 'Roxie', registDate: '20220714', detailContent: '상세내용입니다.' }
	];

	// hide 컬럼 설정
	const columnVisibility : GridColumnVisibilityModel = {id : false, detailContent : false};
	return (
		<React.Fragment >
			<Container sx={{ width: '100%' }}>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={tabValue}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList onChange={tabChangehandler} aria-label="lab API tabs">
								<Tab label="Item One" value="1" />
								<Tab label="Item Two" value="2" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<CustomDataGrid
									key={'notice_grid'}
									columnVisibility= {columnVisibility}
									columns = {columns}
									rows = {rows}
								/>
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