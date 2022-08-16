import React from 'react'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import { CustomDataGrid } from '@components/grid/dataGrid'
import { GridCellParams, GridColDef, GridColumnVisibilityModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { CustomFullDialog } from '@components/modal/modal'
import * as Utils from '@/utils'

const Notice = () => {
	const [tabValue, setTabValue] = React.useState("1");
	const [isOpen, setIsOpen] = React.useState(false);
	const [typeValue, setTypeValue] = React.useState("");
	const [contentValue, setContentValue] = React.useState("");
	const [detailContentValue, setDetailContentValue] = React.useState("");

	const tabChangehandler = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	const gridRowClickHandler = (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		console.log(`grid row clicked lastName = ${params.row.lastName}`);
		if (!event.ctrlKey) {
			event.defaultMuiPrevented = true;
			setTypeValue(params.row.type);
			setContentValue(params.row.content);
			setDetailContentValue(params.row.detailContent);
			setIsOpen(true);
		}
	}

	const gridCellClickHandler = (params: GridCellParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		console.log(`grid cell clicked( field = ${params.field}, value = ${params.value}, format value = ${params.formattedValue})`);
	}

	const closeHandler = () => {
		setIsOpen(false);
	};

	const columnVisibilityModel: GridColumnVisibilityModel = { id: false, detailContent: false };

	// hide 컬럼 설정
	// grid 컬럼 설정
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'type',
			headerName: 'type',
			flex: 1,
			editable: true,
			headerAlign: 'left',
			align: 'left'
		},
		{
			field: 'content',
			headerName: 'content',
			flex: 1,
			editable: true,
			headerAlign: 'left',
			align: 'left',
		},
		{
			field: 'registDate',
			headerName: 'REG Date',
			description: 'This column has a value getter and is not sortable.',
			flex: 1,
			headerAlign: 'left',
			align: 'center',
			valueFormatter: (params) => {
				return Utils.DateUtil.dateToString(params?.value, "YYYY-MM-DD")

			}
		},
		{
			field: 'detailContent',
			headerName: 'detail contents',
			flex: 1,
			headerAlign: 'left',
			align: 'left'
		}
	];

	// grid row 데이터 설정
	const rows = [
		{ id: 1, type: 'Snow', content: 'Jon', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 2, type: 'Lannister', content: 'Cersei', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 3, type: 'Lannister', content: 'Jaime', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 4, type: 'Stark', content: 'Arya', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 5, type: 'Targaryen', content: 'Daenerys', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 6, type: 'Melisandre', content: null, registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 7, type: 'Clifford', content: 'Ferrara', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 8, type: 'Frances', content: 'Rossini', registDate: '20220714', detailContent: '상세내용입니다.' },
		{ id: 9, type: 'Roxie', content: 'Harvey', registDate: '20220714', detailContent: '상세내용입니다.' }
	];

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
						<TabPanel value="1" style={{ padding: '1px', marginTop: '10px' }}>
							<Paper sx={{ width: '100%', overflow: 'hidden', height: 600, minHeight: 400 }}>
								<CustomDataGrid
									rows={rows}
									columns={columns}
									columnVisibilityModel={columnVisibilityModel}
									checkboxSelection={false}
									rowClickHandler={gridRowClickHandler}
								/>
							</Paper>
						</TabPanel>
						<TabPanel value="2" style={{ padding: '1px', marginTop: '10px' }}>Item Two</TabPanel>
					</TabContext>
				</Box>

			</Container>
			< CustomFullDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				typeValue={typeValue}
				contentValue={contentValue}
				detailContentValue={detailContentValue}
			/>
		</React.Fragment >
	);
}

export default React.memo(Notice)