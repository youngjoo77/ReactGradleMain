import {Accordion} from "@components/accordion/Accordion"
import {AccordionListProps, AccordionProps} from '@interfaces/AccordionInterface'
import {useSelector} from "react-redux";
import {RootState} from "@modules/rootReducer";

const MakeAccordionMenu = () => {
	const menuItems = useSelector((state : RootState) => state.menu.menuItems);
	
	return (
			<div>
				{menuItems.map((menu : AccordionProps) => (
		          <Accordion
		          		key= {menu.key}
		          		title = {menu.title}
		          		show= {menu.show}
		          		children ={menu.children}
		          />
		        ))}
			</div>
	)
}

export default MakeAccordionMenu;