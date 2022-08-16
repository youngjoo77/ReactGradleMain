import Router from '@configs/router/router';
import { useSelector } from "react-redux";
import { RootState } from "@modules/rootReducer";
import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@/App.css';

const App = () => {
	// redux 의 theme 조회
	const themeMode = useSelector((state: RootState) => state.theme.mode);

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
		},
	});

	// redux 의 progress 조회
	const progress = useSelector((state: RootState) => {
		if (state.progress.progressOpen === undefined) {
			return false;
		}
		else {
			return state.progress.progressOpen;
		}
	});


	return (
		<ThemeProvider theme={theme}>
			<Router />
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
				open={progress}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</ThemeProvider>
	);
}

export default App;
