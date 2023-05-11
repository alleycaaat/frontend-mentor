import ThemeContextProvider from './store/theme-context';
import CountriesContextProvider from './store/countries-context';
import Container from './Container';

import './styles.scss';

function App() {
	return (
		<ThemeContextProvider>
			<CountriesContextProvider>
				<Container/>
			</CountriesContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
