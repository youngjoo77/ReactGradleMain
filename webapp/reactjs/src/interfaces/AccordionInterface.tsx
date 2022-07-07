export interface AccordionProps {
  key : string
  title?: string
  show?: boolean
  children?: React.ReactElement | null
}

export interface AccordionListProps {
	list : AccordionProps[]
}