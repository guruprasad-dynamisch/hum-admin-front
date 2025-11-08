import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/globals.scss'
import './styles/custom.scss'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={1}>
                <App />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>
)
