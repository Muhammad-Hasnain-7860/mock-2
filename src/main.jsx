import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store.js'
import AppRouter from './app/router/AppRouter.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRouter />
    </Provider>
)
