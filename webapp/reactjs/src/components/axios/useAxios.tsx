import axios, { AxiosError, AxiosResponse } from 'axios';

interface ServerError {
	errorMessage: string
};

interface LoginFailType {
	status: number,
	 error: string
};

interface FetchData {
	method: string,
	url: string,
	data?: {},
	loading: boolean
};

const fetchAuth = async (fetchData: FetchData) => {
	/**
       * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
       * 운영 환경에 배포할 경우에는 axios.defaults.baseURL,axios.defaults.withCredentials  주석 처리합니다.
       * 
       * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
       */
	axios.defaults.baseURL = 'http://localhost:8081';
	axios.defaults.withCredentials = true; 
	
	const baseUrl = "/api";
	const method = fetchData.method;
	const url = baseUrl + fetchData.url;
	const data = fetchData.data;
	const isloading = fetchData.loading;
	const token = (localStorage.getItem('token') != null || localStorage.getItem('token') != "") ? ' Bearer ' + localStorage.getItem('token') : '';
	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	};
	try {
		const response: AxiosResponse<any, any> | false =
			(method === 'get' && (await axios.get(url, header))) ||
			(method === 'post' && (await axios.post(url, data, header))) ||
			(method === 'put' && (await axios.put(url, data, header))) ||
			(method === 'delete' && (await axios.delete(url, header)));

		if (response && response.data.error) {
			console.log((response.data as LoginFailType).error);
			alert("Wrong ID or Password");
			return null;
		}

		if (!response) {
			alert("false!");
			return null;
		}

		return response;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const serverError = err as AxiosError<ServerError>;
			if (serverError && serverError.response) {
				console.log(serverError.response.data);
				alert("failed!");
				return null;
			}
		}
		console.log(err);
		alert("failed!");
		return null;
	}
}

const GET = (url: string, loading: boolean) => {
	const response = fetchAuth({ method: 'get', url, loading });
	return response;
};

const POST = (url: string, data: {}, loading: boolean) => {
	const response = fetchAuth({ method: 'post', url, data, loading })
	return response;
};

const PUT = async (url: string, data: {}, loading: boolean) => {
	const response = fetchAuth({ method: 'put', url, data, loading });
	return response;
};

const DELETE = async (url: string, loading: boolean) => {
	const response = fetchAuth({ method: 'delete', url, loading });
	return response;
};

export default { GET, POST, PUT, DELETE }