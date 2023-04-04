import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentContextProvider from './store/ContextProvider';

import App from './App';

import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CommentContextProvider>
			<App />
		</CommentContextProvider>
	</React.StrictMode>
);
