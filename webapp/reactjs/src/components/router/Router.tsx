import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/router/PrivateRouter';
import Layouts from '@components/layout/layouts';

// 화면 목록을 조회하여 Page 에 적재 한다.
interface Page {
	path : string,
	pathName : string
} 

// Page 의 목록으로 layz 를 동적으로 생성 한다.
interface lazyData {
	element : any
	path : string
}

// axios 로 통신해서 해당 데이터를 만들어 낸 후 결과에서 pages 를 만들면 됨
// lazy로  동적 import 생성
const pages : lazyData[] = [
	{element : lazy(() => import('@pages/Main')), path : '/main'},
	{element : lazy(() => import('@pages/test/TestPage1')), path : '/testPage1'},
	{element : lazy(() => import('@pages/test/TestPage2')), path : '/testPage2'}
];

const Router = () => {
	const Login = lazy(() => import('@pages/Login')); // 로그인 페이지는 정적으로 설정 한다.
	/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */
	//        <Route element={<PrivateRoute authentication={false}/>}>
	//          <Route path="/login" element={<LoginPage/>} />
	//        </Route>
//	<Route path="/main" element={<Layouts><Main /></Layouts>} />
	return (
		
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
						{/* 인증 여부 상관 없이 접속 가능한 페이지 정의 "/" 로 접근시 login 으로 이동 */}
						<Route index element={<Navigate replace to="/login"/>} />
						<Route path="/login" element={<Login />} />
						
						{/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
						<Route element={<PrivateRoute authentication={true} />}>
							{pages.map((target : lazyData) => (
					          <Route
					          		key = {target.path}
					          		path= {target.path}
					          		element={<Layouts>< target.element /></Layouts>}
					          />
					        ))}								
						</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default Router