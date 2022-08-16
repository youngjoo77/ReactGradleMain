import React from 'react'
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { toggleProgress } from "@modules/progress/progressModule"
import { bsUrl } from '@utils/environmentUtils';
import { CustomAlert, CustomAlertInterface, CustomSnackbar } from '@components/alert/alert';

interface FetchDataInterface {
	method: 'POST' | 'GET' | 'PUT' | 'DELETE',
	url: string,
	data?: {},
	loading: boolean
};

interface CustomAxiosInterface {

}

interface CustomAxionFunctionInterface {
	REQUEST: ({ method, url, data, loading }: FetchDataInterface) => Promise<AxiosResponse<any, any> | null>
}

const CustomAxios = React.forwardRef<CustomAxionFunctionInterface, CustomAxiosInterface>(
	(props, ref) => {
		// state 선언
		const [snackbarOpen, setSnackbarOpen] = React.useState(false);
		const [alertInfo, setAlertInfo] = React.useState<CustomAlertInterface>({ isOpen: false, severity: 'error', title: '', content: '', fnCallBack: null });

		const dispatch = useDispatch();

		// 다국어 선언
		const { t } = useTranslation('main');
		const $ = t;
		$('signIn');

		const setProgress = React.useCallback(
			(progressOpen: boolean) => dispatch(toggleProgress({ progressOpen: progressOpen })),
			[dispatch]
		);

		// 부모컴포넌트에서 호출 하는 fundtion 설정
		React.useImperativeHandle(ref, () => ({
			REQUEST,
		}));

		const REQUEST = ({
			method,
			url,
			data,
			loading
		}: FetchDataInterface) => {
			switch (method) {
				case 'GET':
					return FetchAuth({ method: method, url, loading });
				case 'POST':
					return FetchAuth({ method: method, url, data, loading });
				case 'PUT':
					return FetchAuth({ method: method, url, data, loading });
				case 'DELETE':
					return FetchAuth({ method: method, url, loading });
				default:
					return FetchAuth({ method: 'POST', url, data, loading });
			}
		}

		/**
		 * @description Bearer 토큰생성
		 * @param accessToken 
		 * @returns string
		 */
		const getToken = (accessToken: string | null) => {
			return (accessToken !== null && accessToken !== "") ? ' Bearer ' + accessToken : '';
		}

		// axios instance 생성
		const customAxios: AxiosInstance = axios.create({
			baseURL: bsUrl
		});

		// request 요청 전 실행
		const onRequestHandler = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
			// 토큰 유효시간 검증 및 재발급
			const nowDateLong = new Date().getTime();
			let tokenExpiresIn = localStorage.getItem('tokenExpiresIn') !== null ? Number(localStorage.getItem('tokenExpiresIn')) : 0; // 로그인 후 생성

			console.log(`[onRequestHandler] [url : ${config.url}, tokenExpiresIn : ${tokenExpiresIn}, nowDateLong : ${nowDateLong}]`);

			/**
			 * 로그인 거래가 아니고 토큰 만료시간이 지났다면 토큰재발급 서버 요청
			 * 로그인 했을때 refresh토큰도 같이 넘겨주고 해당 refresh토큰을 DB 에 저장 해놔야 함.
			 * spring 에서 토큰재발급 로직 생성 해야 함. 토큰재발급 할때 DB 에 있는 refresh 을 비교 하고 맞으면 토큰/refresh토큰을 생성해서 넘겨줘야함.
			 */
			if (config.url !== '/auth/login' && tokenExpiresIn < nowDateLong) {
				const { data } = await axios.get(
					`${config.baseURL}/auth/refreshToken`,// 토큰재발급 url
					{
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getToken(localStorage.getItem('token')),
							'Refresh-Authorization': getToken(localStorage.getItem('refToken')),
						}
					}
				);
				console.log(`data : ${data}`);

				const { accessToken, refreshToken, tokenExpiresIn } = data;
				localStorage.setItem('token', accessToken);
				localStorage.setItem('refToken', refreshToken);
				localStorage.setItem('tokenExpiresIn', String(tokenExpiresIn));
				// accessToken = refreshToken;
				const header: AxiosRequestHeaders = { 'Content-Type': 'application/json', 'Authorization': getToken(accessToken) };
				config.headers = header;
			}

			return config;
		}

		// request 오류시 실행
		const onRequestErrorHandler = (error: AxiosError): Promise<AxiosError> => {
			const message = `[onRequestErrorHandler] [message : ${error.message}, code : ${error.code}]`;
			console.error(`[onRequestErrorHandler] [${JSON.stringify(error)}]`);
			setProgress(false);
			alertOpenHandler('REQUEST ERROR', message);
			return Promise.reject(error);
		}

		// response 리턴 전 실행
		const onResponseHandler = (response: AxiosResponse): AxiosResponse => {
			console.info(`[onResponseHandler] [${JSON.stringify(response)}]`);
			if (response && response.data.error) {
				const error = response.data.error;
				console.log(error);
				setProgress(false);
				alertOpenHandler('REQUEST ERROR', error);
			}

			return response;
		}

		// response 오류시 실행
		const onResponseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
			// console.error(`[response error] [${JSON.stringify(error)}]`);
			if (error && error.response) {
				const message = `[onResponseErrorHandler] [message : ${error.message}, code : ${error.code}]`;
				console.error(message);
				alertOpenHandler('RESPONSE ERROR', message);
			}

			setProgress(false);
			return Promise.reject(error);
		}

		// axios request interceptors 설정
		customAxios.interceptors.request.use(onRequestHandler, onRequestErrorHandler);

		// axios response interceptors 설정
		customAxios.interceptors.response.use(onResponseHandler, onResponseErrorHandler);

		// axios 실행
		const FetchAuth = async (fetchData: FetchDataInterface) => {
			const method = fetchData.method;
			const url = fetchData.url;
			const data = fetchData.data;
			const isloading = fetchData.loading;

			if (isloading) {
				setProgress(true);
			}

			const header = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': getToken(localStorage.getItem('token'))
				}
			};

			console.log(`url : ${url}, header : ${header.headers.Authorization}`);

			const response: AxiosResponse<any, any> | false =
				(method === 'GET' && (await customAxios.get(url, header))) ||
				(method === 'POST' && (await customAxios.post(url, data, header))) ||
				(method === 'PUT' && (await customAxios.put(url, data, header))) ||
				(method === 'DELETE' && (await customAxios.delete(url, header)));

			if (!response) {
				console.log("response false!");
				return null;
			}

			if (isloading) {
				setProgress(false);
			}

			snackbarOpenHandler();

			return response;
		}

		// snackbar 처리
		const snackbarOpenHandler = () => {
			setSnackbarOpen(true);
			setTimeout(() => {
				setSnackbarOpen(false);
			}, 2000);
		}

		// alert 처리
		const alertOpenHandler = (title: string, message: string) => {
			let alertdata: CustomAlertInterface = {
				isOpen: true, severity: 'error', title: title, content: message, fnCallBack: function () {
					alertdata.isOpen = false;
					setAlertInfo(alertdata);
				}
			};

			setAlertInfo(alertdata);
		}

		return (
			<React.Fragment>
				<CustomSnackbar
					isOpen={snackbarOpen}
					message={'정상처리 되었습니다.'}
				/>

				<CustomAlert
					customAlertProp={alertInfo}
				/>
			</React.Fragment>
		)
	}
);

export type { FetchDataInterface, CustomAxionFunctionInterface }
export default CustomAxios;