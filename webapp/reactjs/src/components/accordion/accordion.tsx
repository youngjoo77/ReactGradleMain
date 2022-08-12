
import React from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Typography } from '@mui/material';

interface CustomAccordionViewInterface {
	expanded: string | false
	value: string
	accordionChangeHandler: (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => void
	title: string
	subTitle?: string
	children: React.ReactElement
}

const CustomAccordion = styled((props: AccordionProps) => (
	<Accordion disableGutters elevation={1} TransitionProps={{ unmountOnExit: true }} {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
	<AccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	// backgroundColor:
	// 	theme.palette.mode === 'dark'
	// 		? 'rgba(255, 255, 255, .05)'
	// 		: 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CustomAccordionView = ({
	expanded,
	value,
	accordionChangeHandler,
	title,
	subTitle,
	children
}
	: CustomAccordionViewInterface) => {

	return (
		<CustomAccordion expanded={expanded === value} onChange={accordionChangeHandler(value)}>
			<CustomAccordionSummary aria-controls={`custom-accordion-content-${value}`} id={`custom-accordion-header-${value}`}>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
				{
					subTitle ? <Typography sx={{ color: 'text.secondary' }}>{subTitle}</Typography> : null
				}
			</CustomAccordionSummary>
			<CustomAccordionDetails>
				{children}
			</CustomAccordionDetails>
		</CustomAccordion >
	)
}

export { CustomAccordionView }