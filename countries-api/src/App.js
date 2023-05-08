import Wrapper from './components/Wrapper';
import CountriesContextProvider from './store/countries-context';

function App() {
	return (
		<CountriesContextProvider>
			<Wrapper />
		</CountriesContextProvider>
	);
}

export default App;
