import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useTranslation } from 'react-i18next'
import { CustomBasicButton } from '@components/button/button'
import * as Utils from '@/utils';

interface CustomModalInterface {
	isOpen: boolean
	title: string
	children: React.ReactElement
	fnOkCallback: any
	fnCancelCallback: any
}

interface PopupInterface {
	open: boolean
	fnOkCallback: any
	fnCancelCallback: any
}

interface DynamicDialogInterface extends PopupInterface {
	path: string
}

/**
 * @description 팝업 화면을 호출 한다.
 * 
 * @param path 팝업 파일 경로 /pages 이후 기술 
 * @param open 팝업 오픈 여부
 * @param fnOkCallback 확인 버튼 클릭시 call back 함수
 * @param fnCancelCallback 취소 버튼 클릭시 call back 함수
 * @returns popup component
 */
const CustomDialog = ({
	isOpen,
	title,
	children,
	fnOkCallback,
	fnCancelCallback
}: CustomModalInterface) => {
	const { t } = useTranslation('main'); // 다국어 선언
	const $ = t;

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);


	const closeClickhandler = () => {
		setOpen(false);
		fnCancelCallback();
	};

	const okClickHandler = () => {
		setOpen(false);
		fnOkCallback();
	}

	return (
		<Dialog
			open={open}
			aria-labelledby="customized-dialog-title"
			maxWidth='xl'
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ m: 0, p: 1, cursor: 'move' }}
			>
				{title}
				<IconButton
					aria-label="close"
					onClick={closeClickhandler}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent
				sx={{ m: 0, p: 1 }}
				dividers
			>
				{children}
			</DialogContent>
			<DialogActions
				sx={{ m: 0, p: 1 }}
			>
				<CustomBasicButton
					variant="outlined"
					onClick={okClickHandler}
				>
					{$('ok')}
				</CustomBasicButton>
				<CustomBasicButton
					variant="outlined"
					autoFocus
					onClick={closeClickhandler}
				>
					{$('close')}
				</CustomBasicButton>
			</DialogActions>
		</Dialog>
	);
};

export type { PopupInterface }
export { CustomDialog }