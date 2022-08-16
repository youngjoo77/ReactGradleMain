import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Slide, AppBar, Toolbar, Typography, List, ListItem, Divider, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next'
import { CustomBasicButton } from '@components/button/button'
import { TransitionProps } from '@mui/material/transitions';
import * as Utils from '@/utils'

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

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomFullDialogInterface {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	typeValue: string
	contentValue: string
	detailContentValue: string
}

const CustomFullDialog = ({
	isOpen,
	setIsOpen,
	typeValue,
	contentValue,
	detailContentValue
}: CustomFullDialogInterface) => {

	const onCloseHandler = () => {
		setIsOpen(false);
	}

	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={onCloseHandler}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={onCloseHandler}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{typeValue + " " + (Utils.StringUtil.isNull(contentValue) ? '' : contentValue)}
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
	)
}

export type { PopupInterface }
export { CustomDialog, CustomFullDialog }