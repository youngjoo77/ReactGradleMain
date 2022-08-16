import React from 'react';
import { DataGrid, GridColDef, GridRowParams, MuiEvent, GridColumnVisibilityModel, GridCellParams, GridSelectionModel } from '@mui/x-data-grid';

interface CustomDataGridInterface {
	columnVisibilityModel: GridColumnVisibilityModel
	checkboxSelection?: boolean
	columns: GridColDef[]
	rows: any,
	rowClickHandler?: (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => void,
	cellClickHandler?: (params: GridCellParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => void
}

const CustomDataGrid = ({
	columnVisibilityModel,
	checkboxSelection,
	columns,
	rows,
	rowClickHandler,
	cellClickHandler
}: CustomDataGridInterface) => {
	const [pageSize, setPageSize] = React.useState(10);
	const [columnItems, setColumnItems] = React.useState<GridColDef[]>([]);
	const [rowItems, setRowITems] = React.useState<any>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<GridColumnVisibilityModel>(columnVisibilityModel);
	const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

	React.useEffect(() => {
		console.log(selectionModel);
		console.log('11111111');
	}, [selectionModel]);
	// column 설정
	React.useEffect(() => {
		setColumnItems(columns);
	}, [columns]);

	// row 설정
	React.useEffect(() => {
		setRowITems(rows);
	}, [rows]);

	const onRowClickHandler = (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		if (!event.ctrlKey && rowClickHandler) {
			event.defaultMuiPrevented = true;
			rowClickHandler(params, event);
		}
	}

	const onCellClickHandler = (params: GridCellParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>) => {
		if (!event.ctrlKey && cellClickHandler) {
			event.defaultMuiPrevented = true;
			cellClickHandler(params, event);
		}
	}

	const onSelectionChangeHandler = (newSelectionModel: GridSelectionModel) => {
		setSelectionModel(newSelectionModel);
	}

	return (
		<DataGrid
			rows={rowItems}
			columns={columnItems}
			columnVisibilityModel={columnVisibility}
			onColumnVisibilityModelChange={(newModel) =>
				setColumnVisibility(newModel)
			}
			showCellRightBorder
			pageSize={pageSize}
			onPageSizeChange={setPageSize}
			rowsPerPageOptions={[5, 10, 20]}
			pagination
			onRowClick={(params, event) => onRowClickHandler(params, event)}
			onCellClick={(params, event) => onCellClickHandler(params, event)}

			onSelectionModelChange={(newSelectionModel) => {
				onSelectionChangeHandler(newSelectionModel);
			}}
			selectionModel={selectionModel}
			checkboxSelection={checkboxSelection}
		/>
	);
}

export { CustomDataGrid };