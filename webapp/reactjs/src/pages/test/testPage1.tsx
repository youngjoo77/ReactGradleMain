import { useNavigate } from 'react-router';
import {Container, Button} from "react-bootstrap"; 
const TestPage1 = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Container className="panel">
				<div>TestPage1 page</div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/main')}>go main page</Button></div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/testPage2')}>go testPage2</Button></div>
			</Container>
		</div>
	)
}

export default TestPage1;