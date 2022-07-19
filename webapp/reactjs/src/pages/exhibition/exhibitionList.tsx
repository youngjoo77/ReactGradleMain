import React from 'react';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { AddLocationAlt } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

export interface ExhibitionDataProp {
	id: string
	title: string
	location: string // 장소ID
	latitude : number // 위도
	longitude : number // 경도
	isAccept: boolean
	members: {
		name: string
		id: string
	}[]
	maxMember: number
}

const ExhibitionList = (props: { exhibitionDataList: ExhibitionDataProp[], setKaKaoMapInfoHandler: any }) => {
	const exhibitionDataList = props.exhibitionDataList;
	const setKaKaoMapInfoHandler = props.setKaKaoMapInfoHandler;

	const [switchChecked, setSwitchChecked] = React.useState(['']);

	// switch 버튼 핸들러
	const switchTogglehandler = (value: string) => {
		const currentIndex = switchChecked.indexOf(value);
		const newChecked = [...switchChecked];

		if (currentIndex === -1) {
			console.log("활성화 : " + value);
			newChecked.push(value);
		} else {
			console.log("비활성화 : " + value);
			newChecked.splice(currentIndex, 1);
		}

		setSwitchChecked(newChecked);
	};

	// list 생성시 기존에 참여 되어 있던 것을 체크 해준다. 
	React.useEffect(() => {
		// eslint-disable-next-line array-callback-return
		exhibitionDataList.map((data) => {
			console.log(data.isAccept);
			if (data.isAccept) {
				switchTogglehandler(data.id);
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exhibitionDataList]);

	// 지도 버튼 핸들러
	const mapHandler = (title: string, location: string, latitude: number, longitude: number) => {

		const mapData = {
			title: title,
			latitude: latitude,
			longitude: longitude,
			location: location
		};
		setKaKaoMapInfoHandler(mapData);
	}

	// text 핸들러
	const listItemTextHandler = (value: string) => {
		const currentIndex = switchChecked.indexOf(value);
		if (currentIndex === -1) {
			console.log("listItemTextHandler 비활성화 : " + value);
		} else {
			console.log("listItemTextHandler 활성화 : " + value);
		}
	}

	return (
		<Grid item xs={12} md={6}>
			<List
				subheader={<ListSubheader>Settings</ListSubheader>}
			>
				{
					exhibitionDataList.map((data) => (
						<React.Fragment key={data.id}>
							<ListItem >
								<ListItemText
									primary={data.title}
									onClick={() => { listItemTextHandler(data.id) }}
								/>

								<IconButton edge="start" aria-label="map" onClick={() => {
									mapHandler(data.title,
													   data.location,
													   data.latitude,
													   data.longitude)
								}}>
									<AddLocationAlt />
								</IconButton>

								<Switch
									edge="end"
									onChange={() => { switchTogglehandler(data.id) }}
									checked={switchChecked.indexOf(data.id) !== -1}
									inputProps={{
										'aria-labelledby': 'switch-list-label-' + data.id,
									}}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
					))
				}
			</List>
		</Grid>
	)
}

export default ExhibitionList