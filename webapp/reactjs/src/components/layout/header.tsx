import { useNavigate } from 'react-router';
import {Container, Button} from "react-bootstrap"; 

const Header = () => {
	const navigate = useNavigate();
	
	const LogoutHandler = () => {
		console.log("logout  버튼 클릭 !!!!");
		
		localStorage.removeItem('token');
	  	localStorage.removeItem('email');
	  	localStorage.removeItem('isAuthenticated');
	  	localStorage.removeItem('tokenExpiresIn');
	  	
	  	navigate("/login"); // 로그인 페이지로 이동
	}

	return (
		<header>
			<Container className="panel">
				<div>Header 영역</div>
				<div><Button className="btn btn-success" onClick={LogoutHandler}>logout</Button></div>
			</Container>
		</header>
	)
}

export default Header;