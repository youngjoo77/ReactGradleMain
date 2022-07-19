import React, { ReactElement } from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from "@modules/rootReducer";

interface PrivateRouteProps {
	children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
	authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 안해도 됨
}

const PrivateRoute = ({ authentication }: PrivateRouteProps): React.ReactElement | null => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	/**
	  * 로그인 했는지 여부
	  * 로그인 했을 경우 : true 라는 텍스트 반환
	  * 로그인 안했을 경우 : null or false(로그아웃 버튼 눌렀을경우falseN로 설정) 반환
	  */

	if (authentication) {
		// 인증 필요
		// 인증을 안했을 경우 로그인 페이지 이동
		// 했을경우 해당 페이지로 이동
		return (isAuthenticated === null || !isAuthenticated) ? <Navigate to="/" /> : <Outlet />;

	} else {
		// 인증 불필요
		// 인증을 안했을 경우 해당 페이지로 이동
		// 했을경우 로그인 페이지로 이동
		return (isAuthenticated === null || !isAuthenticated) ? <Outlet /> : <Navigate to='/' />;
	}
}

export default PrivateRoute