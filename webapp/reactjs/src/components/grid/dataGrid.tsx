import React from 'react';
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
//import moment from 'moment'

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

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDataGrid = ({ columns, rows, ...props }: { columns: GridColDef[], rows: any }) => {
	/**
	   * header 와 data를 받아서 redering 해준다.
	   * row 나 cell 을 클릭 했을때 이벤트를 리번 받아야 한다면 function 도 같이 받는다.
	   */
	const [isOpen, setIsOpen] = React.useState(false);
	const [pageSize, setPageSize] = React.useState(5);
	const [columnItems, setColumnItems] = React.useState<GridColDef[]>([]);
	const [rowItems, setRowITems] = React.useState<any>([]);

	const [typeValue, setTypeValue] = React.useState("");
	const [contentValue, setContentValue] = React.useState("");
	const [detailContentValue, setDetailContentValue] = React.useState("");


	React.useEffect(() => {
		console.log("111111");
		setColumnItems(columns); // column 설정
		setRowITems(rows); // row 설정
	}, [columns, rows]);

	const closeHandler = () => {
		setIsOpen(false);
	};

	const onRowClick = (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		if (!event.ctrlKey) {
			event.defaultMuiPrevented = true;
			console.log("onRowClick 클릭 :" + params.row.content + " = " + params.row.detailContent);
			setTypeValue(params.row.type);
			setContentValue(params.row.content);
			setDetailContentValue(params.row.detailContent);
			setIsOpen(true);
		}
	}

	return (
		<React.Fragment>
			<Typography component='div' sx={{ height: 500, width: '100%' }}>
				<DataGrid
					rows={rowItems}
					columns={columnItems}
					pageSize={pageSize}
					onPageSizeChange={setPageSize}
					rowsPerPageOptions={[5, 10, 20]}
					pagination
					onRowClick={(params, event) => onRowClick(params, event)}
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
							{typeValue + contentValue}
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

export default React.memo(CustomDataGrid);