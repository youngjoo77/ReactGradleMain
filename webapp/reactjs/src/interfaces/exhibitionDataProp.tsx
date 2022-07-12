export interface ExhibitionDataProp {
	id: string
	title: string
	location: string
	isAccept: boolean
	members: {
		name: string
		id: string
	}[]
	maxMember: number
}

