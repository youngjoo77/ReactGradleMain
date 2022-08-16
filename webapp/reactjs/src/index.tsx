import React from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '@/reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import initializeStore from '@modules/initializeStore'
import '@configs/locales/i18n'
import '@/index.css';
import App from '@/App';

const store = initializeStore();
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

reportWebVitals();