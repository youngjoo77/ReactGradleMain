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

