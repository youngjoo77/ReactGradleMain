import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ExhibitionList, { ExhibitionDataProp } from '@pages/exhibition/exhibitionList'
import KakaoMap, { KakaoMapInterface } from "@components/map/kakaoMap"
import { BpRadio } from '@components/ladio/ladio'
import { CustomStaticDatePicker, CustomStaticDatePickerInterface } from '@components/datepicker/datepicker'
import moment from 'moment'

const Main = () => {
	const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(new Date());
	const [targetServiceValue, setTargetServiceValue] = React.useState("");
	// map open 여부 설정
	const [openKakaoMap, setOpenKakaoMap] = React.useState(false);
	// list 의 state 설정
	const [exhibitionDataList, setExhibitionDataList] = React.useState<ExhibitionDataProp[]>([]);

	React.useEffect(() => {
		// 날짜가 변경 되었을때 실행 된다.
		if (datePickerValue) {
			const dateValue = moment(datePickerValue).format("YYYYMMDD");
			console.log(dateValue);
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

	// 데이터를 조회 해서 설정 해야 함.
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

	// 카카오맵 state 설정
	const [kakaoMapParams, setKakaoMapParams] = React.useState<KakaoMapInterface>({
		title: '',
		latitude: 0,
		longitude: 0,
		location: ''
	});

	// 카카오지도 정보 설정
	const setKaKaoMapInfoHandler = ({ title, latitude, longitude, location }: KakaoMapInterface) => {
		setKakaoMapParams({
			title: title,
			latitude: latitude,
			longitude: longitude,
			location: location
		});

		setOpenKakaoMap(true);
	}

	const datepikerparams: CustomStaticDatePickerInterface = {
		type: 'day',
		value: datePickerValue,
		changeHandler: setDatePickerValue,
		readOnly: false,
		minDate: null
	};

	return (
		<React.Fragment>
			<Container sx={{ width: '100%' }}>
				<Box

					sx={{ height: '30%', width: '100%' }}
				>
					<CustomStaticDatePicker
						key={'mainDatePicker'}
						params={datepikerparams}
					/>
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

				{/* <KakaoMap
					key={'kakaomap_main'}
					open={openKakaoMap}
					setOpen={setOpenKakaoMap}
					params={kakaoMapParams}
				/> */}
			</Container>
		</React.Fragment >
	)
}

export default Main;