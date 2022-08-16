import React, { useState, useCallback, useEffect, ReactNode, MouseEvent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

// context menu sample start
const useContextMenu = (outerRef: React.MutableRefObject<HTMLDivElement>) => {
	const [xPos, setXPos] = useState('0px');
	const [yPos, setYPos] = useState('0px');
	const [menu, showMenu] = useState(false);

	const handleContextMenu = useCallback(
		(event: any) => {
			setXPos(`${event.pageX}px`);
			setYPos(`${event.pageY}px`);
			if (
				outerRef.current.getBoundingClientRect().top <= event.pageY &&
				outerRef.current.getBoundingClientRect().bottom >= event.pageY &&
				outerRef.current.getBoundingClientRect().left <= event.pageX &&
				outerRef.current.getBoundingClientRect().right >= event.pageX
			) {
				event.preventDefault();
				showMenu(true);
			} else {
				showMenu(false);
			}
		},
		[showMenu, outerRef, setXPos, setYPos],
	);

	const handleClick = useCallback(() => {
		showMenu(false);
	}, [showMenu]);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		document.addEventListener('contextmenu', handleContextMenu);
		return () => {
			document.addEventListener('click', handleClick);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});

	return { xPos, yPos, menu, showMenu };
};

const CustomContextMenu = ({
	outerRef,
	menuOnClick,
	children,
}: {
	outerRef: React.MutableRefObject<HTMLDivElement>;
	menuOnClick: (event: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement> | React.MouseEvent<HTMLUListElement>) => void;
	children: ReactNode;
}) => {
	const { xPos, yPos, menu, showMenu } = useContextMenu(outerRef);

	const menuOnClickHandler = (
		e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement> | React.MouseEvent<HTMLUListElement>,
	) => {
		e.stopPropagation();
		menuOnClick(e);
		showMenu(false);
	};

	if (menu) {
		return (
			<ul
				className="menu"
				style={{ top: yPos, left: xPos }}
				onClick={(e) => menuOnClickHandler(e)}
				onKeyDown={(e) => menuOnClickHandler(e)}
				role="menu"
			>
				{children}
			</ul>
		);
	}
	return null;
};
// context menu sample end 안에 주석은 오류가 나서 주석 처리 하였음

const CustomMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

export { CustomContextMenu, CustomMenu }