/**
 * 로그인 페이지에서 사용하는 interface 를 정의 한다.
 * LoginToken : 로그인 후 결과 interface
 * LoginInData : 로그인 시 input interface
 */

export  interface LoginToken {
	grantType: string,
	accessToken: string,
	tokenExpiresIn: number
}

export  interface LoginInData {
	email: string,
	password: string
}