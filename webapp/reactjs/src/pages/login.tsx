import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {Button, Container} from "react-bootstrap"; 
import {useDispatch} from "react-redux";
import useAxios from '@/components/axios/useAxios';
import {setCookie, removeCookie} from "@components/cookie/cookie";
import {LoginToken, LoginInData} from '@interfaces/loginInterface';
import {addAccesstoken, removeAccesstoken, addExpiresAccesstoken, removeExpiresAccesstoken} from "@modules/auth/authModule"

const Login =() => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [tokenExpiresIn, setTokenExpiresIn] = useState("");
//	const [grantType, setGrantType] = useState("");
//	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//	const [hasLoginFailed, setHasLoginFailed] = useState(false);
	
    
	// auth 관련 생성 함수
	const createAccesstoken = React.useCallback(
		(accessToken : string) => dispatch(addAccesstoken({accessToken : accessToken})),
		[dispatch]
	);
	
	const deleteAccesstoken = React.useCallback(() => dispatch(removeAccesstoken()),
		[dispatch]
	);
	
	const createExpiresAccesstoken = React.useCallback(
		(tokenExpiresTime : string) => dispatch(addExpiresAccesstoken({tokenExpiresTime : tokenExpiresTime})),
		[dispatch]
	);
	
	const deleteExpiresAccesstoken = React.useCallback(() => dispatch(removeExpiresAccesstoken()),
		[dispatch]
	);
	
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
	
//	const calculateRemainingTime = (expirationTime:number) => {
//  		const currentTime = new Date().getTime();
//  		const adjExpirationTime = new Date(expirationTime).getTime();
//  		const remainingDuration = adjExpirationTime - currentTime;
//  		return remainingDuration;
//	};

	const loginClicked = () => {
		console.log("loginClicked");
		const loginData : LoginInData = { 'email': email, 'password': password };
		
		const response = useAxios.POST('/auth/login', loginData, true);
		response.then((response) => {
			if (response !== null) {
				const result : LoginToken = response.data;

				setEmail(email);
				setTokenExpiresIn(String(result.tokenExpiresIn));
				localStorage.setItem('token', result.accessToken);
				localStorage.setItem('email', email);
				localStorage.setItem('isAuthenticated', 'true');
				localStorage.setItem('tokenExpiresIn', tokenExpiresIn);
				console.log("login success!!!");
//				setGrantType(result.grantType);
//				setShowSuccessMessage(true);
//				setHasLoginFailed(false);

				setCookie('accessToken', result.accessToken);
				// redux 에 token 생성
				createAccesstoken(result.accessToken);
				createExpiresAccesstoken(String(result.tokenExpiresIn));
				
				// main 페이지로 이동
				navigatehandler();
			}
		}).catch(() => {
			localStorage.setItem('isAuthenticated', 'false');
			localStorage.setItem('token', "");
			localStorage.setItem('email', "");
			localStorage.setItem('tokenExpiresIn', "");
			
//			setShowSuccessMessage(false);
//			setHasLoginFailed(true);
			
			// redux 에 token 삭제
			deleteAccesstoken();
			deleteExpiresAccesstoken();
			removeCookie('accessToken');
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