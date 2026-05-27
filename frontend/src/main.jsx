import { createRoot } from 'react-dom/client';
import './app/app.css';
import App from './app/App.jsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import {store} from "./app/app.store.js";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)