import { useNavigate } from 'react-router';
import {Container, Button} from "react-bootstrap"; 

const Main = () => {
	const navigate = useNavigate();
	 
	return (
		
		<div>
			<Container className="panel">
				<div>Main page</div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/testPage1')}>go testPage1</Button></div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/testPage2')}>go testPage2</Button></div>
			</Container>
			
		</div>
		
	)
}

export default Main;