import React from 'react';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { AddLocationAlt } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

import { ExhibitionDataProp } from "@interfaces/exhibitionDataProp"

// 전시대 목록 생성
const Div = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

const ExhibitionList = (props: { exhibitionDataList: ExhibitionDataProp[] }) => {
	const exhibitionDataList = props.exhibitionDataList;
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
		exhibitionDataList.map((data) => {
			console.log(data.isAccept);
			if (data.isAccept) {
				switchTogglehandler(data.id);
			}
		});
	}, [exhibitionDataList]);

	// 지도 버튼 핸들러
	const mapHandler = (target: string) => {
		console.log(target);
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

								<IconButton edge="start" aria-label="map" onClick={() => { mapHandler(data.location) }}>
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