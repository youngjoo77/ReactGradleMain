import { useNavigate } from 'react-router';
import {Container, Button} from "react-bootstrap"; 
const TestPage2 = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Container className="panel">
				<div>TestPage2 page</div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/main')}>go main page</Button></div>
				<div><Button className="btn btn-success" onClick={(e) => navigate('/testPage1')}>go testPage1</Button></div>
			</Container>
		</div>
	)
}

export default TestPage2;