import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export interface KakaoMapInterface {
	title: string
	latitude: number
	longitude: number
	location: string
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const KakaoMap = ({ open, setOpen, params }: { open: boolean, setOpen: any, params: KakaoMapInterface }) => {
	const { kakao }: any = window;
	const [isOpen, setOpenHandler] = React.useState(false);

	const mapContainer = React.useRef(null); // 카카오맵을 생성할 div ref 설정


	const handleClose = () => {
		setOpen(false);
		setOpenHandler(false);
	};

	React.useEffect(() => {
		if (open) {
			setOpenHandler(true);
		}
	}, [open])

	React.useEffect(() => {
		console.log("kakao useEffect START");

		if (isOpen) {
			let options = {
				center: new kakao.maps.LatLng(params.latitude, params.longitude),
				//				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 3
			};

			let map = new kakao.maps.Map(mapContainer.current, options);

			// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다 TOPLEFT
			// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
			//			var mapTypeControl = new kakao.maps.MapTypeControl();
			//			map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			var zoomControl = new kakao.maps.ZoomControl();
			map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

			const markerPosition = new kakao.maps.LatLng(params.latitude, params.longitude);
			//			const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
			const marker = new kakao.maps.Marker({
				position: markerPosition,
			});
			marker.setMap(map);
		}

	}, [isOpen, kakao.maps.ControlPosition.RIGHT, kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Marker, kakao.maps.ZoomControl, params]);


	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{params.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
		</Dialog>
	)
}

export default KakaoMap