import React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { KakaoMapProp } from "@interfaces/kakaoMapProp"


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const KakaoMap = ({
	open,
	setOpen,
	title,
	name,
	latitude,
	longitude,
	place
}: KakaoMapProp) => {
	const { kakao }  : any = window;
	
	const handleClose = () => {
		setOpen(false);
	};


//	const GenerateKakaoMap = () => {
//		console.log("START");
//		const mapScript = document.createElement("script");
//		mapScript.async = true;
////		mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
//		mapScript.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=ab4a5501e93f5f214f48bc77557e3fd2&autoload=false';
//
//
//		const onLoadKakaoMap = () => {
//			kakao.maps.load(() => {
//				const container = document.getElementById("kakaoMapArea");
//				const options = {
////					center: new window.kakao.maps.LatLng(Number(latitude), Number(longitude)),
//					center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//				};
//				const map = new window.kakao.maps.Map(container, options);
////				const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
//				const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
//				const marker = new window.kakao.maps.Marker({
//					position: markerPosition,
//				});
//				marker.setMap(map);
//			});
//		};
//		
//		mapScript.addEventListener("load", onLoadKakaoMap);
//		
//		return () => mapScript.removeEventListener("load", onLoadKakaoMap);
//	}


	React.useEffect(() => {
//		const container = document.querySelector('#kakaoMapArea');
//		const options = {
////            center: new kakao.maps.LatLng(latitude, longitude),
//            center: new kakao.maps.LatLng(33.450701, 126.570667),
//            level: 3
//        };
//        
//		let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
		
		
	}, [title, name, latitude, longitude, place]);


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
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			<div className="kakao-map" id="kakaoMapArea" style={{width : 500, height : 500}} />
		</Dialog>
	)
}

export default KakaoMap