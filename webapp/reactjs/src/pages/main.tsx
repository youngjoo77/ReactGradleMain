import {Link} from "react-router-dom"
import {BasicButton} from "@components/button/button"
const Main = () => {
	 
	return (
		
		<div>
			<div>Main page</div>
			{
				// 버튼 샘플
			}
			<BasicButton component={Link} to="/testPage1">go testPage1</BasicButton>
		</div>
		
	)
}

export default Main;