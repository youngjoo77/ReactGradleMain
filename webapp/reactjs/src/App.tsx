import Router from '@components/router/router';
import {useSelector} from "react-redux";
import {RootState} from "@modules/rootReducer";
import '@/App.css';

const App = () => {
	const accessToken = useSelector((state : RootState) => state.auth.accessToken);
//	console.log("App accessToken : "+accessToken);
	
	if (typeof accessToken === 'string' && accessToken.trim() !== '' && accessToken.trim().length > 0) {
		localStorage.setItem('isAuthenticated', 'true');
	}
	else {
		localStorage.setItem('isAuthenticated', 'false');
	}

	return (
		<Router/>
	);
}

export default App;
