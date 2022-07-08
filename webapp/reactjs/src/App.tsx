import Router from '@configs/router/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@/App.css';

const darkTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<Router />
		</ThemeProvider>
	);
}

export default App;
