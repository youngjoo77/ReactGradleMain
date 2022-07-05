import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {Button, Container} from "react-bootstrap"; 
import useAxios from '@/components/axios/useAxios';

interface LoginToken {
	grantType: string,
	accessToken: string,
	tokenExpiresIn: number
}

const Login =() => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [tokenExpiresIn, setTokenExpiresIn] = useState("");
	const [grantType, setGrantType] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [hasLoginFailed, setHasLoginFailed] = useState(false);

	const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}
	
	const navigate = useNavigate();
	
	const navigatehandler = () => {
		console.log("page 이동");
		navigate("/main"); // page 이동
	}
	
	const calculateRemainingTime = (expirationTime:number) => {
  		const currentTime = new Date().getTime();
  		const adjExpirationTime = new Date(expirationTime).getTime();
  		const remainingDuration = adjExpirationTime - currentTime;
  		return remainingDuration;
	};

	const loginClicked = () => {
		console.log("loginClicked");
		const response = useAxios.POST('/auth/login', { 'email': email, 'password': password }, true);
		response.then((result) => {
			if (result !== null) {
				const loginData: LoginToken = result.data;

				setGrantType(loginData.grantType);
				setToken(loginData.accessToken);
				setEmail(email);
				setTokenExpiresIn(String(loginData.tokenExpiresIn));
				localStorage.setItem('token', token);
				localStorage.setItem('email', email);
				localStorage.setItem('isAuthenticated', 'true');
				localStorage.setItem('tokenExpiresIn', tokenExpiresIn);
				console.log("login success!!!");
				setShowSuccessMessage(true);
				setHasLoginFailed(false);
				
				// main 페이지로 이동
				navigatehandler();
			}
		}).catch(() => {
			localStorage.setItem('isAuthenticated', 'false');
			setShowSuccessMessage(false);
			setHasLoginFailed(true);
		})
	}

	return (
		<div>
			<Container className="panel">
				<h1>Login</h1>
				<section>
					<div>User Name</div>
					<div>
						<input type="text" name="email" value={email} onChange={(e) => emailChange(e)} />
					</div>
				</section>
				<section>
					<div>Password</div>
					<div><input type="password" name="password" value={password} onChange={passwordChange} /></div>
				</section>
				<section>
					<Button className="btn btn-success" onClick={loginClicked}>Login</Button>
				</section>
			</Container>
		</div>
	)
}

export default Login