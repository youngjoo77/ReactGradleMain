import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import reportWebVitals from '@/reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '@modules/rootReducer';
import { CookiesProvider } from 'react-cookie';
import { StyledEngineProvider } from '@mui/material/styles';

const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<CookiesProvider>
			<React.StrictMode>
				<StyledEngineProvider injectFirst>
					<App />
				</StyledEngineProvider>
			</React.StrictMode>
		</CookiesProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
