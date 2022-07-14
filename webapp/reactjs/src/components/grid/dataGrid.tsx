import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import momnet from 'moment'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 1, hide: true, sortable: false, filterable: false },
	{ field: 'type', headerName: '구분', flex: 1, sortable: false, filterable: false },
	{ field: 'content', headerName: '내용', flex: 2, sortable: false, filterable: false },
	{
		field: 'registDate', headerName: '등록일자', flex: 1, sortable: false, filterable: false,
		valueFormatter: params => momnet(params?.value).format("YYYY-MM-DD")
	},
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

const CustomDataGrid = () => {
	/**
	   * header 와 data를 받아서 redering 해준다.
	   * row 나 cell 을 클릭 했을때 이벤트를 리번 받아야 한다면 function 도 같이 받는다.
	   */

	const onRowClick = (params, event) => {
		if (!event.ctrlKey) {
			event.defaultMuiPrevented = true;
			console.log("cell 클릭 :" + params.row.content + " = " + params.row.detailContent);
		}
	}

	const onCellClick = () => {

	}


	return (
		<Typography component='div' sx={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[5]}
				onRowClick={(params, event) => onRowClick(params, event)}
				onCellClick={(params, event) => {
					if (!event.ctrlKey) {
						event.defaultMuiPrevented = true;
						console.log("cell 클릭 :" + params.row.content + " = " + params.row.detailContent);
					}
				}}
			/>
		</Typography>
	);
}

export default React.memo(CustomDataGrid)