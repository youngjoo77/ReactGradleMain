import React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import moment from 'moment'

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

// const columns: GridColDef[] = [
// 	{ field: 'id', headerName: 'ID', flex: 1, hide: true, sortable: false, filterable: false },
// 	{ field: 'type', headerName: '구분', flex: 1, sortable: false, filterable: false },
// 	{ field: 'content', headerName: '내용', flex: 2, sortable: false, filterable: false },
// 	{
// 		field: 'registDate', headerName: '등록일자', flex: 1, sortable: false, filterable: false,
// 		valueFormatter: params => moment(params?.value).format("YYYY-MM-DD")
// 	},
// 	{ field: 'detailContent', headerName: 'action', flex: 1, hide: true }
// ];

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, hide: true, sortable: false, filterable: false },
	{ field: 'type', headerName: '구분', flex: 1, sortable: false, filterable: false },
	{ field: 'content', headerName: '내용', flex: 2, sortable: false, filterable: false },
	{ field: 'registDate', headerName: '등록일자', flex: 1, sortable: false, filterable: false },
	{ field: 'detailContent', headerName: 'action', flex: 1, hide: true }
];

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

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDataGrid = () => {
	/**
	   * header 와 data를 받아서 redering 해준다.
	   * row 나 cell 을 클릭 했을때 이벤트를 리번 받아야 한다면 function 도 같이 받는다.
	   */
	 const [isOpen, setIsOpen] = React.useState(false);
	 const [contentValue, setContentValue] = React.useState("");
	 const [detailContentValue, setDetailContentValue] = React.useState("");

	 const closeHandler = () => {
		setIsOpen(false);
	};

	const onRowClick = (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		if (!event.ctrlKey) {
			event.defaultMuiPrevented = true;
			console.log("onRowClick 클릭 :" + params.row.content + " = " + params.row.detailContent);
			setContentValue(params.row.content);
			setDetailContentValue(params.row.detailContent);
			setIsOpen(true);
		}
	}

	const onCellClick = (params: GridCellParams<any, any, any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		if (!event.ctrlKey) {
			event.defaultMuiPrevented = true;
			console.log("onCellClick 클릭 :" + params.row.content + " = " + params.row.detailContent);
			setContentValue(params.row.content);
			setDetailContentValue(params.row.detailContent);
			setIsOpen(true);
		}
	}


	return (
		<React.Fragment>
		<Typography component='div' sx={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[5]}
				onRowClick={(params, event) => onRowClick(params, event)}
				onCellClick={(params, event) => onCellClick(params, event)}
			/>
		</Typography>
		<Dialog
		fullScreen
		open={isOpen}
		onClose={closeHandler}
		TransitionComponent={Transition}
	>
		<AppBar sx={{ position: 'relative' }}>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={closeHandler}
					aria-label="close"
				>
					<CloseIcon />
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
					{contentValue}
				</Typography>
			</Toolbar>
		</AppBar>
		<List>
          <ListItem>
            <ListItemText primary={detailContentValue} />
          </ListItem>
          <Divider />
        </List>

	</Dialog>
	</React.Fragment>
	);
}

export default React.memo(CustomDataGrid)