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

const FetchAuth = async (fetchData: FetchData) => {
	const baseUrl = "/api";
	const method = fetchData.method;
	const url = baseUrl + fetchData.url;
	const data = fetchData.data;
	const accessToken = localStorage.getItem('token');

	const token = (accessToken != null || accessToken !== "") ? ' Bearer ' + accessToken : '';

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
	const response = FetchAuth({ method: 'get', url, loading });
	return response;
};

const POST = (url: string, data: {}, loading: boolean) => {
	const response = FetchAuth({ method: 'post', url, data, loading })
	return response;
};

const PUT = async (url: string, data: {}, loading: boolean) => {
	const response = FetchAuth({ method: 'put', url, data, loading });
	return response;
};

const DELETE = async (url: string, loading: boolean) => {
	const response = FetchAuth({ method: 'delete', url, loading });
	return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { GET, POST, PUT, DELETE }