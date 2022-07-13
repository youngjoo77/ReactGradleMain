import React from 'react';
import { isMobile } from "react-device-detect";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers";
import { ko } from "date-fns/esm/locale";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ExhibitionList from '@pages/exhibition/exhibitionList'
import { ExhibitionDataProp } from "@interfaces/exhibitionDataProp"

import KakaoMap from "@components/map/kakaoMap"

interface KakaoMapInterface {
	titleKakaoMap: string
	latitudeKakaoMap: number
	longitudeKakaoMap: number
	locationKakaoMap: string
}

const BpIcon = styled('span')(({ theme }) => ({
	borderRadius: '50%',
	width: 16,
	height: 16,
	boxShadow:
		theme.palette.mode === 'dark'
			? '0 0 0 1px rgb(16 22 26 / 40%)'
			: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
	backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
	backgroundImage:
		theme.palette.mode === 'dark'
			? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
			: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
	'.Mui-focusVisible &': {
		outline: '2px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
	},
	'input:disabled ~ &': {
		boxShadow: 'none',
		background:
			theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
	},
}));

const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: '#137cbd',
	backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&:before': {
		display: 'block',
		width: 16,
		height: 16,
		backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#106ba3',
	},
});

// Inspired by blueprintjs
const BpRadio = (props: RadioProps) => {
	return (
		<Radio
			sx={{
				'&:hover': {
					bgcolor: 'transparent',
				},
			}}
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			{...props}
		/>
	);
}

const Main = () => {
	const displayType = isMobile ? 'mobile' : 'desktop';

	const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(new Date());
	const [targetServiceValue, setTargetServiceValue] = React.useState("");

	// list 의 state 설정
	const [exhibitionDataList, setExhibitionDataList] = React.useState<ExhibitionDataProp[]>([]);

	// map open 여부 설정
	const [openKakaoMap, setOpenKakaoMap] = React.useState(false);

	React.useEffect(() => {
		// 날짜가 변경 되었을때 실행 된다.
		if (datePickerValue) {
			let today = datePickerValue;
			console.log((today.toISOString().split('T')[0]).replace(/-/g, ""));
		}
	}, [datePickerValue]);

	React.useEffect(() => {
		// 라디오 버튼이 변경 되었을때 실행 된다.
		if (targetServiceValue) {
			console.log(targetServiceValue);
		}
	}, [targetServiceValue]);

	React.useEffect(() => {
		// 라디오 목록을 조회 하고 첫번째값을 설정 해야 한다.
		setTargetServiceValue("target1");
	}, []);

	React.useEffect(() => {
		const listdata = [];
		const data1 = {
			id: "1",
			title: "카카오",
			location: "",
			latitude: 33.450701,
			longitude: 126.570667,
			isAccept: false,
			members: [{ name: "이영주", id: "1" }, { name: "이선영", id: "2" }],
			maxMember: 6
		};

		listdata.push(data1);
		const data2 = {
			id: "2",
			title: "뱅크웨어글로벌",
			location: "11470502",
			latitude: 37.56317316941238,
			longitude: 126.96954190478911,
			isAccept: true,
			members: [{ name: "이영주", id: "1" }, { name: "이선영", id: "2" }],
			maxMember: 6
		};

		listdata.push(data2);
		setExhibitionDataList(listdata);
	}, []);


	const setTargetServiceValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTargetServiceValue((event.target as HTMLInputElement).value);
	}

	const [titleKakaoMapValue, seTitleKakaoMapValue] = React.useState("");
	const [latitudeKakaoMapValue, setLatitudeKakaoMapValue] = React.useState(0);
	const [longitudeKakaoMapValue, setLongitudeKakaoMapValue] = React.useState(0);
	const [locationKakaoMapValue, setlocationKakaoMapValue] = React.useState("");

	const setKaKaoMapInfoHandler = ({ titleKakaoMap, latitudeKakaoMap, longitudeKakaoMap, locationKakaoMap }: KakaoMapInterface) => {
		seTitleKakaoMapValue(titleKakaoMap);
		setLatitudeKakaoMapValue(latitudeKakaoMap);
		setLongitudeKakaoMapValue(longitudeKakaoMap);
		setlocationKakaoMapValue(locationKakaoMap);

		setOpenKakaoMap(true);
	}

	return (
		<React.Fragment>
			<Container sx={{ width: '100%' }}>
				<Box

					sx={{ height: '30%', width: '100%' }}
				>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						locale={ko}
					>
						<CalendarPicker
							date={datePickerValue}
							onChange={(newValue) => {
								setDatePickerValue(newValue);
							}}

						/>
					</LocalizationProvider>

				</Box>

				<Divider />

				<FormControl>
					<RadioGroup
						row
						aria-labelledby="form-control-label-placement"
						name="target-service-radio-buttons-group"
						defaultValue="target1"
						value={targetServiceValue}
						onChange={setTargetServiceValueHandler}
					>
						<FormControlLabel
							value="target1"
							control={<BpRadio />}
							label="target-1"
							labelPlacement="start"
						/>
						<FormControlLabel
							value="target2"
							control={<BpRadio />}
							label="target-2"
							labelPlacement="start"
						/>

					</RadioGroup>
				</FormControl>
				<Divider />

				<Box sx={{ width: '100%' }}>
					<Typography variant="h6" gutterBottom component="div">
						h6. Heading
					</Typography>
					<Typography variant="subtitle2" gutterBottom component="div">
						subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
						blanditiis tenetur
					</Typography>
				</Box>
				<Divider />

				<Box sx={{ width: '100%' }}>
					<ExhibitionList
						exhibitionDataList={exhibitionDataList}
						setKaKaoMapInfoHandler={setKaKaoMapInfoHandler}
					/>
				</Box>

				<KakaoMap
					key={'kakaomap_main'}
					open={openKakaoMap}
					setOpen={setOpenKakaoMap}
					title={titleKakaoMapValue}
					latitude={latitudeKakaoMapValue}
					longitude={longitudeKakaoMapValue}
					location={locationKakaoMapValue}
				/>
			</Container>
		</React.Fragment >
	)
}

export default Main;