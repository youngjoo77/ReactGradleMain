import Router from '@components/router/Router';
import '@/App.css';

const App = () => {
	
	const token = localStorage.getItem('token');
	console.log("token : " + token);
	if (typeof token === 'string' && token.trim() !== '' && token.trim().length > 0) {
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
